"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ROUTES } from "@/utils/route";
import { IMAGES } from "@/utils/image";

interface SidebarProps {
  lang: string;
  page: string;
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9763)">
              <path
                d="M9 0.5C4.30558 0.5 0.5 4.30558 0.5 9C0.5 13.6944 4.30558 17.5 9 17.5C13.6944 17.5 17.5 13.6944 17.5 9C17.5 4.30558 13.6944 0.5 9 0.5ZM9 16.25C5.27208 16.25 2.25 13.2279 2.25 9.5C2.25 5.77208 5.27208 2.75 9 2.75C12.7279 2.75 15.75 5.77208 15.75 9.5C15.75 13.2279 12.7279 16.25 9 16.25Z"
                fill=""
              />
              <path
                d="M12.7071 6.29289C12.3166 5.90237 11.6834 5.90237 11.2929 6.29289L8.5 9.08579L6.70711 7.29289C6.31658 6.90237 5.68342 6.90237 5.29289 7.29289C4.90237 7.68342 4.90237 8.31658 5.29289 8.70711L7.79289 11.2071C8.18342 11.5976 8.81658 11.5976 9.20711 11.2071L12.7071 7.70711C13.0976 7.31658 13.0976 6.68342 12.7071 6.29289Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9763">
                <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Sản Phẩm",
        label_en: "Products",
        label_jp: "製品",
        route: ROUTES.PRODUCT,
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9756)">
              <path
                d="M15.7501 0.55835H2.2501C1.29385 0.55835 0.506348 1.34585 0.506348 2.3021V15.8021C0.506348 16.7584 1.29385 17.574 2.27822 17.574H15.7782C16.7345 17.574 17.5501 16.7865 17.5501 15.8021V2.3021C17.522 1.34585 16.7063 0.55835 15.7501 0.55835ZM6.69385 10.599V6.4646H11.3063V10.5709H6.69385V10.599ZM11.3063 11.8646V16.3083H6.69385V11.8646H11.3063ZM1.77197 6.4646H5.45635V10.5709H1.77197V6.4646ZM12.572 6.4646H16.2563V10.5709H12.572V6.4646ZM2.2501 1.82397H15.7501C16.0313 1.82397 16.2563 2.04897 16.2563 2.33022V5.2271H1.77197V2.3021C1.77197 2.02085 1.96885 1.82397 2.2501 1.82397ZM1.77197 15.8021V11.8646H5.45635V16.3083H2.2501C1.96885 16.3083 1.77197 16.0834 1.77197 15.8021ZM15.7501 16.3083H12.572V11.8646H16.2563V15.8021C16.2563 16.0834 16.0313 16.3083 15.7501 16.3083Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9756">
                <rect
                  width="18"
                  height="18"
                  fill="white"
                  transform="translate(0 0.052124)"
                />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Bài Viết",
        label_en: "Blogs",
        label_jp: "記事",
        route: ROUTES.BLOG,
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9763)">
              <path
                d="M9 0C6.79086 0 5 1.79086 5 4C5 5.47494 5.80744 6.77157 7 7.38102V9C7 10.1046 7.89543 11 9 11C10.1046 11 11 10.1046 11 9V7.38102C12.1926 6.77157 13 5.47494 13 4C13 1.79086 11.2091 0 9 0ZM9 5C8.44772 5 8 4.55228 8 4C8 3.44772 8.44772 3 9 3C9.55228 3 10 3.44772 10 4C10 4.55228 9.55228 5 9 5Z"
                fill=""
              />
              <path
                d="M3 11.5C1.89543 11.5 1 12.3954 1 13.5V14.5C1 15.3284 1.67157 16 2.5 16H15.5C16.3284 16 17 15.3284 17 14.5V13.5C17 12.3954 16.1046 11.5 15 11.5H13V12.5C13 14.1569 11.6569 15.5 10 15.5H8C6.34315 15.5 5 14.1569 5 12.5V11.5H3Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9763">
                <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "ESG",
        label_en: "ESG",
        label_jp: "ESG",
        route: ROUTES.ESG,
      },
      {
        icon: (
          <svg
            className="fill-current"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_130_9763)">
              <path
                d="M3 0.5C2.44772 0.5 2 0.94772 2 1.5V17.5C2 18.0523 2.44772 18.5 3 18.5H15C15.5523 18.5 16 18.0523 16 17.5V1.5C16 0.94772 15.5523 0.5 15 0.5H3ZM4 2.5H6V4.5H4V2.5ZM7.5 2.5H9.5V4.5H7.5V2.5ZM11 2.5H13V4.5H11V2.5ZM4 6.5H6V8.5H4V6.5ZM7.5 6.5H9.5V8.5H7.5V6.5ZM11 6.5H13V8.5H11V6.5ZM4 10.5H6V12.5H4V10.5ZM7.5 10.5H9.5V12.5H7.5V10.5ZM11 10.5H13V12.5H11V10.5ZM4 14.5H6V16.5H4V14.5ZM7.5 14.5H9.5V16.5H7.5V14.5ZM11 14.5H13V16.5H11V14.5Z"
                fill=""
              />
            </g>
            <defs>
              <clipPath id="clip0_130_9763">
                <rect width="18" height="18" fill="white" transform="translate(0 0.5)" />
              </clipPath>
            </defs>
          </svg>
        ),
        label: "Công Ty",
        label_en: "Company",
        label_jp: "会社",
        route: ROUTES.COMPANY,
      },
      {
        icon: (
          <Image className="fill-current" src="https://cdn-icons-png.flaticon.com/128/17821/17821829.png" alt="" width={18} height={19} />
        ),
        label: "Sản Phẩm Chính",
        label_en: "Main Products",
        label_jp: "主な製品",
        route: ROUTES.MAINPRODUCT,
      },
    ],
  },
];

const Sidebar = ({ lang, page, sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-center px-6 py-5.5 lg:pt-10">
          <Link href={ROUTES.HOME}>
            <Image
              width={100}
              height={100}
              src={IMAGES.LOGO_CIRCLE}
              alt="Logo"
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 px-4 py-4 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  {group.name}
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                      lang={lang}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
