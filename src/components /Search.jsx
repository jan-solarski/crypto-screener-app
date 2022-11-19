import searchIcon from "../assets/search-icon.svg";
import { useContext, useState } from "react";
import { CryptoContext } from "../context/CryptoContext.jsx";
import debounce from "lodash.debounce";

const SearchInput = ({ handleSearch }) => {
  const [searchText, setSearchText] = useState("");
  const { queryData, setCoinSearch, setQueryData } = useContext(CryptoContext);

  const handleSearchInput = (e) => {
    setSearchText(e.target.value);
    handleSearch(e.target.value);
  };

  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setSearchText("");
    setQueryData();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchText);
  };
  return (
    <>
      <form
        className="w-96 relative flex items-center ml-7"
        onSubmit={handleSearchSubmit}
      >
        <input
          className="w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan"
          type="text"
          name="search"
          placeholder="search here..."
          value={searchText}
          onChange={handleSearchInput}
          autoComplete="off"
        />
        <button className="absolute right-1 cursor-pointer">
          <img className="w-full h-auto" src={searchIcon} alt="search icon" />
        </button>
      </form>
      {searchText.length > 0 && (
        <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-gray-200 bg-opacity-60 backdrop-blur scrollbar-thin scrollbar-thumb-gray-100 scrollbar-track-gray-200 scrollbar-thumb-rounded">
          {queryData ? (
            queryData.map((coin) => {
              return (
                <li
                  className="flex items-center ml-4 my-2 cursor-pointer"
                  key={coin.id}
                  onClick={() => selectCoin(coin.id)}
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={coin.thumb}
                    alt={coin.name}
                  />
                  <span>{coin.name}</span>
                </li>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <div
                className="w-8 h-8 border-4 border-cyan rounded-full border-b-gray-200 animate-spin"
                role="status"
              />
              <span className="ml-2">Searching...</span>
            </div>
          )}
        </ul>
      )}
    </>
  );
};

export const Search = () => {
  const { getSearchQueryData } = useContext(CryptoContext);

  const debounceFn = debounce((val) => getSearchQueryData(val), 2000);

  return (
    <div className="relative">
      <SearchInput handleSearch={debounceFn} />
    </div>
  );
};
