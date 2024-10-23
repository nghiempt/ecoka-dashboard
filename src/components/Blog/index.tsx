"use client"

import Image from "next/image";
import { useState } from "react";

const blogData: any = [
  {
    id: 1,
    title: "ECOKA chia sẻ hành trình trao quyền cho thương hiệu Việt trên Amazon tại Đại học FPT",
    thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729695073/ecoka/ecoka-blog-01-main_orvsu8.jpg",
    description: "Chủ tịch HDQT Công ty cổ phần ECOKA, chị Quang Chân Chân, và Tổng Giám Đốc Công ty cổ phần, anh Hà AnhTrường, đã có một buổi chia sẻ đầy ý nghĩa tại trường đại học FPT về hành trình thành công của ECOKA trong việc đưa hàng Việt ra quốc tế trên sàn thương mại điện tử Amazon. Buổi chia sẻ, diễn ra vào ngày 23/6, đã gây được sự quan tâm và ngưỡng mộ từ các sinh viên.",
    date: "09/04/2023 - 20:00",
    author: "Trần My",
    status: "New",
  },
  {
    id: 2,
    title: "Phó Chủ tịch UBND tỉnh Hậu Giang thăm hỏi và động viên các doanh nghiệp",
    thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729695132/ecoka/ecoka-blog-02-main_cqioub.jpg",
    description: "(NSMT) - Ngày 23/01, ông Trương Cảnh Tuyên - Phó Chủ tịch UBND tỉnh Hậu Giang và ông Nguyễn Vũ Trường - Chủ tịch UBND huyện Long Mỹ cùng lãnh đạo các sở, ban, ngành đã đến thăm và tặng quà cho một số doanh nghiệp trên địa bàn huyện Long Mỹ.",
    date: "09/04/2024 - 20:00",
    author: "Nhịp Sống Miền Tây",
    status: "New",
  },
  {
    id: 3,
    title: "Khởi nghiệp từ cây lục bình, chàng trai kiếm doanh thu hơn 2 tỉ đồng/tháng",
    thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729695173/ecoka/ecoka-blog-03-main_njl8ga.webp",
    description: "Nhận thấy những vất vả của người dân làng nghề thủ công mỹ nghệ truyền thống, anh Hà Anh Trường (35 tuổi), ngụ tại P.9, TP.Vũng Tàu (tỉnh Bà Rịa - Vũng Tàu) đã đem sản phẩm làm từ cây lục bình đi xuất ngoại với doanh thu hơn 2 tỉ đồng/tháng.",
    date: "23/01/2024 - 15:57",
    author: "Báo Thanh Niên",
    status: "New",
  },
];

const BlogPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null as any);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleOpenUpdateModal = (product: any) => {
    setSelectedBlog(product);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between items-center w-full">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          DANH SÁCH BÀI VIẾT
        </h4>
        <button
          className="bg-primary px-4 py-1 text-white rounded-lg"
          onClick={handleOpenCreateModal}
        >
          + Bài viết mới
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Tên bài viết</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Tác giả</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Ngày đăng</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nội dung</p>
        </div>
      </div>
      {blogData.map((blog: any, key: any) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 cursor-pointer hover:bg-gray-50"
          key={key}
          onClick={() => handleOpenUpdateModal(blog)}
        >
          <div className="col-span-3 flex items-center pr-24">
            <div className="grid grid-cols-4 gap-4 items-center">
              <div className="col-span-1 relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={blog?.thumbnail}
                  alt="img"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-lg"
                />
              </div>
              <p className="col-span-3 text-sm text-black dark:text-white">
                {blog?.title}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {blog?.author}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {blog?.date}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-[#eee] px-4 py-1 rounded-md truncate bg-[rgb(29,36,51)]">Chi tiết</p>
          </div>
        </div>
      ))}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-6">Tạo Bài Viết</h2>
            <textarea
              placeholder="Tiêu đề"
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Tác giả"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Nội dung"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={10}
            ></textarea>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="submit"
                onClick={handleCloseCreateModal}
              >
                Huỷ
              </button>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
      {isUpdateModalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-6">Chỉnh Sửa Bài Viết</h2>
            <textarea
              defaultValue={selectedBlog?.title}
              className="w-full mb-2 px-3 py-2 border rounded-lg"
            />
            <input
              type="text"
              defaultValue={selectedBlog?.author}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
            />
            <textarea
              defaultValue={selectedBlog?.description}
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              rows={10}
            ></textarea>
            <div className="flex justify-end gap-4.5">
              <button
                className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                type="submit"
                onClick={handleCloseUpdateModal}
              >
                Huỷ
              </button>
              <button
                className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

