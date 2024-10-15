import { useEffect, useState } from "react";
import { Location } from "../App";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "7abf028322cf0f7a9233e375a3634ca4";

export default function Header(props: {
  setWeatherData: (arg0: {
    description: string;
    image: string;
    temp: number;
    wind: number;
  }) => void;
  setAddLocation: (arg0: boolean) => void;
  setLocations: (arg0: Location[]) => void;
  locations: Location[];
}) {
  const [url, setUrl] = useState("");

  function handleHamburg() {
    setUrl(`${BASE_URL}?q=Hamburg,de&appid=${API_KEY}`);
  }
  function handleBerlin() {
    setUrl(`${BASE_URL}?q=Berlin,de&appid=${API_KEY}`);
  }
  function handleKoeln() {
    setUrl(`${BASE_URL}?q=Cologne,de&appid=${API_KEY}`);
  }
  function handleAustralien() {
    setUrl(`${BASE_URL}?q=Australia&appid=${API_KEY}`);
  }

  useEffect(() => {
    getWeatherData();
  }, [url]);

  async function getWeatherData() {
    try {
      if (url.length === 0) return;

      const response = await fetch(url);
      const data = await response.json();
      props.setWeatherData({
        description: data.weather[0].description,
        image: data.weather[0].icon,
        temp: Math.floor(data.main.temp * 100 - 27315) / 100,
        wind: data.wind.speed,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getAdditionalLocations();
  }, []);

  async function getAdditionalLocations() {
    try {
      const jsonData = localStorage.getItem("locations") || "";
      console.log(jsonData);
      const data: Location[] = JSON.parse(jsonData);
      props.setLocations(data);
    } catch (error) {
      console.error(error);
    }
  }

  function clickAddLoc(event: React.MouseEvent<HTMLButtonElement>) {
    setUrl(
      `${BASE_URL}?q=${
        (event.target as HTMLButtonElement).textContent
      }&appid=${API_KEY}`
    );
    getWeatherData();
  }

  function handleDoubleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const location = (event.target as HTMLButtonElement).textContent;
    let newLocations: Location[] = [...props.locations];
    newLocations = newLocations.filter(
      (filterLocation) => filterLocation.name !== location
    );
    localStorage.setItem("locations", JSON.stringify(newLocations));
    props.setLocations(newLocations);
  }

  return (
    <header>
      <nav>
        <button onClick={handleHamburg}>Hamburg</button>
        <button onClick={handleBerlin}>Berlin</button>
        <button onClick={handleKoeln}>Köln</button>
        <button onClick={handleAustralien}>Australien</button>
        {props.locations.map((location) => (
          <button onDoubleClick={handleDoubleClick} onClick={clickAddLoc}>
            {location.name}
          </button>
        ))}
        <button onClick={() => props.setAddLocation(true)}>+</button>
      </nav>
    </header>
  );
}
