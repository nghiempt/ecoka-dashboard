import { Metadata } from "next";
import Layout from "@/components/Layout";
import EsgPage from "@/components/Esg";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - ESG",
  description: "ECOKA DASHBOARD",
};

const ESG = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)
  return (
    <Layout dictionary={dictionary} lang={lang} page="esg">
      <div className="">
        {/* <Breadcrumb pageName="ESG" /> */}
        <div className="flex flex-col gap-10">
          <EsgPage lang={lang} dictionary={dictionary} />
        </div>
      </div>
    </Layout>
  );
};

export default ESG;
