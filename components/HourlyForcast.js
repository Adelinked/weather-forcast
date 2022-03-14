import styles from "../styles/hourly.module.css";
import { CircularProgress } from "@mui/material";

const readHour = (ht) => {
  if (ht == 0) {
    return "Now";
  }
  const d = new Date();
  const time = d.getTime();
  const day = new Date(time + Number(ht) * 3600 * 1000);
  return String(day).slice(15, 18) + "h";
};

export default function HourlyForcast(props) {
  let hourly;
  if (props.hourly == "error")
    return <div>Something went wrong while getting the data!</div>;
  if (props.hourly == "Loading")
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  hourly = [...props.hourly].slice(0, 10);

  return (
    <>
      <h2>Hourly Forcast</h2>
      <div className={styles.hourlyDiv}>
        {hourly.map((i, index) => (
          <div key={index} className={styles.hourlyForc}>
            <span className={styles.hour}>{readHour(index)}:</span>
            <span className={styles.temp}>{Math.floor(i.temp)}°C</span>
            <span>{i.weather[0].description}</span>
          </div>
        ))}
      </div>
    </>
  );
}
