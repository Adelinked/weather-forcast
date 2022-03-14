import styles from "../styles/daily.module.css";
import { CircularProgress } from "@mui/material";

const readDay = (dt) => {
  const d = new Date();
  const time = d.getTime();
  const day = new Date(time + Number(dt) * 24 * 3600 * 1000);
  return String(day).slice(0, 10);
};

export default function DailyForcast(props) {
  if (props.daily === "error")
    return <div>Something went wrong while getting the data!</div>;
  if (props.daily === "Loading")
    return (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  let daily = [...props.daily].slice(1, props.daily.length);

  return (
    <>
      <h2 className={styles.title}>The next days</h2>
      <div className={styles.dailyDiv}>
        {daily.map((i, index) => (
          <div key={index} className={styles.dayForc}>
            {" "}
            <span className={styles.date}>{readDay(index + 1)}</span>
            <span className={styles.tempDiv}>
              <span className={styles.temp}>{Math.floor(i.temp.day)}</span>
              <span className={styles.tempMin}>{Math.floor(i.temp.min)}</span>
              <span className={styles.tempMax}>
                {Math.floor(i.temp.max)}
              </span>{" "}
              °C
            </span>{" "}
            <span className={styles.weather}>{i.weather[0].description}</span>
          </div>
        ))}
      </div>
    </>
  );
}
