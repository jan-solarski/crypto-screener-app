import { Outlet } from "react-router-dom";
import { Logo } from "../components /Logo.jsx";
import { Navigation } from "../components /Navigation.jsx";
import { CryptoProvider } from "../context/CryptoContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Home = () => {
  const client = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });
  return (
    <QueryClientProvider client={client}>
      <CryptoProvider>
        <main className="w-full h-full flex flex-col first-letter:content-center items-center relative text-white">
          <div className="w-screen h-screen bg-gray-300 fixed -z-10" />
          <Logo />
          <Navigation />
          <Outlet />
        </main>
      </CryptoProvider>
    </QueryClientProvider>
  );
};