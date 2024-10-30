import React from "react";
import { Metadata } from "next";
import LoginPage from "@/components/Login";

export const metadata: Metadata = {
  title: "ECOKA DASHBOARD - ĐĂNG NHẬP",
  description: "ECOKA DASHBOARD",
};

const Login: React.FC = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <LoginPage />
    </div>
  );
};

export default Login;
