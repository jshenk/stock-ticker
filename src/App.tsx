import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import Stock, { Quote } from "./Stock";

function App() {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [stockData, setStockData] = useState<Quote>();
  const [stockSymbol, setStockSymbol] = useState("GME");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://finnhub.io/api/v1/company-news?symbol=${stockSymbol}&from=2021-01-01&to=2021-02-01&token=c0cbl3v48v6u6kubncb0`
      );
      setNewsData(response.data);
    };
    fetchData();
  }, [stockSymbol]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=c0cbl3v48v6u6kubncb0`
      );
      setStockData({
        openPrice: response.data.o,
        highPrice: response.data.h,
        lowPrice: response.data.l,
        previousClose: response.data.pc,
        currentPrice: response.data.c,
      });
    };
    fetchData();
  }, [stockSymbol]);

  function handleChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setStockSymbol(event.target.value);
  }
  return (
    <div className="bg-gray-800 py-20 px-10 lg:h-screen">
      <div className="flex flex-wrap max-w-6xl mx-auto">
        <div className="w-full md:w-2/3 lg:pr-10 md:pr-5">
          {stockData && (
            <Stock
              openPrice={stockData.openPrice}
              highPrice={stockData.highPrice}
              lowPrice={stockData.lowPrice}
              previousClose={stockData.previousClose}
              currentPrice={stockData.currentPrice}
              symbol={stockSymbol}
            />
          )}
        </div>
        <div className="w-full md:w-1/3">
          <form className="mb-10">
            <label className="block uppercase tracking-wide text-gray-400 text-sm font-bold mb-2">
              Search By Symbol
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              type="text"
              name="stock symbol"
              value={stockSymbol}
              onChange={handleChange}
              placeholder="ex: AAPL"
            />
          </form>
        </div>
      </div>

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-3 lg:gap-10">
        {newsData.slice(0, 3).map((item) => (
          <NewsCard
            key={item.id}
            headline={item.headline}
            url={item.url}
            date={item.datetime}
            summary={item.summary}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
