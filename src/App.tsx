import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import LocationInput from "./components/LocationInput";

type Weather = {
  description: string;
  image: string;
  temp: number;
  wind: number;
};

export type Location = {
  name: string;
};

function App() {
  const [weatherData, setWeatherData] = useState<Weather>();
  const [addLocation, setAddLocation] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <div>
      <Header
        setWeatherData={setWeatherData}
        setAddLocation={setAddLocation}
        setLocations={setLocations}
        locations={locations}
      />
      {!addLocation && <Main weatherData={weatherData} />}
      {addLocation && (
        <LocationInput
          locations={locations}
          setLocations={setLocations}
          setAddLocation={setAddLocation}
        />
      )}
    </div>
  );
}

export default App;
