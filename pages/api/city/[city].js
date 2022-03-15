export default async function cityName({ query: { lat, lon } }, res) {
  const apiKey = process.env.OPENWEAHER_API_KEY;

  const data_source = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`;
  const ress = await fetch(data_source);
  const data = await ress.json();
  if (ress.status == 200) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "City not found" });
  }
}
