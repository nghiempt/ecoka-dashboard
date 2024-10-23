import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import ProductPage from "@/components/Product";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - SẢN PHẨM",
  description: "ECOKA DASHBOARD",
};

const Product = () => {
  return (
    <Layout>
      <Breadcrumb pageName="Sản Phẩm" />
      <div className="flex flex-col gap-10">
        <ProductPage />
      </div>
    </Layout>
  );
};

export default Product;
