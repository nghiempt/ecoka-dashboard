"use client"

import { languages } from "@/utils/constant";
import { ROUTES } from "@/utils/route";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

const CompanyPage = ({ lang, dictionary }: { lang: string, dictionary: any }) => {
    const router = useRouter();
    useEffect(() => {
        const adminCC = Cookies.get("admincookie");
        if (!adminCC) {
            router.push(`/${lang}${ROUTES.LOGIN}`);
        }
    }, [router, lang]);

    const [company, setCompany] = useState<Company[]>([]);
    const [loading, setLoading] = useState(true);
    const [isUpdate, setIsUpdate] = useState(false);

    const apiUrl = "https://n8n.khiemfle.com/webhook/e984f33a-ffd7-48b7-bea7-3899a97e284e";
    const apiUrlEn = "https://n8n.khiemfle.com/webhook/753e0ec9-7123-4714-9ffa-0080505f3ef5";
    const apiUrlJp = "https://n8n.khiemfle.com/webhook/63de9b9b-c7b7-4ae1-8995-51cba47553bd";
    const apiGetCompany = "https://n8n.khiemfle.com/webhook/51f585dd-2f58-45cf-8bb8-4cc762a65737";

    const getUrl = () => {
        switch (lang) {
            case "vi":
                return apiUrl
            case "en":
                return apiUrlEn
            case "jp":
                return apiUrlJp
            default:
                return apiUrl
        }
    }

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
            const response = await fetch(getUrl(), requestOptions);
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

            const response = await fetch(getUrl(), requestOptions);
            const data = await response.json();
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

    return (
        <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                    {dictionary?.COMPANY_title}
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
                                    <Link href={`/${lang}${ROUTES.COMPANY}`}>
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
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5">
                    <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                {dictionary?.COMPANY_table_title_1}
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
                                                {dictionary?.COMPANY_table_label[0]}
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
                                                {dictionary?.COMPANY_table_label[1]}
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
                                                {dictionary?.COMPANY_table_label[2]}
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
                                                {dictionary?.COMPANY_table_label[3]}
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
                                            {dictionary?.COMPANY_table_label[4]}
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
                                            {dictionary?.PRODUCT_cancel_btn}
                                        </button>
                                        <button
                                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                                            disabled={isUpdate}
                                            onClick={handleUpdateCompany}
                                        >
                                            {isUpdate ? `${dictionary?.PRODUCT_saving_btn}...` : `${dictionary?.PRODUCT_save_btn}`}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
