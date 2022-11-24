import { TrendingContext } from "../context/TrendingContext.jsx";
import { useContext } from "react";
import { TrendingCoin } from "../components /TrendingCoin.jsx";
import { Outlet } from "react-router-dom";

export const Trending = () => {
  const { trendData } = useContext(TrendingContext);
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly mt-9 border border-gray-100 rounded">
        {trendData &&
          trendData.map((coin) => {
            return <TrendingCoin key={coin.item.id} data={coin.item} />;
          })}
        <Outlet />
      </div>
    </section>
  );
};
