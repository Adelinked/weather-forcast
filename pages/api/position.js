export default async function cityPosition({ query: { city } }, res) {
  const apiKey = process.env.OPENWEAHER_API_KEY;
  const dataSource = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
  const ress = await fetch(dataSource);
  const data = await ress.json();
  if (ress.status == 200) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Position not found" });
  }
}
