type Weather = {
  description: string;
  image: string;
  temp: number;
  wind: number;
};

export default function Main(props: { weatherData: Weather | undefined }) {
  return (
    <main>
      <div>{props.weatherData?.description}</div>
      <div>{props.weatherData?.image}</div>
      <div>{`Temperatur: ${props.weatherData?.temp}`} °C</div>
      <div>{`Wind: ${props.weatherData?.wind}`} m/s</div>
    </main>
  );
}
