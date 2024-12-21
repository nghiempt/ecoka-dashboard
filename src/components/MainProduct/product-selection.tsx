'use client'

import { useState } from "react"
import ModalChange from "./modal-change"

const categories = [
    "Thời Trang",
    "Nhà Bếp",
    "Nội Thất",
    "Nhà Thú Cưng",
]

const products = [
    {
        id: "1",
        name: "Giỏ Xách Cói Thời Trang - Màu Be",
        thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729000394/ecoka/ecoka-product-19-main_rvl1ul.webp",
    },
    {
        id: "1",
        name: "Giỏ Xách Cói Thời Trang - Màu Be",
        thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729000394/ecoka/ecoka-product-19-main_rvl1ul.webp",
    },
    {
        id: "1",
        name: "Giỏ Xách Cói Thời Trang - Màu Be",
        thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729000394/ecoka/ecoka-product-19-main_rvl1ul.webp",
    },
    {
        id: "1",
        name: "Giỏ Xách Cói Thời Trang - Màu Be",
        thumbnail: "https://res.cloudinary.com/farmcode/image/upload/v1729000394/ecoka/ecoka-product-19-main_rvl1ul.webp",
    },
]

const ProductSelection = () => {

    const [isShowModalChange, setIsShowModalChange] = useState(false)

    return (
        <div className="w-full flex flex-col justify-start items-start gap-10 p-8">
            {
                isShowModalChange && (
                    <ModalChange setIsShowModalChange={setIsShowModalChange} />
                )
            }
            {
                categories?.map((category: any, index: any) => {
                    return (
                        <div key={index} className="w-full flex flex-col justify-center items-start gap-4">
                            <h2 className="text-2xl font-bold text-gray-700">{category}</h2>
                            <div className="w-full grid grid-cols-4 gap-10">
                                {
                                    products?.map((product: any, indexProduct: any) => {
                                        return (
                                            <div key={indexProduct} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                <a href="#">
                                                    <img className="rounded-t-lg" src={product?.thumbnail} alt="" />
                                                </a>
                                                <div className="p-5">
                                                    <a href="#">
                                                        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product?.name}</h5>
                                                    </a>
                                                    <button onClick={() => setIsShowModalChange(true)} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                        Thay đổi
                                                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default ProductSelection;