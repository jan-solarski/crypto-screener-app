import { createContext, useLayoutEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const CryptoContext = createContext({});
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [queryData, setQueryData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("gbp");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  // React Query fetch solution
  {
    /* const { data, isLoading, refetch } = useQuery(
    ["crypto"],
    () =>
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
        )
        .then((res) => res.data)
        .catch((err) => console.log(err)),
    {
      onSuccess: (data) => {
        setCryptoData(data);
      },
    }
  );*/
  }

  {
    /*const { data: searchQueryData } = useQuery(
    ["search data"],
    (query) => {
      return axios
        .get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
    {
      onSuccess: (data) => {
        setQueryData(data);
      },
    }
  ); */
  }
  ///

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((data) => setCryptoData(data));
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    getCryptoData().then((data) => data);
  }, [coinSearch, currency, sortBy]);

  const getSearchQueryData = async (query) => {
    try {
      const data = await axios
        .get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        .then((res) => setQueryData(res.data["coins"]));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        queryData,
        getSearchQueryData,
        setCoinSearch,
        setQueryData,
        currency,
        setCurrency,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
