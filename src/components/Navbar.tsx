"use client";
import React, { useState } from "react";
import { loadingCityAtom, placeAtom } from "@/app/atom";
import { useAtom } from "jotai";
import { MdOutlineLocationOn, MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
const Navbar = () => {
  const [city, setCity] = useState("");
  const [suggestions, setsuggestion] = useState<string[]>([]);
  const [error, setError] = useState<any>();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCityAtom);
  const handleInputChang = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/find?q=${value}&APPID=${process.env.NEXT_WEATHER_API_KEY}`
        );

        const suggestion = response.data.list.map((item: any) => item?.name);
        setsuggestion(suggestion);
        setError("");
        setShowSuggestions(true);
      } catch (err) {
        setsuggestion([]);
        setShowSuggestions(false);
      }
    } else {
      setsuggestion([]);
      setShowSuggestions(false);
    }
  };


  function handleSuggestionClick(value: string) {
    setCity(value);
    setShowSuggestions(false);
  }

  function handleSubmiSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    if (suggestions.length == 0) {
      setError("Location not found");
      setLoadingCity(false);
    } else {
      setError("");
      setTimeout(() => {
        setLoadingCity(false);
        setPlace(city);
        setShowSuggestions(false);
      }, 500);
    }
  }


  return (
    <nav className="shadow-sm  sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px]     w-full    flex   justify-between items-center  max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2  ">
          <span className="text-gray-500 text-3xl">Weather</span>
          <MdWbSunny className="text-3xl mt-1 text-yellow-300" />
        </p>
        {/*  */}
        <section className="flex gap-2 items-center">
          <MdMyLocation
            title="Your Current Location"
            // onClick={handleCurrentLocation}
            className="text-2xl  text-gray-400 hover:opacity-80 cursor-pointer"
          />
          <MdOutlineLocationOn className="text-3xl" />
          <p className="text-slate-900/80 text-sm">India </p>
          <div className="relative hidden md:flex">
            {/* SearchBox */}
            {/* <SearchBox/> */}
            <SearchBox
              value={city}
              onSubmit={handleSubmiSearch}
              onChange={(e) => handleInputChang(e.target.value)}
            />
   
            <SuggetionBox
            {...{
              showSuggestions,
              suggestions,
              handleSuggestionClick,
              error
            }}
          />
          </div>
        </section>
      </div>
    </nav>
  );
};

export default Navbar;

function SuggetionBox({
  showSuggestions,
  suggestions,
  handleSuggestionClick,
  error
}: {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
}) {
  return (
    <>
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {error && suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {error}</li>
          )}
          {suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
