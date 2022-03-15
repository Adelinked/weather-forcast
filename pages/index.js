import { useCallback, useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import CityInput from "../components/CityInput";
import DailyForcast from "../components/DailyForcast";
import HourlyForcast from "../components/HourlyForcast";
import Head from "next/head";

const apiKey = process.env.OPENWEAHER_API_KEY;
let globalCity = "New York";
let lat = "40.7127281";
let lon = "-74.0060152";

const localTime = (timezone) => {
  const d = new Date();
  const diff = d.getTimezoneOffset();
  let time = d.getTime();
  const utc = time + diff * 60 * 1000;
  const local = new Date(utc + Number(timezone) * 1000);
  return String(local).slice(0, 21);
};

export async function getServerSideProps(context) {
  const data_source = `https://api.openweathermap.org/data/2.5/weather?q=${globalCity}&units=metric&appid=${apiKey}`;
  const res = await fetch(data_source);
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return {
    props: {
      initialData: JSON.parse(JSON.stringify(data)),
    },
  };
}

export default function Home({ initialData }) {
  if (initialData === "error") return <div>Server error!</div>;
  if (!initialData) return <div>Loading...</div>;

  const [data, setData] = useState(initialData);
  const [city, setCity] = useState();
  const [cityPos, setCityPos] = useState({ lat: lat, lon: lon });
  const [forcastData, setForcastData] = useState("Loading");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        getUserCityServer({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    getCityWeatherServer();
    setForcastData("Loading");
  }, [city]);

  useEffect(() => {
    getCityPositionServer();
  }, [city]);

  useEffect(() => {
    getPositionWeatherServer();
  }, [cityPos]);
  const handleChange = useCallback(
    (event) => {
      if (event.target.innerText) {
        setCity(event.target.innerText);
      } else {
        setCity(globalCity);
      }
    },
    [city]
  );

  async function getCityWeatherServer() {
    if (!city) return;
    const data_source = `/api/cityweather/weather?city=${city}`;
    const res = await fetch(data_source);
    const data = await res.json();
    if (res.status == 200) {
      setData(JSON.parse(JSON.stringify(data)));
    } else {
      setData(initialData);
    }
  }

  async function getUserCityServer(position) {
    if (!position) return;
    const data_source = `/api/city/city?lat=${position.lat}&lon=${position.lon}`;
    const res = await fetch(data_source);
    const data = await res.json();
    if (res.status == 200) {
      setCity(data[0].name);
    } else {
      setCity("New York");
    }
  }

  async function getCityPositionServer() {
    if (!city) return;
    const dataSource = `/api/position/position?city=${city}`;
    const res = await fetch(dataSource);
    const data = await res.json();
    if (res.status == 200) {
      setCityPos({ lat: data[0].lat, lon: data[0].lon });
    } else {
      setCityPos({ lat: lat, lon: lon });
    }
  }

  async function getPositionWeatherServer() {
    if (!cityPos) return;
    const dataSource = `/api/weather/weather?lat=${cityPos.lat}&lon=${cityPos.lon}`;
    const res = await fetch(dataSource);
    const data = await res.json();
    if (res.status !== 200) {
      setForcastData("error");
      throw new Error(data.message);
    }
    if (!data) {
      setForcastData("Loading");
    }
    setForcastData(JSON.parse(JSON.stringify(data)));
  }

  let dailyForcast = forcastData;
  let hourlyForcast = forcastData;
  if (forcastData !== "error" && forcastData !== "Loading") {
    const { daily, hourly, ...rest } = forcastData;
    dailyForcast = daily;
    hourlyForcast = hourly;
  }
  return (
    <>
      <Head>
        <title>Weather Forcast App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Weather forcast</h1>
          <p className={styles.openWeather}>
            Data source:
            <a
              className={styles.owLink}
              href="https://openweathermap.org/api"
              target="_blank"
            >
              Open Weather API's
            </a>
          </p>
        </div>

        <div className={styles.rowContainer}>
          <div className={styles.mainContainer}>
            <CityInput city={data.name} handleChange={handleChange} />
            <div className={styles.city}>
              <p className={styles.date}>{localTime(data.timezone)}</p>
              <h2>
                {data.name}, {data.sys.country}
              </h2>
            </div>
            <div className={styles.tempDiv}>
              <span className={styles.temp} title="day temperature">
                {Math.floor(data.main.temp)}
              </span>
              <span className={styles.tempMax} title="max temperature">
                {Math.floor(data.main.temp_max)}
              </span>
              <span className={styles.tempMin} title="min temperature">
                {Math.floor(data.main.temp_min)}
              </span>
              <span>°C</span>
            </div>
            <div>
              <h4 className={styles.weather}>
                Feels like: {Math.floor(data.main.feels_like)}°C.{" "}
                {data.weather[0].description}
              </h4>
              <div className={styles.weatherDetails}>
                <div className={styles.weatherDetLeft}>
                  <p title="wind">wind speed:{data.wind.speed}m/s </p>
                  <p title="pressure">pressure:{data.main.pressure}hPa</p>
                </div>
                <div className={styles.weatherDetRight}>
                  <p title="humidity">humidity:{data.main.humidity}%</p>
                  <p title="visibility">visibility:{data.visibility}%</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dayContainer}>
            <DailyForcast daily={dailyForcast} />
          </div>

          <div className={styles.hourContainer}>
            <HourlyForcast hourly={hourlyForcast} />
          </div>
          <div className={styles.rightContainer}></div>
        </div>
      </main>
    </>
  );
}
