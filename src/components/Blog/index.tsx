"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const apiUrl = "https://n8n.khiemfle.com/webhook/ff9f5835-275b-4ecb-a4be-0392ae325ca6";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null as any);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    description: "",
    thumbnail: "",
    date: "",
    s1_title: "",
    s1_content: "",
    s1_thumbnail: "",
    s2_title: "",
    s2_content: "",
    s2_thumbnail: "",
    s3_title: "",
    s3_content: "",
    s3_thumbnail: "",
  });
  const [localImages, setLocalImages] = useState<{ [key: string]: File | null }>({
    thumbnail: null,
    s1_thumbnail: null,
    s2_thumbnail: null,
    s3_thumbnail: null,
  });

  const fetchBlogs = async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ method: "GET" }),
      });
      const data = await response.json();
      setBlogs(data.reverse());
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setNewBlog((prev) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
      setLocalImages({
        ...localImages,
        [field]: file,
      });
    }
  };

  const uploadImagesToCloudinary = async (images: { [key: string]: File | null }) => {
    const uploadedUrls: string[] = [];
    for (const key in images) {
      const image = images[key];
      if (image) {
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
      } else {
        uploadedUrls.push("");
      }
    }
    return uploadedUrls;
  };

  const handleCreateBlog = async () => {
    setIsSaving(true);
    try {
      const uploadedImageUrls = await uploadImagesToCloudinary(localImages);
      const newId = Math.max(...blogs.map((b) => b.id), 0) + 1;
      const raw = JSON.stringify({
        method: "CREATE",
        id: newId,
        title: newBlog.title,
        author: newBlog.author,
        description: newBlog.description,
        thumbnail: uploadedImageUrls[0] || "",
        date: new Date().toLocaleString(),
        s1_title: newBlog.s1_title,
        s1_content: newBlog.s1_content,
        s1_thumbnail: uploadedImageUrls[1] || "",
        s2_title: newBlog.s2_title,
        s2_content: newBlog.s2_content,
        s2_thumbnail: uploadedImageUrls[2] || "",
        s3_title: newBlog.s3_title,
        s3_content: newBlog.s3_content,
        s3_thumbnail: uploadedImageUrls[3] || "",
      });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      await fetchBlogs();
      setIsSaving(false);
      handleCloseCreateModal();
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    }
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setNewBlog({
      title: "",
      author: "",
      description: "",
      thumbnail: "",
      date: "",
      s1_title: "",
      s1_content: "",
      s1_thumbnail: "",
      s2_title: "",
      s2_content: "",
      s2_thumbnail: "",
      s3_title: "",
      s3_content: "",
      s3_thumbnail: "",
    });
    setLocalImages({
      thumbnail: null,
      s1_thumbnail: null,
      s2_thumbnail: null,
      s3_thumbnail: null,
    });
  };

  const handleOpenUpdateModal = (blog: any) => {
    setSelectedBlog(blog);
    setIsUpdateModalOpen(true);
    setLocalImages({
      thumbnail: null,
      s1_thumbnail: null,
      s2_thumbnail: null,
      s3_thumbnail: null,
    });
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  const handleUpdateBlog = async () => {
    if (!selectedBlog) return;
    setIsSaving(true);
    const uploadedImageUrls = await uploadImagesToCloudinary(localImages);
    const raw = JSON.stringify({
      method: "UPDATE",
      row_number: selectedBlog.row_number,
      id: selectedBlog.id,
      title: selectedBlog.title,
      author: selectedBlog.author,
      description: selectedBlog.description,
      thumbnail: uploadedImageUrls[0] || selectedBlog.thumbnail,
      date: selectedBlog.date,
      s1_title: selectedBlog.s1_title,
      s1_content: selectedBlog.s1_content,
      s1_thumbnail: uploadedImageUrls[1] || selectedBlog.s1_thumbnail,
      s2_title: selectedBlog.s2_title,
      s2_content: selectedBlog.s2_content,
      s2_thumbnail: uploadedImageUrls[2] || selectedBlog.s2_thumbnail,
      s3_title: selectedBlog.s3_title,
      s3_content: selectedBlog.s3_content,
      s3_thumbnail: uploadedImageUrls[3] || selectedBlog.s3_thumbnail,
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
      });

      if (!response.ok) {
        throw new Error("Failed to update blog");
      }

      setIsSaving(false);
      handleCloseUpdateModal();
      await fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
      alert("Failed to update blog");
    }
  };

  const handleDeleteBlog = async () => {
    if (!selectedBlog) return;
    const confirmDelete = window.confirm("Bạn có chắc muốn xóa bài viết này?");
    if (confirmDelete) {
      setIsDelete(true);
      const raw = JSON.stringify({
        method: "DELETE",
        row_number: selectedBlog.row_number,
      });

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: raw,
        });

        if (!response.ok) {
          throw new Error("Failed to delete blog");
        }

        setIsDelete(false);
        handleCloseUpdateModal();
        await fetchBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Failed to delete blog");
      }
    }
  };

  const SkeletonLoader = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
        >
          <div className="col-span-3 flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="col-span-2 hidden sm:flex items-center">
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="w-24 h-4 bg-gray-300 rounded"></div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="w-10 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center w-full">
        <h4 className="text-xl font-semibold text-black dark:text-white">DANH SÁCH BÀI VIẾT</h4>
        <button className="bg-primary px-4 py-1 text-white rounded-lg" onClick={handleOpenCreateModal}>
          + Bài viết mới
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Tiêu đề</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Tác giả</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Ngày đăng</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hành động</p>
        </div>
      </div>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        blogs.map((blog) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer hover:bg-gray-50"
            key={blog.id}
            onClick={() => handleOpenUpdateModal(blog)}
          >
            <div className="col-span-3 flex items-center pr-24">
              <div className="grid grid-cols-4 gap-4 items-center">
                <div className="col-span-1 relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={blog.thumbnail.startsWith("http") ? blog.thumbnail : "/default-image.jpg"}
                    alt="img"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
                <p className="col-span-3 text-sm text-black dark:text-white">{blog.title}</p>
              </div>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="text-sm text-black dark:text-white">{blog.author}</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-sm text-black dark:text-white">{blog.date || new Date().toLocaleString()}</p>
            </div>
            <div className="col-span-1 flex items-center">
              <button className="text-sm text-[#eee] px-4 py-1 rounded-md truncate bg-[rgb(29,36,51)]" onClick={() => handleOpenUpdateModal(blog)}>
                Chi tiết
              </button>
            </div>
          </div>
        ))
      )}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
          <div className="bg-white p-6 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">Tạo Bài Viết</h2>
            <input
              name="title"
              placeholder="Tiêu đề"
              value={newBlog.title}
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <input
              name="author"
              placeholder="Tác giả"
              value={newBlog.author}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="description"
              placeholder="Nội dung"
              value={newBlog.description}
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={5}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.thumbnail)}
                    alt="Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.thumbnail && selectedBlog?.thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.thumbnail.startsWith("http") ? selectedBlog.thumbnail : "/default-image.jpg"}
                    alt="Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Chi tiết Bài Viết</h3>
            <input
              name="s1_title"
              placeholder="Tiêu đề Phần 1"
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s1_content"
              placeholder="Nội dung Phần 1"
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's1_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s1_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s1_thumbnail)}
                    alt="S1 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s1_thumbnail && selectedBlog?.s1_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s1_thumbnail.startsWith("http") ? selectedBlog.s1_thumbnail : "/default-image.jpg"}
                    alt="S1 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <input
              name="s2_title"
              placeholder="Tiêu đề Phần 2"
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s2_content"
              placeholder="Nội dung Phần 2"
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's2_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s2_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s2_thumbnail)}
                    alt="S2 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s2_thumbnail && selectedBlog?.s2_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s2_thumbnail.startsWith("http") ? selectedBlog.s2_thumbnail : "/default-image.jpg"}
                    alt="S2 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <input
              name="s3_title"
              placeholder="Tiêu đề Phần 3"
              onChange={handleInputChange}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s3_content"
              placeholder="Nội dung Phần 3"
              onChange={handleInputChange}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's3_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s3_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s3_thumbnail)}
                    alt="S3 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s3_thumbnail && selectedBlog?.s3_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s3_thumbnail.startsWith("http") ? selectedBlog.s3_thumbnail : "/default-image.jpg"}
                    alt="S3 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                onClick={handleCloseCreateModal}
              >
                Huỷ
              </button>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                onClick={handleCreateBlog}
                disabled={isSaving}
              >
                {isSaving ? "Đang lưu..." : "Lưu"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-15">
          <div className="bg-white p-6 rounded-lg w-1/3 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-6">Chỉnh Sửa Bài Viết</h2>
            <input
              defaultValue={selectedBlog.title}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <input
              defaultValue={selectedBlog.author}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, author: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />
            <textarea
              defaultValue={selectedBlog.description}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, description: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={5}
              placeholder="Nhập mô tả bài viết"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.thumbnail ? (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.thumbnail)}
                    alt="uploaded"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog?.thumbnail?.startsWith("http") ? selectedBlog.thumbnail : "/default-image.jpg"}
                    alt="img"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <h3 className="text-lg font-semibold mb-4">Chi tiết Bài Viết</h3>
            <input
              name="s1_title"
              placeholder="Tiêu đề Phần 1"
              defaultValue={selectedBlog.s1_title}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s1_title: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s1_content"
              placeholder="Nội dung Phần 1"
              defaultValue={selectedBlog.s1_content}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s1_content: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's1_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s1_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s1_thumbnail)}
                    alt="S1 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s1_thumbnail && selectedBlog?.s1_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s1_thumbnail.startsWith("http") ? selectedBlog.s1_thumbnail : "/default-image.jpg"}
                    alt="S1 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <input
              name="s2_title"
              placeholder="Tiêu đề Phần 2"
              defaultValue={selectedBlog.s2_title}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s2_title: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s2_content"
              placeholder="Nội dung Phần 2"
              defaultValue={selectedBlog.s2_content}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s2_content: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's2_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s2_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s2_thumbnail)}
                    alt="S2 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s2_thumbnail && selectedBlog?.s2_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s2_thumbnail.startsWith("http") ? selectedBlog.s2_thumbnail : "/default-image.jpg"}
                    alt="S2 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <input
              name="s3_title"
              placeholder="Tiêu đề Phần 3"
              defaultValue={selectedBlog.s3_title}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s3_title: e.target.value })}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <textarea
              name="s3_content"
              placeholder="Nội dung Phần 3"
              defaultValue={selectedBlog.s3_content}
              onChange={(e) => setSelectedBlog({ ...selectedBlog, s3_content: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={3}
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 's3_thumbnail')}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              aria-label="Tải ảnh lên"
            />
            {localImages.s3_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <img
                    src={URL.createObjectURL(localImages.s3_thumbnail)}
                    alt="S3 Thumbnail"
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              </div>
            )}
            {!localImages.s3_thumbnail && selectedBlog?.s3_thumbnail && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                  <Image
                    src={selectedBlog.s3_thumbnail.startsWith("http") ? selectedBlog.s3_thumbnail : "/default-image.jpg"}
                    alt="S3 Thumbnail"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-between gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 bg-red-500 hover:bg-opacity-90 font-medium text-gray"
                onClick={handleDeleteBlog}
              >
                {isDelete ? "Đang xóa..." : "Xóa"}
              </button>
              <div className="flex gap-4">
                <button
                  className="flex justify-center rounded border border-stroke px-6 py-2"
                  onClick={handleCloseUpdateModal}
                >
                  Huỷ
                </button>
                <button
                  className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                  onClick={handleUpdateBlog}
                  disabled={isSaving}
                >
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
export default BlogPage;