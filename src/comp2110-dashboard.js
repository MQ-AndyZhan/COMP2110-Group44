import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/widget-column.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/todolist-widget.js';
import './components/homeoverview-widget.js';
import './components/devicecontroller-widget.js';
import './components/weather-widget.js';

class Comp2110Dashboard extends LitElement {
  static properties = {
    header: { type: String },
  }

  static styles = css`
    :host {
      min-height: 100vh;   
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: lightgoldenrodyellow;
    }

    .app-footer {
      margin: 0;
      color: rgb(221, 180, 104);
      font-size: calc(12px + 0.5vmin);
      align-items: center;
      background-color: rgb(34, 40, 57);
      width: 100%;
      height: 100px; 
      padding-top: 100px;
      font-size: 20px;
    }

    #NavigationBar {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: rgb(123, 138, 170);
      position: sticky;
      top: 0;
      z-index: 2;
    }

    li {
      float: right;
    }

    li a {
      display: block;
      color: white;
      text-align: center;
      padding: 18px 20px;
      text-decoration: none;
    }   

    li a:hover {
      background-color: rgb(106, 119, 154);;
    }

    #Dashboard {
      background-color: rgb(87, 95, 133);
    } 

    #WeatherWidget {
      background-color: rgb(34, 40, 57);
      width: 80%;
      height: 380px;
      margin: 0 auto;
      padding: 0 40px 30px 30px;
      border-radius: 10px;
    }

    #WeatherWidget h3 {
      color: rgb(221, 180, 104);
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin: 30px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 3px solid white;
    }

    .weather_blocks_container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
    }

    .weather_block {
      background-color: azure;
      border: 5px solid white;
      border-radius: 5%;
      width: 300px;
      height: 300px;
      padding: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }



    header {
      height: 400px;
      width: 80%;
      margin: auto;
      background-color: rgb(34, 40, 57);
      color: rgb(221, 180, 104);
      padding: 10px 30px 10px 35px;
      border-radius: 10px;
    }

    header h1 {
      marign: 0;
      padding-bottom: 10px;
      font-weight: 1000;
    }

    #LoginBlock{
      float: right;
      margin-right: 3%;
      border: 5px solid white;
      width: 800px;
      height: 250px;
      border-radius: 10px;
    }

    #AdBlock{
      float: left;
      margin-left: 3%;
    }
  `;

  constructor() {
    super();
    this.header = 'COMP2110 Home Automation';
  }

  render() {
    return html`
      <ul id="NavigationBar">
        <li><a href="#Contact">Contact</a></li>
        <li><a href="#Help">Help</a></li>
        <li><a href="#Blogs">Blogs</a></li>
        <li><a href="#Documentation">Documentation</a></li>
        <li><a id="Dashboard" href="#">Dashboard</a></li>
      </ul>
      <br><br>
      <header>
        <h1>${this.header}</h1>
        <div id="AdBlock">
          <ad-widget></ad-widget>
        </div>
        <div id="LoginBlock">
          <login-widget></login-widget>
        </div>
      </header>

      <br><br>

      
      <div id="WeatherWidget">
        <h3>Weather</h3>
        <div class="weather_blocks_container">
          <div class="weather_block">
            <weather-sydney-widget></weather-sydney-widget>
          </div>
          <div class="weather_block">
            <weather-current-location-widget></weather-current-location-widget>
          </div>
        </div>
      </div>



      <br>
      <home-overview></home-overview>
      <br><br><br>
      <device-controller></device-controller>
      <br><br><br>
      <todo-list id="#todolistWidget"></todo-list>

      <br><br><br><br>
      <p class="app-footer">
        A product of the COMP2110 Web Development Collective &copy; 2025
      </p>
    `;
  }
}

customElements.define('comp2110-dashboard', Comp2110Dashboard);