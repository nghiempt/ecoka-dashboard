"use client"

import { getAll } from "@/utils/apis";
import { useEffect, useState } from "react";

interface Company {
    id: number;
    row: number;
    name: string;
    description: string;
    phone: string;
    address: string;
    email: string;
}

const SkeletonLoader = () => (
    <div className="animate-pulse">
        <div className="mb-5.5 h-8 w-3/4 bg-gray-300 rounded dark:bg-gray-700"></div>
        <div className="mb-5.5 h-8 w-full bg-gray-300 rounded dark:bg-gray-700"></div>
        <div className="mb-5.5 h-8 w-1/2 bg-gray-300 rounded dark:bg-gray-700"></div>
        <div className="mb-5.5 h-32 w-full bg-gray-300 rounded dark:bg-gray-700"></div>
    </div>
);

const CompanyPage = () => {
    const [company, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    const apiUrl = "https://n8n.khiemfle.com/webhook/e984f33a-ffd7-48b7-bea7-3899a97e284e";

    const handleUpdateCompany = async () => {
        setIsUpdate(true);
        if (!company[0]) {
            return;
        }
        const raw = JSON.stringify({
            method: "UPDATE",
            id: company[0].id,
            row_number: company[0].row,
            name: company[0].name,
            description: company[0].description,
            phone: company[0].phone,
            address: company[0].address,
            email: company[0].email,
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
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to update company information");
            }
            setIsUpdate(false);
            setLoading(true);
            await fetchCompany();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update company information");
        }
    };

    const fetchCompany = async () => {
        try {
            const data = await getAll(apiUrl);
            const transformedCompany: Company[] = data.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                name: item.name,
                description: item.description,
                phone: item.phone,
                address: item.address,
                email: item.email,
            }));
            setCompany(transformedCompany);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompany();
    }, []);

    return (
        <div className="grid grid-cols-5 gap-8">
            <div className="col-span-5">
                <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            THÔNG TIN CÔNG TY
                        </h3>
                    </div>
                    <div className="p-7">
                        {loading ? (
                            <SkeletonLoader />
                        ) : (
                            <div>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="companyName"
                                        >
                                            Tên công ty
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="companyName"
                                            id="companyName"
                                            placeholder="ECOKA HANDICRAFTS"
                                            defaultValue={company[0]?.name}
                                            onChange={(e) => setCompany([{ ...company[0], name: e.target.value }])}
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="phoneNumber"
                                        >
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="phoneNumber"
                                            id="phoneNumber"
                                            placeholder="Số điện thoại"
                                            defaultValue={company[0]?.phone}
                                            onChange={(e) => setCompany([{ ...company[0], phone: e.target.value }])}
                                        />
                                    </div>
                                </div>
                                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="emailAddress"
                                        >
                                            Địa chỉ email
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="email"
                                            name="emailAddress"
                                            id="emailAddress"
                                            placeholder="abc@gmail.com"
                                            defaultValue={company[0]?.email}
                                            onChange={(e) => setCompany([{ ...company[0], email: e.target.value }])}
                                        />
                                    </div>
                                    <div className="w-full sm:w-1/2">
                                        <label
                                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                                            htmlFor="phoneNumber"
                                        >
                                            Địa chỉ
                                        </label>
                                        <input
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Địa chỉ"
                                            defaultValue={company[0]?.address}
                                            onChange={(e) => setCompany([{ ...company[0], address: e.target.value }])}
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
                                    <textarea
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-4 pr-4 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        name="desc"
                                        id="desc"
                                        rows={4}
                                        defaultValue={company[0]?.description}
                                        onChange={(e) => setCompany([{ ...company[0], description: e.target.value }])}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        disabled={isUpdate}
                                    >
                                        Huỷ
                                    </button>
                                    <button
                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                        disabled={isUpdate}
                                        onClick={handleUpdateCompany}
                                    >
                                        {isUpdate ? "Đang lưu..." : "Lưu"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
