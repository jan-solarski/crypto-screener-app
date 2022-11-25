import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

export const Logo = () => {
  return (
    <Link
      to="/"
      className="absolute sm:top-[1.5rem] top-[1rem] sm:left-[1.5rem] left-[1rem] [text-decoration:none]  text-cyan cursor-pointer flex items-center sm:text-lg text-md"
    >
      <img src={logoSvg} alt="Logo" className="w-[25%] h-auto" />
      <span>CryptoScreener</span>
    </Link>
  );
};
