'use client'

import Image from "next/image"
import { useState } from "react"
import "@/css/button.slider.css"

const ModalChange = ({ setIsShowModalChange, productOrigin, products, selectedProduct, posId }:
    { setIsShowModalChange: any, productOrigin: any, products: any, selectedProduct: any, posId: number }) => {

    const [isLoading, setIsLoading] = useState({
        id: 0,
        status: false
    })

    const handleSubmit = async (productSelection: any, index: any, productReplace: number) => {
        setIsLoading({
            id: index,
            status: true
        })
        // call api update

        const raw = JSON.stringify({
            method: "UPDATE",
            id: posId,
            product_id: productReplace
        });
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect
        };
        // console.log("check id: ", posId)
        // console.log("check product_id: ", productReplace)
        try {
            const response = await fetch(
                "https://n8n.khiemfle.com/webhook/7a9b383f-1381-4e46-82a6-800e6fb2f122",
                requestOptions
            );
            if (!response.ok) {
                throw new Error("Failed to update product");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update product");
        }

        setTimeout(() => {
            setIsLoading({
                id: index,
                status: false
            })
            setIsShowModalChange(false)
            window.location.reload()
        }, 2000)

    }

    return (
        <div className="fixed inset-0 left-32 bg-black bg-opacity-50 flex items-center justify-center mt-15">
            <div className="bg-white p-6 rounded-lg w-2/4 h-5/6 relative flex flex-col">
                <div className="flex justify-end pb-4 px-3">
                    <h2
                        onClick={() => { setIsShowModalChange(false) }}
                        className="text-lg font-semibold cursor-pointer">X</h2>
                </div>
                <div className="flex-1 overflow-y-auto scroll-bar-style">
                    {(() => {
                        const filteredProducts = productOrigin.filter(
                            (productO: any) =>
                                productO.category === selectedProduct.category &&
                                !products.some((filterPro: any) => filterPro.id === productO.id)
                        );

                        if (filteredProducts.length === 0) {
                            return (
                                <div className="flex justify-center items-center">
                                    Tất cả sản phẩm đã được hiển thị.
                                </div>
                            );
                        }

                        return (
                            <div className="w-full grid grid-cols-3 gap-6">
                                {filteredProducts.map((product: any, indexProduct: any) => (
                                    <div
                                        key={indexProduct}
                                        className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <Image
                                            className="rounded-t-lg"
                                            src={product?.images[0]}
                                            alt=""
                                            width={1000}
                                            height={1000}
                                        />
                                        <div className="p-2">
                                            <a href="#">
                                                <h5 className="mb-2 text-[14px] font-medium tracking-tight text-gray-900 dark:text-white line-clamp-2">
                                                    {product?.name}
                                                </h5>
                                            </a>
                                            <button
                                                onClick={() => {
                                                    handleSubmit(product, indexProduct, product?.id)
                                                }}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Chọn
                                                {isLoading?.status && isLoading?.id === indexProduct && (
                                                    <div role="status" className="ml-4">
                                                        <svg
                                                            aria-hidden="true"
                                                            className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                                                            viewBox="0 0 100 101"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                                fill="currentFill"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">Loading...</span>
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })()}
                </div>
            </div>
        </div>
    )
}
export default ModalChange;