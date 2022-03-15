export default async function positionWeather({ query: { lat, lon } }, res) {
  const apiKey = process.env.OPENWEAHER_API_KEY;
  const dataSource = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${apiKey}`;
  const ress = await fetch(dataSource);
  const data = await ress.json();

  if (ress.status == 200) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Weather data not found" });
  }
}
