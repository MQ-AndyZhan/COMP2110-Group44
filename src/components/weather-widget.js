import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

// Weather condition codes according to WMO standards
const weatherCodes = {
  1: 'Clear sky ☀️',
  2: 'Partly cloudy 🌤️',
  3: 'Cloudy ☁️',
  4: 'Overcast ☁️',
  5: 'Fog 🌫️',
  6: 'Light rain 🌦️',
  7: 'Moderate rain 🌧️',
  8: 'Heavy rain ⛈️',
  9: 'Thunderstorms 🌩️',
  10: 'Snow ❄️',
  11: 'Windy 💨',
};

// Fetch weather data from Open-Meteo API
async function fetchWeather(latitude, longitude) {
  const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data.current_weather;
}

// Sydney widget
class WeatherSydneyWidget extends LitElement {
  static properties = {
    weather: { type: Object },
  };

  static styles = css`
        div {
            padding: 16px;
            border-radius: 10px;
            color: rgb(34, 40, 57);
            background-color: lightgray;
        }

        h3 {
            margin-top: 0;
            color: rgb(34, 40, 57);
            font-size: 25px;
            font-style: italic;
        }

        p {
            margin: 6px 0;
            font-size: 20px;
        }
    `;

  async connectedCallback() {
    super.connectedCallback();
    this.weather = await fetchWeather(-33.865143, 151.209900); // Sydney coordinates from https://www.latlong.net/ 
  }

  render() {
    // if weather data hasn't loaded yet : displays ->
    if (!this.weather) {
      return html`<p>Loading Sydney weather...</p>`;
    }

    // displays this
    return html`
            <div>
                <h3>Sydney Weather</h3>
                <p>Temperature: ${this.weather.temperature}°C</p>
                <p>Wind Speed: ${this.weather.windspeed} km/h</p>
                <p>Condition: ${weatherCodes[this.weather.weathercode]}</p>
            </div>
        `;
  }
}

// Current Location widget
class WeatherCurrentLocationWidget extends LitElement {
  static properties = {
    weather: { type: Object },
  };

  // css
  static styles = css`
        div {
            padding: 16px;
            border-radius: 10px;
            color: rgb(34, 40, 57);
            background-color: lightgray;
        }

        h3 {
            margin-top: 0;
            color: rgb(34, 40, 57);
            font-size: 25px;
            font-style: italic;
        }

        p {
            margin: 6px 0;
            font-size: 20px;
        }
    `;

  // when compnent is connected, it will try to get user's current geoloc
  async connectedCallback() {
    super.connectedCallback();
    // Get user's current location
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.weather = await fetchWeather(latitude, longitude); // User's current location weather
      this.requestUpdate();  // Trigger an update to re-render the widget
    }, () => {
      // will default to cloudy if data access is denied
      this.weather = { temperature: 'N/A', windspeed: 'N/A', weathercode: '3' }; // This will default to a cloudy 
      this.requestUpdate();  // triggers an update to re-render the widget
    });
  }

  //reder the current location's widget
  render() {
    //display if data isnt ready
    if (!this.weather) {
      return html`<p>Loading current location weather...</p>`;
    }

    //display the weather data
    return html`
            <div>
                <h3>Your Current Location's Weather</h3>
                <p>Temperature: ${this.weather.temperature}°C</p>
                <p>Wind Speed: ${this.weather.windspeed} km/h</p>
                <p>Condition: ${weatherCodes[this.weather.weathercode]}</p>
            </div>
        `;
  }
}

// custom elements
customElements.define('weather-sydney-widget', WeatherSydneyWidget);
customElements.define('weather-current-location-widget', WeatherCurrentLocationWidget);
