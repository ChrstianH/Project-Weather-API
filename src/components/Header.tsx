import { useEffect, useState } from "react";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = "7abf028322cf0f7a9233e375a3634ca4";

export default function Header(props: {
  setWeatherData: (arg0: {
    description: string;
    image: string;
    temp: number;
    wind: number;
  }) => void;
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
      console.log(data);
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

  return (
    <header>
      <nav>
        <button onClick={handleHamburg}>Hamburg</button>
        <button onClick={handleBerlin}>Berlin</button>
        <button onClick={handleKoeln}>Köln</button>
        <button onClick={handleAustralien}>Australien</button>
      </nav>
    </header>
  );
}
