export default async function cityWeather({ query: { city } }, res) {
  const apiKey = process.env.OPENWEAHER_API_KEY;
  const data_source = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  const ress = await fetch(data_source);
  const data = await ress.json();
  if (ress.status == 200) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Weather data not found" });
  }
}
