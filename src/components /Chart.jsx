import { useContext, useLayoutEffect, useState } from "react";
import {
  LineChart,
  Line,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext.jsx";

function CustomTooltip({ payload, label, active, currency = "gbp" }) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat(
          "en-UK",
          {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }
        ).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
}

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer
      className="recharts-responsiive-container"
      height="90%"
    >
      <LineChart width={400} height={400} data={data}>
        <Line
          type="monotone"
          dataKey={type}
          stroke="#14ffec"
          strokeWidth="1px"
        />
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" hide />
        <YAxis dateKey={type} hide domain={["auto", "auto"]} />
        <Tooltip
          content={<CustomTooltip />}
          currency={currency}
          cursor={false}
          wrapperStyle={{ outline: "none" }}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const Chart = ({ id }) => {
  const [chartData, setChartData] = useState();
  const { currency } = useContext(CryptoContext);
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    const getChartData = async (id) => {
      try {
        const data = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=${days}&interval=daily`
        )
          .then((res) => res.json())
          .then((data) => data);
        let convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });
        setChartData(convertedData);
      } catch (err) {
        console.log(err);
      }
    };
    getChartData(id);
  }, [id, type, days]);
  return (
    <div className="w-full h-[60%] ">
      <ChartComponent data={chartData} currency={currency} type={type} />
      <div className="flex md:flex-nowrap flex-wrap">
        <button
          className={`md:mt-0 mt-2 text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "prices"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setType("prices")}
        >
          price
        </button>
        <button
          className={`text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "market_caps"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setType("market_caps")}
        >
          market caps
        </button>
        <button
          className={`text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
            type === "total_volumes"
              ? "bg-cyan text-cyan"
              : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setType("total_volumes")}
        >
          total volumes
        </button>

        <button
          className={`text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded ${
            days === 7 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setDays(7)}
        >
          7d
        </button>
        <button
          className={`text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded ${
            days === 14 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setDays(14)}
        >
          14d
        </button>
        <button
          className={`text-sm py-0 px-1.5 ml-2 bg-opacity-25 rounded ${
            days === 30 ? "bg-cyan text-cyan" : "bg-gray-200 text-gray-100"
          } `}
          onClick={() => setDays(30)}
        >
          30d
        </button>
      </div>
    </div>
  );
};
