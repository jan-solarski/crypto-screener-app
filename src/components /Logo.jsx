import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="absolute sm:top-[1.5rem] top-1[rem] sm:left-[1.5rem] left-[1rem] [text-decoration:none] sm:text-lg text-md text-cyan flex items-center cursor-pointer"
    >
      <img src={logoSvg} alt="Logo" />
      <span>CryptoBucks</span>
    </Link>
  );
};
