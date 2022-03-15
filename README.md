# Weather forcast application developed with Next.js React framework

This project contains the source code for a very simple realtime weather focast application.

Here is a screenshot of the application.
![App Screenshot](https://i.postimg.cc/sxd65NGZ/Screenshot.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

**Install Node on your machine**: Ensure that you have **Node** and **npm** or **Yarn** installed on your machine. To install Node and npm on your machine, see the [Node download page](https://nodejs.org/en/download/). If you prefer using [Yarn](https://yarnpkg.com/) as your package manager to using npm, you can [get Yarn here](https://yarnpkg.com/en/docs/install).

### Setup Instructions

1. **Clone the repository** into a new directory on your machine.

2. **Install the dependencies** by running the following command from the new directory.

```sh
npm install
```

or using `yarn`

```sh
yarn install
```

3. **Create a `.env.local` file** in the root of the new directory with the following content.

```ini

OPENWEAHER_API_KEY =YOUR_OPEN_WEATHER_API_KEY

```

4. **Start the app** by running the following command. The app will run on port 3000 except that port is already in use.

```sh
npm run dev
```

For `production`

```sh
npm start
```

after building with

```sh
npm run build
```

## Built With

Here is a list of the technologies used in this project.

1. [Next.js](https://learnnextjs.com/) - A framework for building server-side rendered(SSR) React applications with ease. It handles most of the challenges that come with building SSR React apps.

2. [React](https://reactjs.org/) - A very popular JavaScript DOM rendering framework for building scalable web applications using a component-based architecture.

3. [MUI React UI library](https://mui.com) - MUI provides a robust, customizable, and accessible library of foundational and advanced components, enabling you to build your design system and develop React applications faster.

4. [Open Weather API](https://openweathermap.org/api) - OpenWeather provides historical, current and forecasted weather data via light-speed APIs.

5. [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API) - The Geolocation API is used to retrieve the user's location, so that it can for example be used to display their position using a mapping API.

you can see the application deployed using Vercel (https://vercel.com) here : [Weather forcast](weather-forcast-iota.vercel.app)
