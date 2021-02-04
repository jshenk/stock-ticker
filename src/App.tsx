import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard, { News } from "./NewsCard";
import Stock, { Quote } from "./Stock";

function App() {
  const [newsData, setNewsData] = useState<News[]>([]);
  const [stockData, setStockData] = useState<Quote>();
  const [stockSymbol, setStockSymbol] = useState("GME");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      const response = await axios.get(
        `https://finnhub.io/api/v1/company-news?symbol=${stockSymbol}&from=2021-01-01&to=2021-02-01&token=c0cbl3v48v6u6kubncb0`
      );
      console.log("url news", response);

      if (!didCancel) {
        setNewsData(response.data);
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [stockSymbol]);

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=c0cbl3v48v6u6kubncb0`
      );
      console.log("url stock", response);
      if (!didCancel) {
        setStockData({
          openPrice: response.data.o,
          highPrice: response.data.h,
          lowPrice: response.data.l,
          previousClose: response.data.pc,
          currentPrice: response.data.c,
        });
      }

      setIsLoading(false);
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [stockSymbol]);

  function handleChange(event: {
    target: { value: React.SetStateAction<string> };
  }) {
    setStockSymbol(event.target.value);
  }
  console.log(stockData);
  return (
    <div className="bg-gray-800 py-20 px-10">
      <div className="flex flex-wrap max-w-6xl mx-auto">
        <div className="w-full md:w-2/3 lg:pr-10 md:pr-5">
          {isLoading ? (
            <div>Loading ...</div>
          ) : (
            stockData && (
              <Stock
                openPrice={stockData.openPrice}
                highPrice={stockData.highPrice}
                lowPrice={stockData.lowPrice}
                previousClose={stockData.previousClose}
                currentPrice={stockData.currentPrice}
                symbol={stockSymbol}
              />
            )
          )}
        </div>
        <div className="w-full md:w-1/3">
          <form className="mb-10" onSubmit={(e) => e.preventDefault()}>
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
          <div className="text-gray-400">
            <span className="block uppercase tracking-wide text-gray-400 text-sm font-bold mb-2">
              Suggested Searches
            </span>
            <ul>
              <li>PTON</li>
              <li>AMZN</li>
              <li>AAPL</li>
              <li>PFE</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto lg:grid lg:grid-cols-3 lg:gap-10">
        {newsData.slice(0, 3).map((item, index) => (
          <NewsCard
            key={index}
            headline={item.headline}
            url={item.url}
            datetime={item.datetime}
            summary={item.summary}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
