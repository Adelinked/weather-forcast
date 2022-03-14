import React from "react";

import { Autocomplete, TextField } from "@mui/material";

let cities = [
  "Berlin",
  "Moscow",
  "Zagreb",
  "Lisboa",
  "London",
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Adelaide",
  "Perth",
  "Hobart",
  "New York",
  "Paris",
  "Madrid",
  "Rome",
  "Cairo",
  "Pekin",
  "Tokyo",
];

export default function CityInput(props) {
  const userCity = props.city;
  cities =
    cities.filter((c) => c === userCity).length > 0
      ? cities
      : [userCity, ...cities];

  return (
    <>
      <Autocomplete
        onChange={props.handleChange}
        value={userCity}
        disablePortal
        id="combo-box-demo"
        options={cities}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
    </>
  );
}
