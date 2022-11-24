import { createContext, useLayoutEffect, useState } from "react";

export const TrendingContext = createContext({});
export const TrendingProvider = ({ children }) => {
  const [trendData, setTrendData] = useState();

  const getTrendData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending
`
      )
        .then((res) => res.json())
        .then((data) => setTrendData(data.coins));
    } catch (err) {
      console.log(err);
    }
  };

  const resetTrendingData = () => {
    getTrendData();
  };

  useLayoutEffect(() => {
    getTrendData();
  }, []);

  return (
    <TrendingContext.Provider value={{ trendData, resetTrendingData }}>
      {children}
    </TrendingContext.Provider>
  );
};
