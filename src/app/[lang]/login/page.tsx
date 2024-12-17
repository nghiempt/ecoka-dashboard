import React from "react";
import { Metadata } from "next";
import LoginPage from "@/components/Login";
import { getDictionary } from "@/i18n/get-dictionaries";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - ĐĂNG NHẬP",
  description: "ECOKA DASHBOARD",
};

const Login = async ({ params: { lang } }: {
  params: { lang: string }
}) => {
  const dictionary = await getDictionary(lang as any)
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoginPage page="login" lang={lang} dictionary={dictionary} />
    </div>
  );
};

export default Login;
