'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ROUTES } from "@/utils/route";
import { Product } from "@/types/product";
import { languages } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

interface MainProducts {
  row_number: number,
  id: number,
  category: string,
  category_en: string,
  category_jp: string,
  product_id: number
}

const MainProductPage = ({ lang, dictionary }: { lang: string, dictionary: any }) => {
  const router = useRouter();
  useEffect(() => {
    const adminCC = Cookies.get("admincookie");
    if (!adminCC) {
      router.push(`/${lang}${ROUTES.LOGIN}`);
    }
  }, [router, lang]);

  const apiUrl = "https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64";
  const apiUrlEn = "https://n8n.khiemfle.com/webhook/92ea60bc-daae-4852-b325-8f9ccb2b7d3a";
  const apiUrlJp = "https://n8n.khiemfle.com/webhook/4c50f778-25b0-49f8-bfad-4d825513feef";

  const getCate = () => {
    let categories: string[] = [];
    switch (lang) {
      case "vi":
        categories = ['Trang Trí Nhà Cửa', 'Nhà Bếp', 'Nhà Thú Cưng', 'Thời Trang'];
        break;
      case "en":
        categories = ['Home Decoration', 'Kitchen', 'Pet Houses', 'Fashion'];
        break;
      case "jp":
        categories = ['ホームデコレーション', '台所', 'ペットハウス', 'ファッション'];
        break;
      default:
        categories = [];
    }
    return categories;
  };

  const categories: string[] = getCate();

  const getUrl = () => {
    switch (lang) {
      case "vi":
        return apiUrl
      case "en":
        return apiUrlEn
      case "jp":
        return apiUrlJp
      default:
        return apiUrl
    }
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null as any);
  const [selectedProductReplace, setSelectedProductReplace] = useState(null as any);
  const [images, setImages] = useState<string[]>([]);
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
    images: [] as string[],
  });


  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [homeProduct, setHomeProduct] = useState<MainProducts[]>([]);


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

  const handleOpenUpdateModal = (product: any) => {
    setSelectedProduct(product);
    setImages(product.images);
    setIsUpdateModalOpen(true);
  };

  const handleOpenReplaceModal = (product: any) => {
    setSelectedProduct(product);
    setIsReplaceModalOpen(true);
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
        getUrl(),
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


  const handleReplaceProduct = async () => {
    if (!selectedProductReplace) return;
    setIsReplacing(true);
    const raw = JSON.stringify({
      method: "UPDATE",
      row_number: selectedProductReplace.row_number,
      id: selectedProductReplace.id,
      category: selectedProductReplace.category,
      category_en: selectedProductReplace.category_en,
      category_jp: selectedProductReplace.category_jp,
      product_id: selectedProductReplace.product_id
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
        "https://n8n.khiemfle.com/webhook/7a9b383f-1381-4e46-82a6-800e6fb2f122",
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setIsReplacing(false);
      handleCloseReplaceModal();
      setIsLoading(true);
      await fetchProducts();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update product");
    }
  };

  const handleCloseReplaceModal = () => {
    setIsReplaceModalOpen(false);
    setSelectedProduct(null);
    setSelectedProductReplace(null);
  };

  const fetchProducts = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        method: "GET",
        lang: lang
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        getUrl(),
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
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
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const getProductHomePage = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      method: "GET",
    });

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://n8n.khiemfle.com/webhook/7a9b383f-1381-4e46-82a6-800e6fb2f122",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: MainProducts[] = await response.json();
      // console.log("Data fetched from getProductHomePage:", data);
      setHomeProduct(data);

    } catch (error) {
      console.error("Error in getProductHomePage:", error);
    }
  };

  useEffect(() => {
    getProductHomePage();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && homeProduct.length > 0) {
      const matchedProducts = products.filter(product =>
        homeProduct.some(home => home.product_id === product.id)
      );

      // const categoryOrder = ['Trang Trí Nhà Cửa', 'Nhà Bếp', 'Nội Thất', 'Thời Trang'];

      const sortedProducts = matchedProducts.sort((a, b) => {
        const categoryComparison = categories.indexOf(a.category) - categories.indexOf(b.category);
        if (categoryComparison === 0) {
          return a.id - b.id; // Sort by id if categories are the same
        }
        return categoryComparison;
      });

      setFilteredProduct(sortedProducts);
      // console.log("Filtered Products:", sortedProducts);
    }
  }, [products, homeProduct]);


  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [currentLang, setCurrentLang] = useState(
    () => languages.find((l) => l.lang === lang) || languages[0],
  );

  const handleLanguageChange = (lang: any) => {
    const selectedLang = languages.find((l) => l.lang === lang);
    if (selectedLang) {
      setCurrentLang(selectedLang);
    }
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {dictionary?.MAINPRODUCT_title}
        </h2>
        <div
          className="relative"
          ref={dropdownRef}
        >
          <div
            onClick={toggleDropdown}
            className="flex cursor-pointer flex-row items-center justify-center gap-1 rounded-lg bg-white bg-opacity-60 px-2 py-1"
          >
            <Image
              className=""
              src={currentLang.flag}
              alt={currentLang.label}
              width={23}
              height={23}
            />
            <div
              className={`mt-1 transition-transform duration-300 ${isOpen ? "-translate-y-0.5" : "-rotate-90"} mt-1`}
            >
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="black"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>

          {isOpen && (
            <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-white bg-opacity-80 shadow-lg ring-1 ring-black/5 focus:outline-none">
              {languages
                .filter(({ lang }) => lang !== currentLang.lang)
                .map(({ lang, label, flag }) => (
                  <Link href={`/${lang}${ROUTES.MAINPRODUCT}`}>
                    <li
                      key={lang}
                      className="m-3 flex justify-center"
                      onClick={() => handleLanguageChange(lang)}
                    >
                      <Image src={flag} alt={label} width={23} height={23} />
                    </li>
                  </Link>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center w-full">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              {dictionary?.MAINPRODUCT_table_title}
            </h4>

          </div>
          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">{dictionary?.MAINPRODUCT_label[0]}</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">{dictionary?.MAINPRODUCT_label[1]}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">{dictionary?.MAINPRODUCT_label[2]}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">{dictionary?.MAINPRODUCT_label[3]}</p>
            </div>
          </div>
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProduct key={index} />
            ))
          ) : (
            filteredProduct.map((product: Product) => (
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
                    {Intl.NumberFormat('de-DE').format(product.price)} VND
                  </p>
                </div>


                <div className="col-span-1 flex flex-col items-start justify-center gap-2">
                  <div className=""
                    onClick={() => handleOpenUpdateModal(product)}
                  >
                    <p className="text-sm text-[#eee] px-4 py-1 rounded-md truncate bg-[rgb(29,36,51)]">
                      {dictionary?.MAINPRODUCT_update_button}
                    </p>
                  </div>

                  <div className=""
                    onClick={() => handleOpenReplaceModal(product)}
                  >
                    <p className="text-sm text-black px-4 py-1 rounded-md truncate bg-[rgb(222,226,233)]">
                      {dictionary?.MAINPRODUCT_replace_button}
                    </p>
                  </div>

                </div>

              </div>
            ))
          )}

          {isUpdateModalOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
              <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-semibold mb-6">{dictionary?.PRODUCT_modal_title}</h2>
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
                <input type="file" multiple accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full mb-4"
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
                  {/* <button className="flex justify-center rounded border border-stroke px-6 py-2 bg-red-500 hover:bg-opacity-90 font-medium text-gray"
                //  onClick={handleDeleteProduct}
                >
                  {isDelete ? `${dictionary?.PRODUCT_deleting_btn}...` : `${dictionary?.PRODUCT_delete_btn}`}
                </button> */}
                  <div className="flex gap-4">
                    <button className="flex justify-center rounded border border-stroke px-6 py-2"
                      onClick={handleCloseUpdateModal}
                    >
                      {dictionary?.PRODUCT_cancel_btn}
                    </button>
                    <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      onClick={handleUpdateProduct}
                    >
                      {isSaving ? `${dictionary?.PRODUCT_saving_btn}...` : `${dictionary?.PRODUCT_save_btn}`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isReplaceModalOpen && selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
              <div className="bg-white p-6 rounded-lg w-2/4">
                <h2 className="text-xl font-semibold mb-6">{dictionary?.MAINPRODUCT_replace_modal_title} {selectedProduct?.category}</h2>
                <select id="rpo"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    const selected = products.find((product) => product.id === parseInt(selectedId));
                    if (selected) {
                      setSelectedProductReplace(selected);
                    }
                  }}
                >
                  <option selected disabled>{dictionary?.MAINPRODUCT_replace_modal_select}</option>
                  {products
                    .filter(
                      (product) =>
                        product.category === selectedProduct.category &&
                        !filteredProduct.some((filtered) => filtered.id === product.id)
                    ).length > 0 ? products
                      .filter(
                        (product) =>
                          product.category === selectedProduct.category &&
                          !filteredProduct.some((filtered) => filtered.id === product.id)
                      )
                      .map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name}
                        </option>
                      )) :
                    <option key="" disabled>
                      {dictionary?.MAINPRODUCT_replace_modal_full}
                    </option>}
                </select>

                {!selectedProductReplace && (
                  <div className="flex justify-between gap-4.5">
                    <div className="flex gap-4">
                      <button
                        className="flex justify-center rounded border border-stroke px-6 py-2"
                        onClick={handleCloseReplaceModal}
                      >
                        {dictionary?.PRODUCT_cancel_btn}
                      </button>
                    </div>
                  </div>
                )}

                {selectedProductReplace && (
                  <>
                    <div className="grid grid-cols-6 gap-2 mb-4">
                      {selectedProductReplace?.images?.map((image: string, index: number) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image src={image} alt={`Product Image ${index}`} fill style={{ objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>

                    <textarea
                      disabled
                      value={selectedProductReplace?.name}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProductReplace, name: +e.target.value })
                      }
                      className="w-full mb-2 px-3 py-2 border rounded-lg text-sm h-[80px]"
                    />

                    <select
                      disabled
                      value={selectedProductReplace?.category}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProductReplace, category: e.target.value })
                      }
                      className="w-full mb-4 px-3 py-2 border rounded-lg text-sm"
                    >
                      {categories.map((category, index) => (
                        <option key={index} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>

                    <input
                      disabled
                      type="number"
                      value={selectedProductReplace?.price}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProductReplace, price: +e.target.value })
                      }
                      className="w-full mb-4 px-3 py-2 border rounded-lg text-sm"
                    />

                    <textarea
                      disabled
                      value={selectedProductReplace?.description}
                      onChange={(e) =>
                        setSelectedProduct({ ...selectedProductReplace, description: +e.target.value })
                      }
                      className="w-full mb-4 px-3 py-2 border rounded-lg text-sm"
                      rows={5}
                    />

                    <div className="flex justify-between gap-4.5">
                      <div className="flex gap-4">
                        <button
                          className="flex justify-center rounded border border-stroke px-6 py-2"
                          onClick={handleCloseReplaceModal}
                        >
                          {dictionary?.PRODUCT_cancel_btn}
                        </button>
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                          onClick={handleReplaceProduct}
                        >
                          {isSaving
                            ? `${dictionary?.PRODUCT_saving_btn}...`
                            : `${dictionary?.PRODUCT_save_btn}`}
                        </button>
                      </div>
                    </div>
                  </>
                )}


              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  )
}
export default MainProductPage;