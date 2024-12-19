import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import Layout from "@/components/Layout";
import { getDictionary } from "@/i18n/get-dictionaries";
import MainProductPage from "@/components/MainProduct";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - SẢN PHẨM",
  description: "ECOKA DASHBOARD",
};

const MainProduct = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)
  return (
    <Layout dictionary={dictionary} lang={lang} page="product">
      <MainProductPage lang={lang} dictionary={dictionary} />
    </Layout>
  );
};

export default MainProduct;
