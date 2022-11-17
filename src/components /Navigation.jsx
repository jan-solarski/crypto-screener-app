import { NavLink } from "react-router-dom";

export const Navigation = () => {
  return (
    <nav className="w-[40%] mt-16 flex justify-around align-middle border border-cyan rounded-lg">
      <NavLink
        to="/"
        // end
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5 rounded
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
          return `w-full text-base text-center m-2.5 rounded
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
          return `w-full text-base text-center m-2.5 rounded
          ${
            isActive
              ? "bg-cyan text-gray-300 font-semibold"
              : `bg-gray-200 text-gray-100 hover:text-cyan active:bg-cyan border-0 cursor-pointer capitalize font-semibold`
          }`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};
