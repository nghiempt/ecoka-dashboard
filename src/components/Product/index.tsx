"use client"

import Image from "next/image";
import { Product } from "@/types/product";
import { getAll } from "@/utils/apis";
import { useEffect, useState } from "react";

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null as any);
  const [images, setImages] = useState<string[]>([]);
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    images: [] as string[],
  });

  const apiUrl = "https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64";
  const categories = ['Trang Trí Nhà Cửa', 'Nhà Bếp', 'Nội Thất', 'Thời Trang'];

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setLocalImages((prevImages) => [...prevImages, ...files]);
    const newImages: string[] = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...newImages]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteImage = (index: number) => {
    setImages((prevImages: any) => prevImages.filter((_: any, i: any) => i !== index));
  };

  const uploadImagesToCloudinary = async (images: File[]) => {
    const uploadedUrls: string[] = [];
    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "portal");
      formData.append("folder", "ecoka");
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/farmcode/image/upload", {
          method: "POST",
          body: formData,
          redirect: "follow",
        });
        if (!response.ok) {
          throw new Error("Failed to upload image to Cloudinary");
        }
        const result = await response.json();
        uploadedUrls.push(result.url.replace("http://", "https://"));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    return uploadedUrls;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProduct = async () => {
    setIsSaving(true);
    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(localImages);
      const newId = Math.max(...products.map((p) => p.id), 0) + 1;
      const raw = JSON.stringify({
        method: "CREATE",
        id: newId,
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        category: newProduct.category,
        i_one: uploadedImageUrls[0] || "",
        i_two: uploadedImageUrls[1] || "",
        i_three: uploadedImageUrls[2] || "",
        i_four: uploadedImageUrls[3] || "",
        i_five: uploadedImageUrls[4] || "",
        i_six: uploadedImageUrls[5] || "",
      });
      await createProduct(raw);
      await fetchProducts();
      setNewProduct({ name: "", price: 0, description: "", category: "", images: [] });
      setLocalImages([]);
      setIsSaving(false);
      handleCloseCreateModal();
      setIsLoading(true);
      await fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  const createProduct = async (raw: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect,
    };
    try {
      const response = await fetch(apiUrl, requestOptions);
      if (!response.ok) {
        throw new Error("Failed to create product");
      }
      const result = await response.text();
      console.log("Product created:", result);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (product: any) => {
    setSelectedProduct(product);
    setImages(product.images);
    setIsUpdateModalOpen(true);
  };

  const handleUpdateProduct = async () => {
    if (!selectedProduct) return;
    setIsSaving(true);
    const existingImageUrls = images.filter((img) => !img.startsWith("data:image"));
    const uploadedImageUrls = await uploadImagesToCloudinary(localImages);
    const allImageUrls = [...existingImageUrls, ...uploadedImageUrls];
    const raw = JSON.stringify({
      method: "UPDATE",
      row_number: selectedProduct.row_number,
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      category: selectedProduct.category,
      i_one: allImageUrls[0] || "",
      i_two: allImageUrls[1] || "",
      i_three: allImageUrls[2] || "",
      i_four: allImageUrls[3] || "",
      i_five: allImageUrls[4] || "",
      i_six: allImageUrls[5] || ""
    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow" as RequestRedirect
    };
    try {
      const response = await fetch(
        "https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setLocalImages([]);
      setImages(uploadedImageUrls);
      setIsSaving(false);
      handleCloseUpdateModal();
      setIsLoading(true);
      await fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update product");
    }
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedProduct(null);
    setImages([]);
  };

  const handleDeleteProduct = async () => {
    var confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (confirm) {
      if (!selectedProduct) return;
      setIsDelete(true);
      const raw = JSON.stringify({
        method: "DELETE",
        row_number: selectedProduct.row
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
      };
      try {
        const response = await fetch(
          "https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64",
          requestOptions
        );
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        setIsDelete(false);
        handleCloseUpdateModal();
        setIsLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to delete product");
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const data = await getAll("https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64");
      const transformedProducts: Product[] = data.map((item: any) => ({
        row: item.row_number,
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
        images: [
          item.i_one,
          item.i_two,
          item.i_three,
          item.i_four,
          item.i_five,
          item.i_six,
        ].filter((url) => url !== ""),
      }));
      setProducts(transformedProducts.sort((a, b) => b.id - a.id));
      console.log("Products fetched:", transformedProducts);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const SkeletonProduct = () => {
    return (
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 animate-pulse">
        <div className="col-span-3 flex items-center pr-24">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1 aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="col-span-3 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center w-full">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          DANH SÁCH SẢN PHẨM
        </h4>
        <button
          className="bg-primary px-4 py-1 text-white rounded-lg"
          onClick={handleOpenCreateModal}>
          + Sản phẩm mới
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Tên sản phẩm</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Danh mục</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Giá</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Mô tả</p>
        </div>
      </div>
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <SkeletonProduct key={index} />
        ))
      ) : (
        products.map((product: Product) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer hover:bg-gray-50"
            key={product.id}
            onClick={() => setSelectedProduct(product)}>
            <div className="col-span-3 flex items-center pr-24">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="w-16 h-16 col-span-1 relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt="img"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg object-cover"
                  />
                </div>
                <p className="col-span-3 text-sm text-black dark:text-white">
                  {product.name}
                </p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">
                {product.category}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">
                {product.price} VND
              </p>
            </div>
            <div className="col-span-1 flex items-center" onClick={() => handleOpenUpdateModal(product)}>
              <p className="text-sm text-[#eee] px-4 py-1 rounded-md truncate bg-[rgb(29,36,51)]">
                Chi tiết
              </p>
            </div>
          </div>
        ))
      )}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-6">Tạo Sản Phẩm</h2>

            {/* Name Input */}
            <textarea
              name="name"
              placeholder="Tên sản phẩm"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg text-sm h-[80px]"
            />

            {/* Category Select */}
            <select
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Price Input */}
            <input
              name="price"
              type="number"
              placeholder="Giá"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />

            {/* Description Input */}
            <textarea
              name="description"
              placeholder="Mô tả"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg text-sm"
              rows={5}
            />

            {/* Image Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />

            {/* Display Selected Images */}
            <div className="grid grid-cols-6 gap-2 mb-4">
              {localImages.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`uploaded-${index}`}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={handleCloseCreateModal}
              >
                Huỷ
              </button>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={handleCreateProduct}
                disabled={isSaving}
              >
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-6">Chỉnh Sửa Sản Phẩm</h2>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {images.map((image: string, index: number) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src={image} alt={`Product Image ${index}`} fill style={{ objectFit: 'cover' }} />
                  <button
                    onClick={() => handleDeleteImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center">
                    x
                  </button>
                </div>
              ))}
            </div>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="w-full mb-4"
            />
            <textarea defaultValue={selectedProduct?.name} onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })} className="w-full mb-2 px-3 py-2 border rounded-lg text-sm h-[80px]" />
            <select value={selectedProduct?.category} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} className="w-full mb-4 px-3 py-2 border rounded-lg text-sm">
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input type="number" value={selectedProduct?.price} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: +e.target.value })} className="w-full mb-4 px-3 py-2 border rounded-lg text-sm" />
            <textarea defaultValue={selectedProduct?.description} onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })} className="w-full mb-4 px-3 py-2 border rounded-lg text-sm" rows={5} />
            <div className="flex justify-between gap-4.5">
              <button className="flex justify-center rounded border border-stroke px-6 py-2 bg-red-500 hover:bg-opacity-90 font-medium text-gray" onClick={handleDeleteProduct}>
                {isDelete ? "Đang xóa..." : "Xóa"}
              </button>
              <div className="flex gap-4">
              <button className="flex justify-center rounded border border-stroke px-6 py-2" onClick={handleCloseUpdateModal}>
                Huỷ
              </button>
              <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" onClick={handleUpdateProduct}>
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

