import { Outlet } from "react-router-dom";
import { Logo } from "../components /Logo.jsx";
import { Navigation } from "../components /Navigation.jsx";
import { CryptoProvider } from "../context/CryptoContext.jsx";
import { TrendingProvider } from "../context/TrendingContext.jsx";

export const Home = () => {
  return (
    <CryptoProvider>
      <TrendingProvider>
        <main className="w-full h-full flex flex-col first-letter:content-center items-center relative text-white">
          <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
          <Logo />
          <Navigation />
          <Outlet />
        </main>
      </TrendingProvider>
    </CryptoProvider>
  );
};
