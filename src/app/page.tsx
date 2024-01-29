
'use client'
import Navbar from "@/components/Navbar";
import { useQuery } from "react-query";
import { format, parseISO } from 'date-fns';

import axios from 'axios'
import Card from "@/components/Card";
import { convertKelvintoCel } from "@/utils/convertKelvintoCel";
import { useAtom } from "jotai";
import { placeAtom } from "./atom";
import { useEffect, useLayoutEffect, useState } from "react";
import Loader from "@/components/Loader";
import {
  setKey,
  setDefaults,
  setLanguage,
  setRegion,
  fromAddress,
  fromLatLng,
  fromPlaceId,
  setLocationType,
  geocode,
  RequestType,
} from "react-geocode";
interface Coord {
  lon: number;
  lat: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Clouds {
  all: number;
}

interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

interface WeatherData {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [lat,setLat]=useState<any>();
  const[lon,setLon]=useState<any>();
  const [loading,setLoading]=useState<boolean>(false)
  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      setLoading(true)
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${place}&APPID=d75445a815f50f97bbc35c315b74fe54`
      );
      setLoading(false)
      return data;
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  useLayoutEffect(()=>{
  
    if ("geolocation" in navigator) {
     
      navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        
        setLat(latitude)
        setLon(longitude)
      if(lat && lon){
        const func=async()=>{
          const response = await axios.get(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=d75445a815f50f97bbc35c315b74fe54`) 
   
          console.log("response",response.data[0].name)
          setPlace(response.data[0].name)

        }
      func()
      
      
      }
         
    
      }, function(error) {
        console.error("Error getting location:", error.message);
      });
    }else {
  
      console.error("Geolocation is not supported by this browser.");
    }
  
  
  
  
     
    
  
  
  
  
  },[lat, lon])






  const currentDay = data?.dt;
  const formattedDay = currentDay ? format(new Date(currentDay * 1000), "EEEE") : '';
  const formattedDate = currentDay ? format(new Date(currentDay * 1000), "dd.MM.yyyy") : '';
  const Currenttemperature=convertKelvintoCel(data?.main?.temp)
  const MinTemp=convertKelvintoCel(data?.main?.temp_min)
  const maxTemp=convertKelvintoCel(data?.main?.temp_max)
  const description = data?.weather[0].description
 const city = data?.name

 console.log("data",data)
 if(loading){
  
  return <Loader/>
  
  
  }
  return (
     <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar/>
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9  w-full  pb-10 pt-4">
  {/* current weather */}
  <section>
    <div>
      <h2 className="flex gap-1 text-2xl  items-end ">
   <p>
    {formattedDay}
   </p>
   <p className="text-base">
  ({formattedDate})
   </p>
      </h2>
      <div>
      <Card currentTemp={Currenttemperature} minTemp={MinTemp} maxTemp={maxTemp} description={description} city={city} isLoading={loading}/>
      </div>
    </div>
  </section>
      </main>
     </div>
  );
}
