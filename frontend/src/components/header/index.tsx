import { useParams } from "react-router-dom";
import Navbar from "./navbar";

const Header = () => {
  const { lang } = useParams();
  const logoImg = lang === "ka" ? "Logo-ka.svg" : "Logo-en.svg";
  return (
    <>
      <header className="h-[100px] flex items-center bg-primary">
        <div className="w-full px-4 lg:px-0 mx-auto lg:w-[80%] flex">
          <div className="hidden lg:block lg:w-1/3 ">
            <img src={`../${logoImg}`} className="h-[35px]" />
          </div>
          <div className="w-full lg:w-2/3 flex justify-end">
            <Navbar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
