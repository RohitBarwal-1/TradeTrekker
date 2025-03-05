import React, { useEffect, useState, useRef } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Stock {
  company_name: string;
  stock_price: number;
  percentage_change: string | number;
  logo_base64: string;
}

export default function StockMetrics() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/most_active")
      .then((response) => response.json())
      .then((data) => {
        setStocks(data.most_active);
      })
      .catch((error) => console.error("Error fetching stock data:", error));
  }, []);

  const startScrolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    intervalRef.current = window.setInterval(() => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1;
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    }, 50);
  };

  useEffect(() => {
    startScrolling();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopScrolling = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft -= 300;
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollLeft += 300;
  };

  return (
    <div className="relative w-full">
      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md z-10
          bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
        onClick={scrollLeft}
      >
        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto p-4 custom-scrollbar"
        onMouseEnter={stopScrolling} // Stop scrolling on hover
        onMouseLeave={startScrolling} // Resume scrolling when mouse leaves
      >
        {stocks.map((stock, index) => {
          const percentageChange = String(stock.percentage_change);
          const isNegative = percentageChange.startsWith("-");

          return (
            <div
              key={index}
              className="min-w-[250px] rounded-2xl border border-gray-200 bg-white p-5 
                        dark:border-gray-800 dark:bg-gray-900 md:p-6"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={`data:image/png;base64,${stock.logo_base64}`}
                  alt={stock.company_name}
                  className="w-12 h-12 rounded-xl"
                />
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {stock.company_name}
                  </span>
                  <h4 className="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">
                    ${stock.stock_price}
                  </h4>
                </div>
              </div>
              <div className="flex justify-end mt-3">
                <Badge color={isNegative ? "error" : "success"}>
                  {isNegative ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  {percentageChange}%
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md z-10
                  bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
      >
        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
      </button>

      {/* Hide Scrollbar Completely */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            display: none; /* Hide scrollbar for Chrome, Safari */
          }
          .custom-scrollbar {
            -ms-overflow-style: none;  /* Hide scrollbar for IE & Edge */
            scrollbar-width: none; /* Hide scrollbar for Firefox */
          }
        `}
      </style>
    </div>
  );
}
