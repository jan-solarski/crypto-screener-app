import { Table } from "../components /Table";
import { Filters } from "../components /Filters";
import { Outlet } from "react-router-dom";

export const Crypto = () => {
  return (
    <section className="xs:w-[80%] w-[90%] h-full flex flex-col lg:mt-16 mt-8 mb-24 relative">
      <Filters />
      <Table />
      <Outlet />
    </section>
  );
};
