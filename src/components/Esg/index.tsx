"use client";

import Cookies from "js-cookie";
import { languages } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/utils/route";

interface ESG {
    id: number;
    row: number;
    title: string;
    description: string;
    thumbnail: string;
}

const EsgPage = ({ lang, dictionary }: { lang: string, dictionary: any }) => {
    const router = useRouter();
    useEffect(() => {
        const adminCC = Cookies.get("admincookie");
        if (!adminCC) {
            router.push(`/${lang}${ROUTES.LOGIN}`);
        }
    }, [router, lang]);

    const [esgs, setEsgs] = useState<ESG[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingEsgID, setUpdatingEsgID] = useState(0);
    const [localImages, setLocalImages] = useState<Record<number, File[]>>({});
    const [previewThumbnails, setPreviewThumbnails] = useState<Record<number, string>>({});

    const apiUrl = "https://n8n.khiemfle.com/webhook/aa7f04f4-7833-49c2-8c86-7a043f4a8a5a";
    const apiGetESG = "https://n8n.khiemfle.com/webhook/ec20cfc2-50bf-461c-b625-5f0eb0a72648";

    const handleImageUpload = (
        e: React.ChangeEvent<HTMLInputElement>,
        esgId: number
    ) => {
        const files = Array.from(e.target.files || []);
        setLocalImages((prevImages) => ({
            ...prevImages,
            [esgId]: [...(prevImages[esgId] || []), ...files],
        }));

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewThumbnails((prevThumbnails) => ({
                ...prevThumbnails,
                [esgId]: reader.result as string,
            }));
        };
        if (files[0]) {
            reader.readAsDataURL(files[0]);
        }
    };

    const uploadImagesToCloudinary = async (images: File[]) => {
        const uploadedUrls: string[] = [];
        for (const image of images) {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "portal");
            formData.append("folder", "ecoka");
            try {
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/farmcode/image/upload",
                    {
                        method: "POST",
                        body: formData,
                        redirect: "follow",
                    }
                );
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

    const handleUpdateEsg = async (updatedEsg: ESG) => {
        setUpdatingEsgID(updatedEsg.id);
        const newImages = localImages[updatedEsg.id] || [];
        const uploadedImageUrls = await uploadImagesToCloudinary(newImages);

        const raw = JSON.stringify({
            method: "UPDATE",
            id: updatedEsg.id,
            row_number: updatedEsg.row,
            title: updatedEsg.title,
            description: updatedEsg.description,
            thumbnail: uploadedImageUrls[0] || updatedEsg.thumbnail,
        });

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow" as RequestRedirect,
        };

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (!response.ok) {
                throw new Error("Failed to update ESG information");
            }
            setUpdatingEsgID(0);
            setLocalImages([]);
            setPreviewThumbnails([]);
            setLoading(true);
            await fetchEsgs();
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to update ESG information");
        }
    };

    const fetchEsgs = async () => {
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
            const response = await fetch(apiGetESG, requestOptions);
            const data = await response.json();
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
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    ESG
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
                                    <Link href={`/${lang}${ROUTES.ESG}`}>
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
            <div className="grid grid-cols-12 gap-8">
                {loading
                    ? Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                    : esgs.map((esg: ESG) => (
                        <div
                            key={esg.id}
                            className="col-span-12 lg:col-span-4 md:col-span-4"
                        >
                            <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                                <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                                    <h3 className="font-medium text-black dark:text-white">
                                        {esg.title}
                                    </h3>
                                </div>
                                <div className="p-7">
                                    <div className="w-full mb-4">
                                        <Image
                                            src={previewThumbnails[esg.id] || esg.thumbnail}
                                            alt="img"
                                            width={500}
                                            height={200}
                                            className="rounded-lg"
                                        />
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, esg.id)}
                                        className="w-full mb-4"
                                    />
                                    <div className="mb-4 flex items-center gap-3">
                                        <textarea
                                            defaultValue={esg.description}
                                            className="w-full mb-4 px-3 py-2 border rounded-lg"
                                            rows={14}
                                            onChange={(e) => (esg.description = e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end gap-4.5">
                                        <button
                                            className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                            disabled={updatingEsgID !== 0}
                                        >
                                            {dictionary?.PRODUCT_cancel_btn}
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                            onClick={() => handleUpdateEsg(esg)}
                                            disabled={updatingEsgID !== 0}
                                        >
                                            {updatingEsgID === esg.id ? `${dictionary?.PRODUCT_saving_btn}...` : `${dictionary?.PRODUCT_save_btn}`}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    );
};

export default EsgPage;
