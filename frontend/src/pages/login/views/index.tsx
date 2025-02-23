import LoginForm from "./login-form";
import { Globe, Grip, Laptop2 } from "lucide-react";

const LoginPage = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row  w-full p-4 lg:p-0 lg:w-4/5 mx-auto">
        <div className="lg:w-1/2">
          <LoginForm />
        </div>
        <div className="lg:w-1/2 flex flex-col pl-20">
          <div className="flex justify-center">
            <div className="w-[180px] h-[180px] flex items-center justify-center rounded-full bg-[#53f1ad]">
              <Globe size={100} className="text-[#0974ff] " />
            </div>
          </div>
          <div className="flex justify-end mt-10">
            <div className="w-[160px] h-[160px] flex items-center justify-center rounded-full bg-[#7d7aff]">
              <Grip size={120} className="text-white " />
            </div>
          </div>
          <div className="flex justify-start ">
            <div className="w-[180px] h-[180px] ml-10 mt-15 flex items-center justify-center rounded-full">
              <Laptop2 size={180} className="text-[#0974ff] " strokeWidth={2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
