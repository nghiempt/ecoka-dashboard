import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - ESG",
  description: "ECOKA DASHBOARD",
};

const ESG = () => {
  return (
    <Layout>
      <div className="">
        <Breadcrumb pageName="ESG" />
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4 md:col-span-4">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  MÔI TRƯỜNG
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-4">
                    <Image
                      src="https://res.cloudinary.com/farmcode/image/upload/v1729695224/ecoka/ecoka-esg-env_j95ub2.png"
                      alt="img"
                      width={500}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <textarea
                      defaultValue="ECOKA cam kết bảo vệ môi trường thông qua việc sử dụng các nguyên liệu 100% tự nhiên như lục bình để sản xuất túi xách thủ công. Nguyên liệu này không chỉ thân thiện với môi trường mà còn có khả năng tự phân hủy sau một thời gian dài tiếp xúc với thiên nhiên, giảm thiểu rác thải nhựa và các chất ô nhiễm. Quy trình sản xuất của ECOKA được thiết kế để tối ưu hóa tài nguyên, hạn chế tiêu thụ năng lượng và nước, góp phần vào việc bảo tồn hệ sinh thái tự nhiên."
                      className="w-full mb-4 px-3 py-2 border rounded-lg"
                      rows={14}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
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
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 md:col-span-4">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">XÃ HỘI
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-4">
                    <Image
                      src="https://res.cloudinary.com/farmcode/image/upload/v1729695367/ecoka/ecoka-esg-social_jcqwgx.jpg"
                      alt="img"
                      width={500}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <textarea
                      defaultValue="ECOKA tạo việc làm ổn định cho các nghệ nhân tại miền Tây, nơi nổi tiếng với kỹ năng thủ công truyền thống. Công ty không chỉ giúp bảo tồn và phát triển nghề thủ công mỹ nghệ truyền thống mà còn nâng cao đời sống kinh tế cho người lao động địa phương. Ngoài ra, ECOKA đóng góp vào các hoạt động cộng đồng, xây dựng môi trường làm việc công bằng và hỗ trợ các sáng kiến phát triển bền vững cho cộng đồng."
                      className="w-full mb-4 px-3 py-2 border rounded-lg"
                      rows={14}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
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
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 md:col-span-4">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  QUẢN TRỊ
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="w-full mb-4">
                    <Image
                      src="https://res.cloudinary.com/farmcode/image/upload/v1729695322/ecoka/ecoka-esg-manage_fagyf9.jpg"
                      alt="img"
                      width={500}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="mb-4 flex items-center gap-3">
                    <textarea
                      defaultValue="ECOKA thực hiện các chính sách quản trị minh bạch và có trách nhiệm, đảm bảo sự phát triển bền vững và tuân thủ các quy định pháp luật về lao động và môi trường. Công ty luôn cam kết duy trì đạo đức kinh doanh cao, tạo ra các sản phẩm chất lượng đáp ứng tiêu chuẩn quốc tế, đồng thời không ngừng cải tiến quy trình sản xuất để tăng cường hiệu suất và giảm thiểu tác động tiêu cực đến môi trường và xã hội."
                      className="w-full mb-4 px-3 py-2 border rounded-lg"
                      rows={14}
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ESG;
