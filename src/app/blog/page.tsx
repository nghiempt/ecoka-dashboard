import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";
import BlogPage from "@/components/Blog";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - BÀI VIẾT",
  description: "ECOKA DASHBOARD",
};

const Blog = () => {
  return (
    <Layout>
      <Breadcrumb pageName="Bài Viết" />
      <div className="flex flex-col gap-10">
        <BlogPage />
      </div>
    </Layout>
  );
};

export default Blog;
