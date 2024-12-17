import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import BlogPage from "@/components/Blog";
import Layout from "@/components/Layout";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - BÀI VIẾT",
  description: "ECOKA DASHBOARD",
};

const Blog = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)

  return (
    <Layout dictionary={dictionary} lang={lang} page="blog">
      {/* <Breadcrumb pageName="Bài Viết" /> */}
      <div className="flex flex-col gap-10">
        <BlogPage lang={lang} dictionary={dictionary} />
      </div>
    </Layout>
  );
};

export default Blog;
