import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { CryptoContext } from "./CryptoContext.jsx";

export const StorageContext = createContext({});
export const StorageProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [savedData, setSavedData] = useState();
  const { currency, sortBy } = useContext(CryptoContext);

  const saveCoin = (coinId) => {
    const oldCoins = JSON.parse(localStorage.getItem("coins"));
    if (oldCoins.includes(coinId)) {
      return null;
    } else {
      const newCoin = [...oldCoins, coinId];
      setAllCoins(newCoin);
      localStorage.setItem("coins", JSON.stringify(newCoin));
    }
  };

  const removeCoin = (coinId) => {
    const oldCoins = JSON.parse(localStorage.getItem("coins"));
    const newCoin = oldCoins.filter((coin) => coin !== coinId);
    setAllCoins(newCoin);
    localStorage.setItem("coins", JSON.stringify(newCoin));
  };

  const getSavedData = async (totalCoins = allCoins) => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${totalCoins.join(
          ","
        )}&order=${sortBy}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
        .then((res) => res.json())
        .then((data) => setSavedData(data));
    } catch (err) {
      console.log(err);
    }
  };

  const resetSavedResult = () => {
    getSavedData();
  };

  useEffect(() => {
    allCoins.length > 0 ? getSavedData(allCoins) : setSavedData();
  }, [allCoins]);

  useLayoutEffect(() => {
    const isThere = JSON.parse(localStorage.getItem("coins")) || false;
    if (!isThere) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      const totalCoins = JSON.parse(localStorage.getItem("coins"));
      setAllCoins(totalCoins);

      if (totalCoins.length > 0) {
        getSavedData(totalCoins);
      }
    }
  }, []);

  return (
    <StorageContext.Provider
      value={{ allCoins, saveCoin, removeCoin, savedData, resetSavedResult }}
    >
      {children}
    </StorageContext.Provider>
  );
};
