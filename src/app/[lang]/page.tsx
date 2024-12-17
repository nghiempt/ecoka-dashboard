import Layout from "@/components/Layout";
import { Metadata } from "next";
import LoginPage from "@/components/Login";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - TRANG CHỦ",
  description: "ECOKA DASHBOARD",
};

export default async function Home({ params: { lang } }: {
  params: { lang: string }
}) {
  const dictionary = await getDictionary(lang as any)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoginPage page="" lang={lang} dictionary={dictionary} />
    </div>
  );
}
