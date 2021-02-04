import React from "react";

export interface Quote {
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  previousClose: number;
  currentPrice: number;
  symbol?: string;
}

function Stock(props: Quote) {
  const increase = props.currentPrice - props.previousClose;
  const precentIncrease = (increase / props.previousClose) * 100;
  return (
    <div className="bg-gray-700 mb-10 p-5 rounded shadow text-center text-gray-100">
      <div className="mb-10">
        <div>{props.symbol}</div>
        <div className="text-3xl font-bold">
          ${props.currentPrice.toFixed(2)}
        </div>
        <span
          className={
            props.currentPrice > props.previousClose
              ? "border-b-2 border-green-500"
              : "border-b-2 border-red-500"
          }
        >
          {precentIncrease.toFixed(2)}%
        </span>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-600 p-5 rounded shadow">
          <span className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
            Open
          </span>
          <div className="font-bold text-lg">${props.openPrice.toFixed(2)}</div>
        </div>
        <div className="bg-gray-600 p-5 rounded shadow">
          <span className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
            Daily High
          </span>
          <div className="font-bold text-lg">${props.highPrice.toFixed(2)}</div>
        </div>
        <div className="bg-gray-600 p-5 rounded shadow">
          <span className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2">
            Daily Low
          </span>
          <div className="font-bold text-lg">${props.lowPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}
export default Stock;
