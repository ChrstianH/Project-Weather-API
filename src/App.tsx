import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";

type Weather = {
  description: string;
  image: string;
  temp: number;
  wind: number;
};

function App() {
  const [weatherData, setWeatherData] = useState<Weather>();

  return (
    <div>
      <Header setWeatherData={setWeatherData} />
      <Main weatherData={weatherData} />
    </div>
  );
}

export default App;
