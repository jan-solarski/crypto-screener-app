import paginationArrow from "../assets/pagination-arrow.svg";
import { useContext, useRef } from "react";
import { CryptoContext } from "../context/CryptoContext.jsx";
import submitIcon from "../assets/submit-icon.svg";

const PerPage = () => {
  const { setPerPage } = useContext(CryptoContext);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let val = inputRef.current.value;
    if (val !== 0) {
      setPerPage(val);
      inputRef.current.value = val;
    }
  };

  return (
    <form className="relative flex items-center mr-6" onSubmit={handleSubmit}>
      <label
        htmlFor="perPage"
        className="flex justify-center items-center mr-2 font-bold"
      >
        per page:
      </label>
      <input
        id="perPage"
        type="number"
        min={1}
        max={250}
        name="perPage"
        placeholder="10"
        className="w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4"
        ref={inputRef}
      />
      <button className="ml-1 cursor-pointer">
        <img src={submitIcon} alt="submit icon" className="w-full h-auto" />
      </button>
    </form>
  );
};

export const Pagination = () => {
  const { page, setPage, totalPages, perPage, cryptoData } =
    useContext(CryptoContext);
  const totalNumber = Math.ceil(totalPages / perPage);

  const next = () => {
    page < totalNumber && setPage(page + 1);
  };
  const prev = () => {
    page !== 1 && setPage(page - 1);
  };

  const multistepNext = () => {
    page + 3 >= totalNumber ? setPage(totalNumber - 1) : setPage(page + 3);
  };

  const multistepPrev = () => {
    page - 3 <= 1 ? setPage(totalNumber + 1) : setPage(page - 2);
  };

  return (
    <>
      {cryptoData && cryptoData.length >= perPage && (
        <div className="flex md:flex-row flex-col items-center md:mt-0 mt-4">
          <PerPage />
          <ul className="flex items-center justify-end text-sm sm:mt-3.5 md:mt-0 lg:mt-0">
            <li className="flex items-center">
              <button className="outline-0 hover:text-cyan w-8" onClick={prev}>
                <img
                  className="w-full h-auto rotate-180"
                  src={paginationArrow}
                  alt="left"
                />
              </button>
            </li>
            {(page + 1 === totalNumber || page === totalNumber) && (
              <li>
                <button
                  className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  onClick={multistepPrev}
                >
                  ...
                </button>
              </li>
            )}
            {page - 1 !== 0 && (
              <li>
                <button
                  className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                  onClick={prev}
                >
                  {page - 1}
                </button>
              </li>
            )}
            <li>
              <button
                disabled
                className="outline-0 rounded-full w-8 h-8 flex items-center justify-center bg-cyan text-gray-300 mx-1.5"
              >
                {page}
              </button>
            </li>
            {page + 1 !== totalNumber && page !== totalNumber && (
              <li>
                <button
                  className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 mx-1.5"
                  onClick={next}
                >
                  {page + 1}
                </button>
              </li>
            )}
            {page + 1 !== totalNumber && page !== totalNumber && (
              <li>
                <button
                  className="outline-0 hover:text-cyan rounded-full w-8 h-8 flex items-center justify-center text-lg"
                  onClick={multistepNext}
                >
                  ...
                </button>
              </li>
            )}
            {page !== totalNumber && (
              <li>
                <button
                  onClick={() => setPage(totalNumber)}
                  className="outline-0 hover:text-cyan rounded-full w-10 h-10 flex items-center justify-center bg-gray-200 mx-1.5"
                >
                  {totalNumber}
                </button>
              </li>
            )}
            <li>
              <button className="outline-0 hover:text-cyan w-8" onClick={next}>
                <img
                  className="w-full h-auto"
                  src={paginationArrow}
                  alt="right"
                />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
