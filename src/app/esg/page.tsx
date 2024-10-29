import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import Layout from "@/components/Layout";
import EsgPage from "@/components/Esg";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - ESG",
  description: "ECOKA DASHBOARD",
};

const ESG = () => {
  return (
    <Layout>
      <div className="">
        <Breadcrumb pageName="ESG" />
        <div className="flex flex-col gap-10">
          <EsgPage />
        </div>
      </div>
    </Layout>
  );
};

export default ESG;
