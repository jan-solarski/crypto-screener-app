import { Table } from "../components /Table";
import { Filters } from "../components /Filters";
import { Outlet } from "react-router-dom";

export const Crypto = () => {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters />
      <Table />
      <Outlet />
    </section>
  );
};
