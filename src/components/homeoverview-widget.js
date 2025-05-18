import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class HomeOverviewWidget extends LitElement {
    static properties = {
        header: { type: String },
        url: {type: String},
        _label: {type: String},
        _location: {type: String},
        _status: {type: String},
        _properties: {type: String},
        _type: {type: String}
      }

      //Home Overview Widget layout
      static styles = css`
      :host {
          display: block;
          width: 83.7%;
          height: 1420px;
          background-color: #222839;
          margin: auto;
          border-radius: 10px;
          color: rgb(221, 180, 104);
      }

      #HomeOverview {
        font-size: 30px;
        padding: 0;
        margin: 0;
        border-bottom: 8px solid rgb(221, 180, 104);
      }

      #Bedroom_Devices {
        text-align: center;
        display: block;
        border-right: 5px solid rgb(221, 180, 104);
        border-bottom: 5px solid rgb(221, 180, 104);
        width: 33%;
        height: 700px;
        float: left;
      }

      #LivingRoom_Devices {
        text-align: center;
        display: block;
        border-right: 5px solid rgb(221, 180, 104);
        border-bottom: 5px solid rgb(221, 180, 104);
        width: 33%;
        height: 700px;
        float: left;

      }

      #Kitchen_Devices {
        text-align: center;
        display: block;
        width: 33%;
        height: 700px;
        float: left;
        border-bottom: 5px solid rgb(221, 180, 104);
      }

      #Bedroom_Sensors {
        text-align: center;
        display: block;
        border-right: 5px solid rgb(221, 180, 104);
        border-bottom: 5px solid rgb(221, 180, 104);
        width: 33%;
        height: 600px;
        float: left;
      }

      #LivingRoom_Sensors {
        text-align: center;
        display: block;
        border-right: 5px solid rgb(221, 180, 104);
        border-bottom: 5px solid rgb(221, 180, 104);
        width: 33%;
        height: 600px;
        float: left;

      }

      #Kitchen_Sensors {
        text-align: center;
        display: block;
        width: 33%;
        height: 600px;
        float: left;
        border-bottom: 5px solid rgb(221, 180, 104);
      }

      #Label {
        height: 40px;
        width: 250px;
        border: 2px solid rgb(221, 180, 104);
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin-left: 0%;
      }

      #Location {
        height: 40px;
        width: 250px;
        border: 2px solid rgb(221, 180, 104);
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin-left: 0%;
      }     
      
      #Status {
        height: 40px;
        width: 250px;
        border: 2px solid rgb(221, 180, 104);
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin-left: 0%;
      }

      #Properties{
        height: 40px;
        width: 250px;
        border: 2px solid rgb(221, 180, 104);
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin-left: 0%;
      }

      #Type{
        height: 40px;
        width: 250px;
        border: 2px solid rgb(221, 180, 104);
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin-left: 0%;
      }

      #Create_Device_Button{
        height: 40px;
        width: 150px;
        border: 2px solid #ccc;
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin: auto;
      }

      #Create_Sensor_Button{
        height: 40px;
        width: 150px;
        border: 2px solid #ccc;
        border-radius: 10px;
        background-color: #f8f8f8;
        font-size: 16px;
        margin: auto;
      }

      h4 {
        font-weight: 1000;
        font-style: none;
        padding-top: 30px;
      }

      p {
        font-size: 20px;
      }

      h6 {
        font-size: 25px;
        font-style: Italic;
        padding: 50px 0 20px 0;
        margin: 0;
      }
    `;
    
    constructor() {
      super();
      this._url = `${BASE_URL}home/sensors/`;
      this._label = '';
      this._location = '';
      this._properties = '';
      this._status = '';
      this._type = '';
    }

    //Create new device
    Create_Device_Button(event){
      event.preventDefault();//Prevent webpage refresh when the program is run

      this._label = event.target.Label.value;
      this._location = event.target.Location.value;
      this._properties = event.target.Properties.value;
      this._status = event.target.Status.value;

      const newDevice = {
        label: this._label,
        location: this._location,
        properties: this._properties,
        status: this._status,
      };

      //Sends the properties to the API server
      fetch(this._url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
        },
        body: JSON.stringify(newDevice) 
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response error ' + response.statusText);
      }
      return response.json();
  })
    .then(data =>{
      alert('Device created successfully. Your new deviceID is '+data.id);
    })
    .catch(error => {
      console.error('Error creating device:', error);
  });

  //Clear previous input after running program
  this.renderRoot.querySelector('#Label').value = '';
  this.renderRoot.querySelector('#Location').value = '';
  this.renderRoot.querySelector('#Status').value = '';
  this.renderRoot.querySelector('#Properties').value = '';
    }

    Create_Sensor_Button(event){
      event.preventDefault();//Prevent webpage refresh when the program is run

      this._label = event.target.Label.value;
      this._location = event.target.Location.value;
      this._type = event.target.Type.value;

      const newSensor = {
        label: this._label,
        location: this._location,
        type: this._type,
      };

      //Sends the properties to the API server
      fetch(this._url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
        },
        body: JSON.stringify(newSensor) 
    })
    .then(response => {
      if (!response.ok) {
          throw new Error('Network response error ' + response.statusText);
      }
      return response.json();
  })
    .then(data =>{
      alert('Sensor created successfully. Your new SensorID is '+data.id);
    })
    .catch(error => {
      console.error('Error creating sensor:', error);
  });

  //Clear previous input after running program
  this.renderRoot.querySelector('#Label').value = '';
  this.renderRoot.querySelector('#Location').value = '';
  this.renderRoot.querySelector('#Type').value = '';
    }

    render() {
        return html`
        <div id="HomeOverview">
            <h4>Home Overview</h4>
            <form id="Bedroom_Devices" @submit=${this.Create_Device_Button}>
                <h6>Bedroom</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new device..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new device..." required></textarea>
                <p>Status</p>
                <textarea id="Status" type="text" placeholder="Enter the status of the new device..." required></textarea>
                <p>Properties</p>
                <textarea id="Properties" type="text" placeholder="Enter the properties of the new device..." required></textarea>
                <br>
                <br>
                <button id="Create_Device_Button">Create Device</button>
            </form>
            <form id="LivingRoom_Devices" @submit=${this.Create_Device_Button}>
                <h6>Living Room</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new device..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new device..." required></textarea>
                <p>Status</p>
                <textarea id="Status" type="text" placeholder="Enter the status of the new device..." required></textarea>
                <p>Properties</p>
                <textarea id="Properties" type="text" placeholder="Enter the properties of the new device..." required></textarea>
                <br>
                <br>
                <button id="Create_Device_Button">Create Device</button>
            </form>
            <form id="Kitchen_Devices" @submit=${this.Create_Device_Button}>
                <h6>Kitchen</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new device..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new device..." required></textarea>
                <p>Status</p>
                <textarea id="Status" type="text" placeholder="Enter the status of the new device..." required></textarea>
                <p>Properties</p>
                <textarea id="Properties" type="text" placeholder="Enter the properties of the new device..." required></textarea>
                <br>
                <br>
                <button id="Create_Device_Button">Create Device</button>
            </form>
            <form id="Bedroom_Sensors" @submit=${this.Create_Sensor_Button}>
                <h6>Bedroom</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new sensor..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new sensor..." required></textarea>
                <p>Type</p>
                <textarea id="Type" type="text" placeholder="Enter the type of the new sensor.." required></textarea>
                <br>
                <br>
                <button id="Create_Sensor_Button">Create Sensor</button>
            </form>
            <form id="LivingRoom_Sensors" @submit=${this.Create_Sensor_Button}>
                <h6>Living Room</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new sensor..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new sensor..." required></textarea>
                <p>Type</p>
                <textarea id="Type" type="text" placeholder="Enter the type of the new sensor.." required></textarea>
                <br>
                <br>
                <button id="Create_Sensor_Button">Create Sensor</button>
            </form>
            <form id="Kitchen_Sensors" @submit=${this.Create_Sensor_Button}>
                <h6>Kitchen</h6>
                <p>Label</p>
                <textarea id="Label" type="text" placeholder="Enter the label of the new sensor..." required></textarea>
                <p>Location</p>
                <textarea id="Location" type="text" placeholder="Enter the location of the new sensor..." required></textarea>
                <p>Type</p>
                <textarea id="Type" type="text" placeholder="Enter the type of the new sensor.." required></textarea>
                <br>
                <br>
                <button id="Create_Sensor_Button">Create Sensor</button>
            </form>

        </div>
        `;
    }
}

customElements.define('home-overview',HomeOverviewWidget)