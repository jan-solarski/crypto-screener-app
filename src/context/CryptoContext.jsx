import { createContext, useLayoutEffect, useState } from "react";
import axios from "axios";

export const CryptoContext = createContext({});
export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState();
  const [queryData, setQueryData] = useState();
  const [coinSearch, setCoinSearch] = useState("");
  const [currency, setCurrency] = useState("gbp");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(10);
  const [coinData, setCoinData] = useState();

  const getCryptoData = async () => {
    setCryptoData();
    try {
      const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
        .then((res) => res.json())
        .then((json) => json);
      setTotalPages(data.length);
    } catch (err) {
      console.log(err);
    }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinSearch}&order=${sortBy}&per_page=${perPage}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((data) => setCryptoData(data));
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    getCryptoData().then((data) => data);
  }, [coinSearch, currency, sortBy, page, perPage]);

  const getSearchQueryData = async (query) => {
    try {
      const data = await axios
        .get(`https://api.coingecko.com/api/v3/search?query=${query}`)
        .then((res) => setQueryData(res.data["coins"]));
    } catch (err) {
      console.log(err);
    }
  };

  const resetSearch = () => {
    setPage(1);
    setCoinSearch("");
  };

  const getCoinData = async (coinId) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((data) => setCoinData(data));
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
        page,
        setPage,
        totalPages,
        setTotalPages,
        resetSearch,
        perPage,
        setPerPage,
        getCoinData,
        coinData,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
