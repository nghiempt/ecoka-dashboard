import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import ProductPage from "@/components/Product";
import Layout from "@/components/Layout";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - SẢN PHẨM",
  description: "ECOKA DASHBOARD",
};

const Product = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)
  return (
    <Layout dictionary={dictionary} lang={lang} page="product">
      <ProductPage lang={lang} dictionary={dictionary} />
    </Layout>
  );
};

export default Product;
