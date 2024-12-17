import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import Layout from "@/components/Layout";
import CompanyPage from "@/components/Company";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - CÔNG TY",
  description: "ECOKA DASHBOARD",
};

const Company = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)

  return (
    <Layout dictionary={dictionary} lang={lang} page="company">
      <div className="">
        {/* <Breadcrumb pageName="Công Ty" /> */}
        <div className="flex flex-col gap-10">
          <CompanyPage lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </Layout>
  );
};

export default Company;
