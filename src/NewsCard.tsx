import React from "react";
import moment from "moment";

export interface News {
  headline: string;
  summary: string;
  url: string;
  datetime: number;
}

function NewsCard(props: News) {
  const date = moment.unix(props.datetime).format("ll");

  return (
    <div className="bg-gray-900 rounded shadow p-5 text-gray-100 flex flex-col items-start mb-4">
      <span className="mb-2 text-xs text-gray-400 font-bold uppercase">
        {date}
      </span>
      <h2 className="font-bold mb-4 text-lg hover:underline leading-6">
        <a target="_blank" rel="noopener noreferrer" href={props.url}>
          {props.headline}
        </a>
      </h2>
      <p className="leading-tight mb-4 text-gray-400">{props.summary}</p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={props.url}
        className="hover:bg-green-500 px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded mt-auto"
      >
        Read Full Story
      </a>
    </div>
  );
}
export default NewsCard;
