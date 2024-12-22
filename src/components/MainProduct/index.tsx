'use client'

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { ROUTES } from "@/utils/route";
import { Product } from "@/types/product";
import { languages } from "@/utils/constant";
import Image from "next/image";
import Link from "next/link";
import { RequestInit } from "next/dist/server/web/spec-extension/request";
import ProductSelection from "./product-selection";

interface MainProducts {
  row_number: number,
  id: number,
  category: string,
  category_en: string,
  category_jp: string,
  product_id: number
}

const apiUrl = "https://n8n.khiemfle.com/webhook/5c404ea1-4a57-4c0a-8628-3088d00abe64";
const apiUrlEn = "https://n8n.khiemfle.com/webhook/92ea60bc-daae-4852-b325-8f9ccb2b7d3a";
const apiUrlJp = "https://n8n.khiemfle.com/webhook/4c50f778-25b0-49f8-bfad-4d825513feef";

const MainProductPage = ({ lang, dictionary }: { lang: string, dictionary: any }) => {
  const router = useRouter();
  useEffect(() => {
    const adminCC = Cookies.get("admincookie");
    if (!adminCC) {
      router.push(`/${lang}${ROUTES.LOGIN}`);
    }
  }, [router, lang]);


  const categories = ['Trang Trí Nhà Cửa', 'Nhà Bếp', 'Nhà Thú Cưng', 'Thời Trang'];



  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [homeProduct, setHomeProduct] = useState<MainProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        method: "GET",
        lang: "vi"
      });
      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      const response = await fetch(
        apiUrl,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      const transformedProducts: Product[] = data.map((item: any) => ({
        row: item.row_number,
        id: item.id,
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.description,
        images: [
          item.i_one,
          item.i_two,
          item.i_three,
          item.i_four,
          item.i_five,
          item.i_six,
        ].filter((url) => url !== ""),
      }));
      setProducts(transformedProducts.sort((a, b) => b.id - a.id));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductHomePage = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      method: "GET",
    });
    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        "https://n8n.khiemfle.com/webhook/7a9b383f-1381-4e46-82a6-800e6fb2f122",
        requestOptions
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: MainProducts[] = await response.json();
      // console.log("ProductHomePage:", data);
      setHomeProduct(data);
    } catch (error) {
      console.error("Error in getProductHomePage:", error);
    }
  };

  useEffect(() => {
    getProductHomePage();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0 && homeProduct.length > 0) {
      const matchedProducts = products.filter(product =>
        homeProduct.some(home => home.product_id === product.id)
      );

      const sortedProducts = matchedProducts.sort((a, b) => {
        const categoryComparison = categories.indexOf(a.category) - categories.indexOf(b.category);
        if (categoryComparison === 0) {
          return a.id - b.id;
        }
        return categoryComparison;
      });

      setFilteredProduct(sortedProducts);
      // console.log("filter products:", products);
    }
  }, [products, homeProduct]);

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

  const SkeletonProduct = () => {
    return (
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 animate-pulse">
        <div className="col-span-3 flex items-center pr-24">
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1 aspect-square bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="col-span-3 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          </div>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="col-span-2 flex items-center">
          <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
        <div className="col-span-1 flex items-center">
          <div className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {dictionary?.MAINPRODUCT_title}
        </h2>
        <div
          className="relative"
          ref={dropdownRef}
        >
          {isOpen && (
            <ul className="absolute right-0 z-10 mt-2 w-[58px] origin-top-right rounded-md bg-white bg-opacity-80 shadow-lg ring-1 ring-black/5 focus:outline-none">
              {languages
                .filter(({ lang }) => lang !== currentLang.lang)
                .map(({ lang, label, flag }) => (
                  <Link href={`/${lang}${ROUTES.MAINPRODUCT}`}>
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
      <div className="flex flex-col gap-10">
        <div className="rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProduct key={index} />
            ))
          ) : (
            <ProductSelection homeProduct={homeProduct} products={filteredProduct} productOrigin={products} />
          )}
        </div>
      </div>
    </div>
  )
}
export default MainProductPage;