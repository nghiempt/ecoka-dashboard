import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - CÔNG TY",
  description: "ECOKA DASHBOARD",
};

const Company = () => {
  return (
    <Layout>
      <div className="">
        <Breadcrumb pageName="Công Ty" />
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  THÔNG TIN CÔNG TY
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="companyName"
                      >
                        Tên công ty
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.72039 12.887C4.50179 12.1056 5.5616 11.6666 6.66667 11.6666H13.3333C14.4384 11.6666 15.4982 12.1056 16.2796 12.887C17.061 13.6684 17.5 14.7282 17.5 15.8333V17.5C17.5 17.9602 17.1269 18.3333 16.6667 18.3333C16.2064 18.3333 15.8333 17.9602 15.8333 17.5V15.8333C15.8333 15.1703 15.5699 14.5344 15.1011 14.0655C14.6323 13.5967 13.9964 13.3333 13.3333 13.3333H6.66667C6.00363 13.3333 5.36774 13.5967 4.8989 14.0655C4.43006 14.5344 4.16667 15.1703 4.16667 15.8333V17.5C4.16667 17.9602 3.79357 18.3333 3.33333 18.3333C2.8731 18.3333 2.5 17.9602 2.5 17.5V15.8333C2.5 14.7282 2.93899 13.6684 3.72039 12.887Z"
                                fill="currentColor"
                              />
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M9.99967 3.33329C8.61896 3.33329 7.49967 4.45258 7.49967 5.83329C7.49967 7.214 8.61896 8.33329 9.99967 8.33329C11.3804 8.33329 12.4997 7.214 12.4997 5.83329C12.4997 4.45258 11.3804 3.33329 9.99967 3.33329ZM5.83301 5.83329C5.83301 3.53211 7.69849 1.66663 9.99967 1.66663C12.3009 1.66663 14.1663 3.53211 14.1663 5.83329C14.1663 8.13448 12.3009 9.99996 9.99967 9.99996C7.69849 9.99996 5.83301 8.13448 5.83301 5.83329Z"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="ECOKA HANDICRAFTS"
                          defaultValue="ECOKA HANDICRAFTS"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="phoneNumber"
                      >
                        Số điện thoại
                      </label>
                      <div className="relative">
                        <span className="absolute left-4.5 top-4">
                          <svg
                            className="fill-current"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g opacity="0.8">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M14.6083 13.3833C13.7756 12.7835 12.7735 12.5082 11.7421 12.616C11.3632 12.6562 11.0229 12.8784 10.8794 13.2262L9.72651 15.9832C6.30742 14.2927 4.06481 12.0501 2.37434 8.63106L5.13213 7.47814C5.47995 7.33466 5.70212 6.99435 5.74235 6.61542C5.8501 5.584 5.57477 4.58188 4.97494 3.74921L3.46247 1.71707C3.21169 1.35918 2.7278 1.27708 2.36991 1.52786L0.797602 2.62865C0.457317 2.87025 0.301176 3.32155 0.413948 3.73562C2.13585 9.94765 7.44741 15.2592 13.6594 16.9811C14.0734 17.0939 14.5247 16.9377 14.7663 16.5974L15.8671 15.0251C16.1179 14.6672 16.0358 14.1833 15.6779 13.9325L13.6457 12.42C12.8131 11.8202 11.811 11.5448 10.7796 11.6526C10.4007 11.6928 10.0604 11.915 9.91692 12.2628L8.764 15.0198C5.3449 13.3293 3.10229 11.0867 1.41182 7.66766L4.1696 6.51474C4.51743 6.37126 4.7396 6.03095 4.77983 5.65198C4.88758 4.62057 4.61225 3.61844 4.01242 2.78578L2.5 0.753627C2.24922 0.395734 1.76533 0.313643 1.40744 0.564426L-0.165869 1.66521C-0.506154 1.90682 -0.662295 2.35811 -0.549523 2.77218C1.17238 8.98421 6.48394 14.2958 12.6959 16.0177C13.1099 16.1305 13.5612 15.9743 13.8028 15.634L14.9036 14.0617C15.1544 13.7038 15.0723 13.2199 14.7144 12.9691L12.6823 11.4567C11.8496 10.8568 10.8475 10.5815 9.8161 10.6893C9.43716 10.7295 9.09686 10.9517 8.95337 11.2995L7.80045 14.0564C4.38136 12.3659 2.13875 10.1233 0.44828 6.70425L3.20607 5.55134C3.5539 5.40786 3.77607 5.06755 3.81629 4.68858C3.92404 3.65717 3.64871 2.65504 3.04888 1.82238L1.53641 -0.209758C1.28563 -0.567653 0.801743 -0.649744 0.443851 -0.398961L-1.12846 0.701824C-1.46874 0.943427 -1.62488 1.39471 -1.51211 1.80878C0.209785 8.02081 5.52134 13.3324 11.7333 15.0543C12.1473 15.1671 12.5986 15.0109 12.8402 14.6706L13.941 13.0983C14.1918 12.7404 14.1097 12.2565 13.7518 12.0057L11.7197 10.4933C10.887 9.89342 9.88486 9.61808 8.85349 9.72587C8.47455 9.76608 8.13426 9.98828 7.99077 10.3361L6.83786 13.093C3.41876 11.4025 1.17615 9.15988 -0.514326 5.74085L2.24345 4.58793C2.59128 4.44445 2.81345 4.10414 2.85368 3.72517C2.96143 2.69376 2.6861 1.69163 2.08627 0.858975L0.573802 -1.17317C0.323019 -1.53106 -0.16087 -1.61315 -0.518768 -1.36237L-2.09108 -0.261587C-2.43137 -0.0209825 -2.5875 0.430309 -2.47473 0.844377C-0.752834 7.05641 4.55872 12.368 -0.416602 16.0174"
                                fill="currentColor"
                              />
                            </g>
                          </svg>
                        </span>
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="(+84) 973 998 068"
                          defaultValue="(+84) 973 998 068"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="emailAddress"
                    >
                      Địa chỉ email
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.33301 4.16667C2.87658 4.16667 2.49967 4.54357 2.49967 5V15C2.49967 15.4564 2.87658 15.8333 3.33301 15.8333H16.6663C17.1228 15.8333 17.4997 15.4564 17.4997 15V5C17.4997 4.54357 17.1228 4.16667 16.6663 4.16667H3.33301ZM0.833008 5C0.833008 3.6231 1.9561 2.5 3.33301 2.5H16.6663C18.0432 2.5 19.1663 3.6231 19.1663 5V15C19.1663 16.3769 18.0432 17.5 16.6663 17.5H3.33301C1.9561 17.5 0.833008 16.3769 0.833008 15V5Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0.983719 4.52215C1.24765 4.1451 1.76726 4.05341 2.1443 4.31734L9.99975 9.81615L17.8552 4.31734C18.2322 4.05341 18.7518 4.1451 19.0158 4.52215C19.2797 4.89919 19.188 5.4188 18.811 5.68272L10.4776 11.5161C10.1907 11.7169 9.80879 11.7169 9.52186 11.5161L1.18853 5.68272C0.811486 5.4188 0.719791 4.89919 0.983719 4.52215Z"
                              fill=""
                            />
                          </g>
                        </svg>
                      </span>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="email"
                        name="emailAddress"
                        id="emailAddress"
                        placeholder="info@ecoka.vn"
                        defaultValue="info@ecoka.vn"
                      />
                    </div>
                  </div>
                  <div className="mb-5.5">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="desc"
                    >
                      Mô tả
                    </label>
                    <div className="relative">
                      <span className="absolute left-4.5 top-4">
                        <svg
                          className="fill-current"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                              fill=""
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_88_10224">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                      <textarea
                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        name="desc"
                        id="desc"
                        rows={4}
                        defaultValue="CÔNG TY CỔ PHẦN ECOKA. Là công ty sản xuất và thương mại các sản phẩm thủ công mỹ nghệ truyền thống từ các nguyên liệu 100% từ thiên nhiên như: lục bình."
                      ></textarea>
                    </div>
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

export default Company;
