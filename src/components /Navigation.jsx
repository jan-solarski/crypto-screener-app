import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="lg:w-[40%] sm:w-[80%] w-[90%] flex justify-around align-middle lg:mt-16 sm:mt-24 mt-20 border border-solid border-cyan sm:rounded-lg rounded-md">
      <NavLink
        to="/"
        end
        className={({ isActive }) => {
          return `w-full md:text-base text-center sm:m-2.5 m-1.5 rounded active:text-gray-300
          ${
            isActive
              ? "bg-cyan text-gray-300 font-semibold"
              : `bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan border-0 cursor-pointer capitalize font-semibold`
          }`;
        }}
      >
        Crypto
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full md:text-base text-center sm:m-2.5 m-1.5 rounded active:text-gray-300
          ${
            isActive
              ? "bg-cyan text-gray-300 font-semibold"
              : `bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan border-0 cursor-pointer capitalize font-semibold`
          }`;
        }}
      >
        Trending
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full md:text-base text-center sm:m-2.5 m-1.5 rounded active:text-gray-300
          ${
            isActive
              ? "bg-cyan text-gray-300 font-semibold rounded"
              : `bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan border-0 cursor-pointer capitalize font-semibold`
          }`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};
