"use client"

import { getAll } from "@/utils/apis";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ESG {
    id: number;
    row: number;
    title: string;
    description: string;
    thumbnail: string;
}

const EsgPage = () => {
    const [esgs, setEsgs] = useState<ESG[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingEsgID, setUpdatingEsgID] = useState(0);

    const apiUrl = "https://n8n.khiemfle.com/webhook/aa7f04f4-7833-49c2-8c86-7a043f4a8a5a";


    const handleUpdateEsg = async (updatedEsg: ESG) => {
        setUpdatingEsgID(updatedEsg.id);
        const raw = JSON.stringify({
            method: "UPDATE",
            id: updatedEsg.id,
            row_number: updatedEsg.row,
            title: updatedEsg.title,
            description: updatedEsg.description,
            thumbnail: updatedEsg.thumbnail,
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
                throw new Error("Failed to update ESG information");
            }
            setUpdatingEsgID(0);
            setLoading(true);
            await fetchEsgs();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update ESG information");
        }
    };

    const fetchEsgs = async () => {
        try {
            const data = await getAll(apiUrl);
            const transformedEsgs: ESG[] = data.map((item: any) => ({
                id: item.id,
                row: item.row_number,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
            }));
            setEsgs(transformedEsgs);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEsgs();
    }, []);

    const SkeletonLoader = () => (
        <div className="col-span-12 lg:col-span-4 md:col-span-4">
            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="p-7">
                    <div className="w-full mb-4">
                        <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="mb-4">
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse mb-2"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-5/6 animate-pulse mb-2"></div>
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-4/6 animate-pulse"></div>
                    </div>
                    <div className="flex justify-end gap-4.5">
                        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid grid-cols-12 gap-8">
            {loading
                ? Array.from({ length: 6 }).map((_, index) => <SkeletonLoader key={index} />)
                : esgs.map((esg: ESG) => (
                    <div key={esg.id} className="col-span-12 lg:col-span-4 md:col-span-4">
                        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    {esg.title}
                                </h3>
                            </div>
                            <div className="p-7">
                                <div className="w-full mb-4">
                                    <Image
                                        src={esg.thumbnail}
                                        alt="img"
                                        width={500}
                                        height={200}
                                        className="rounded-lg"
                                    />
                                </div>
                                <div className="mb-4 flex items-center gap-3">
                                    <textarea
                                        defaultValue={esg.description}
                                        className="w-full mb-4 px-3 py-2 border rounded-lg"
                                        rows={14}
                                        onChange={(e) => esg.description = e.target.value}
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        disabled={updatingEsgID !== 0}
                                    >
                                        Huỷ
                                    </button>
                                    <button
                                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                        onClick={() => handleUpdateEsg(esg)}
                                        disabled={updatingEsgID !== 0}
                                    >
                                        {updatingEsgID === esg.id ? "Đang lưu..." : "Lưu"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EsgPage;
