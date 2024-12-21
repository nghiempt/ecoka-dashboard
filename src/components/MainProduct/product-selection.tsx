'use client'

import { useEffect, useState } from "react"
import ModalChange from "./modal-change"
import Image from "next/image"

const categories = [
    "Thời Trang",
    "Trang Trí Nhà Cửa",
    "Nhà Bếp",
    "Nhà Thú Cưng",
]


const ProductSelection = ({ products, productOrigin, homeProduct }: { products: any, productOrigin: any, homeProduct: any }) => {

    const [isShowModalChange, setIsShowModalChange] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productReplacePosition, setProductReplacePosition] = useState<number>(-1);
    useEffect(() => {
        if (isShowModalChange) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isShowModalChange]);

    return (
        <div className="w-full flex flex-col justify-start items-start gap-10 p-8">
            {
                isShowModalChange && (
                    <ModalChange
                        setIsShowModalChange={setIsShowModalChange}
                        productOrigin={productOrigin}
                        products={products}
                        selectedProduct={selectedProduct}
                        posId={productReplacePosition} />
                )
            }
            {
                categories?.map((category: any, index: any) => {
                    return (
                        <div key={index} className="w-full flex flex-col justify-center items-start gap-4  ">
                            <h2 className="text-2xl font-bold text-gray-700 ">{category}</h2>
                            <div className="w-full grid grid-cols-4 gap-10">
                                {
                                    products.filter((product: any) => product?.category === category)
                                        ?.map((product: any, indexProduct: any) => {
                                            return (
                                                <div key={indexProduct} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                                    <a href="#">
                                                        <Image className="rounded-t-lg" src={product?.images[0]} alt="" width={1000} height={1000} />
                                                    </a>
                                                    <div className="p-5">
                                                        <a href="#">
                                                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-2">{product?.name}</h5>
                                                        </a>
                                                        <button onClick={() => {
                                                            setSelectedProduct(product)
                                                            setIsShowModalChange(true)
                                                            const homePro = homeProduct.find((hp: any) => hp.product_id === product.id);
                                                            if (homePro) {
                                                                setProductReplacePosition(homePro.id);
                                                            }
                                                        }
                                                        } className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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