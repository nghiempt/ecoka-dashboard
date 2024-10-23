import Layout from "@/components/Layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - TRANG CHỦ",
  description: "ECOKA DASHBOARD",
};

export default function Home() {
  return (
    <>
      <Layout>
        <div className="w-full pt-20 flex justify-center items-center">ECOKA HANDICAFTS</div>
      </Layout>
    </>
  );
}
