import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class Device_Controller extends LitElement {
    static properties = {
        _FloorLamp: {type: Number},
        _SpotLight: {type: Number},
        _Blinds: {type: Number},
        _WorktopLight: {type: Number},
        _AirConditioner: {type: Number},
        _selectedRoom: {type: String}
    }

    static styles = css`
        :host {
            margin: 0;
            color: rgb(221, 180, 104);  
        }

        h2 {
            border: 5px solid white;
            text-align: center;
            padding: 10px 0;
            font-weight: 1000;
            border-radius: 10px;
        }

        #DeviceController {
            width: 80%;
            height: 600px;
            background-color: rgb(34,40,57);
            background-size: auto;
            margin: auto;
            padding: 10px 30px 10px 30px;
            border-radius: 10px;
            text-align: left;
        }

        .slider {
            rotate: -90deg;
            width: 300px;
            height: 80px;
            -webkit-appearance: none;
            background-color: rgb(78, 88, 116);
            outline: none;
            border-radius: 15px;
            overflow: hidden;
            cursor: pointer;
            margin-left: 120px;
            margin-top: -60px;
            -webkit-transition: .3s;
            transition: opacity .3s;
            opacity: 60%;
        }

        .slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 10px;
            height: 80px;
            border: 10px solid white;
            background-color:rgb(221, 180, 104);
            box-shadow: -407px 0 0 400px rgb(221, 180, 104);
        }

        .slider:hover {
            opacity: 100%;
        }

        .Devices {
            border: 5px solid white;
            height: 400px;
            width: 320px;
            padding: 10px;
            display: block;
            float: left;
            margin-left: 3.5%;
            margin-top: 1%;
            border-radius: 10px;
        } 

        #DeviceController button {
            height: 45px;
            width: 100px;
            border: 2px solid #ccc;
            border-radius: 10px;
            background-color: #f8f8f8;
            font-size: 16px;
            margin-left: 50px;
            margin-left: 20px;
            cursor: pointer;
        }

        h4 {
            height: 10px;
            padding: 0 0 15px 15px;
            margin: 0;
            font-style: Italic;
        }

        h3 {
            font-style: Italic;
        }

        #RoomSelector {
            border-radius: 5px;
            font-size: 14px;
            padding: 3px;
        }
    
    `;

    constructor() {
        super();
        this._FloorLamp = 50;
        this._SpotLight = 30;
        this._Blinds = 70;
        this._WorktopLight = 80;
        this._AirConditioner = 24;
        this._selectedRoom = "Select a room";
    }

    //Display the value of the slide bar of a device when the user is adjusting it
    displayValue(e) {

        if(e.target.id === "Floor_Lamp") { //Check which device's slide bar is being adjusted
            this._FloorLamp = e.target.value; //return the value of that slide bar
        }
        else if(e.target.id === "Spot_Light") {
            this._SpotLight = e.target.value;
        }
        else if(e.target.id === "Blinds") {
            this._Blinds = e.target.value;
            if(e.target.value < 1) {
                this.renderRoot.querySelector('#Blinds_btn').textContent = 'Closed';
            }
            else if (e.target.value > 0) {
                this.renderRoot.querySelector('#Blinds_btn').textContent = 'Open';
            }
        }
        else if(e.target.id === "Worktop_Light") {
            this._WorktopLight = e.target.value;
        }
        else if(e.target.id === "Air_Conditioner") {
            this._AirConditioner = e.target.value;
        }
    }

    //Turn on or off the device  
    turnOnOff(e) {
        //If the device is already turned on, then the function will turn it off
        if(e.target.textContent === 'On' || e.target.textContent === 'Open') {  
            if(e.target.id === "FloorLamp_btn") { //Check which device is being turned off
                //Display the device's status and the user cannot interact with the devices that is turned off
                e.target.textContent = 'Off'; 
                this.renderRoot.querySelector('#Floor_Lamp').disabled = true; 
                this.renderRoot.querySelector('#Floor_Lamp').value = 0; 
                this._FloorLamp = 0;
            }
            else if(e.target.id === "SpotLight_btn") {
                e.target.textContent = 'Off';
                this.renderRoot.querySelector('#Spot_Light').disabled = true; 
                this.renderRoot.querySelector('#Spot_Light').value = 0; 
                this._SpotLight = 0;
            }
            else if(e.target.id === "Blinds_btn" || e.target.value === 0) {
                e.target.textContent = 'Closed';
                this.renderRoot.querySelector('#Blinds').value = 0; 
                this._Blinds = 0;
            }
            else if(e.target.id === "WorktopLight_btn") {
                e.target.textContent = 'Off';
                this.renderRoot.querySelector('#Worktop_Light').disabled = true; 
                this.renderRoot.querySelector('#Worktop_Light').value = 0; 
                this._WorktopLight = 0;
            }

            else if(e.target.id === "RangeHood_btn") {
                e.target.textContent = 'Off';
                this.renderRoot.querySelector('#Range_Hood').disabled = true; 
                this.renderRoot.querySelector('#Range_Hood').value = 0; 
            }

            else if(e.target.id === "AirConditioner_btn") {
                e.target.textContent = 'Off';
                this.renderRoot.querySelector('#Air_Conditioner').disabled = true; 
                this.renderRoot.querySelector('#Air_Conditioner').value = 0;
                this._AirConditioner = 0; 
            }
        }

        //If the device is already turned off, then the function will turn it on
        else if (e.target.textContent === 'Off' || e.target.textContent === 'Closed') {
            if(e.target.id === "FloorLamp_btn") { //Check which device is being turned on 
                //Display the device's status and the user is abled to interact with the device
                e.target.textContent = 'On';
                this.renderRoot.querySelector('#Floor_Lamp').disabled = false;
                this._FloorLamp = 1; 
            }
            else if(e.target.id === "SpotLight_btn") {
                e.target.textContent = 'On';
                this.renderRoot.querySelector('#Spot_Light').disabled = false;
                this._SpotLight = 1; 
            }
            else if(e.target.id === "WorktopLight_btn") {
                e.target.textContent = 'On';
                this.renderRoot.querySelector('#Worktop_Light').disabled = false;
                this._WorktopLight = 1; 
            }
            else if(e.target.id === "RangeHood_btn") {
                e.target.textContent = 'On';
                this.renderRoot.querySelector('#RangeHood_btn').disabled = false;
                this.renderRoot.querySelector('#Range_Hood').value = 100; 
            }
            else if(e.target.id === "AirConditioner_btn") {
                e.target.textContent = 'On';
                this.renderRoot.querySelector('#Air_Conditioner').disabled = false;
                this._AirConditioner = 18;
            }
        }
    }

    //Update the room selection and all the devices' status will be reset 
    _updateRoom(e) {
        this._selectedRoom = e.target.value;
        this._FloorLamp = 50;
        this._SpotLight = 30;
        this._Blinds = 70;
        this._WorktopLight = 80;
        this._AirConditioner = 24;
    }

    //Display specifc room and the devices within that room based on user's selection
    render() {
        if(this._selectedRoom === "Select a room") {
            return html`
            <div id="DeviceController">
                <h2>Device Controller</h2>
                <h4>Rooms: 
                <select id="RoomSelector" @change=${this._updateRoom}>
                    <option>Select a room</option>
                    <option>Kitchen</option>
                    <option>Living Room</option>
                </select>
                </h4>    
            `;
        }

        else if(this._selectedRoom === "Living Room") {
            return html`
            <div id="DeviceController">
                <h2>Device Controller</h2>
                <h4>Rooms: 
                <select id="RoomSelector" @change=${this._updateRoom}>
                    <option>Living Room</option>
                    <option>Select a room</option>
                    <option>Kitchen</option>
                </select>
                </h4>    
                <div class="Devices">
                    <h3>Floor Lamp: </h3><br>
                    <p>Brightness: <span>${this._FloorLamp+"%"}</span></p>
                    <p>Power: <button id="FloorLamp_btn" @click=${this.turnOnOff}>On</button></p>
                    <input type="range" min="1" max="100" value="50" class="slider" id="Floor_Lamp" @input=${this.displayValue}>
                </div>
                <div class="Devices">
                    <h3>Spot Lights: </h3><br>
                    <p>Brightness: <span>${this._SpotLight+"%"}</span></p>
                    <p>Power: <button id="SpotLight_btn" @click=${this.turnOnOff}>On</button></p>
                    <input type="range" min="1" max="100" value="30" class="slider" id="Spot_Light" @input=${this.displayValue}>
                </div>
                <div class="Devices">
                    <h3>Blinds: </h3><br>
                    <p>Open: <span>${this._Blinds+"%"}</span></p>
                    <p>Status: <button id="Blinds_btn" @click=${this.turnOnOff}>Open</button></p>
                    <input type="range" min="0" max="100" value="70" class="slider" id="Blinds" @input=${this.displayValue}>
                </div>
            </div>
            `;
        }

        else if(this._selectedRoom === "Kitchen") {
            return html`
            <div id="DeviceController">
                <h2>Device Controller</h2>
                <h4>Rooms: 
                <select id="RoomSelector" @change=${this._updateRoom}>
                    <option>Kitchen</option>
                    <option>Select a room</option>
                    <option>Living Room</option>
                </select>
                </h4>    
                <div class="Devices">
                    <h3>Worktop Light: </h3><br>
                    <p>Brightness: <span>${this._WorktopLight+"%"}</span></p>
                    <p>Power: <button id="WorktopLight_btn" @click=${this.turnOnOff}>On</button></p>
                    <input type="range" min="1" max="100" value="80" class="slider" id="Worktop_Light" @input=${this.displayValue}>
                </div>
                <div class="Devices">
                    <h3>Range Hood: </h3><br>
                    <p style="opacity: 0">Brightness: <span></span></p>
                    <p>Power: <button id="RangeHood_btn" @click=${this.turnOnOff}>Off</button></p>
                    <input type="range" min="1" max="100" value="0" class="slider" id="Range_Hood" disabled>
                </div>
                <div class="Devices">
                    <h3>Air Conditioner: </h3><br>
                    <p>Temperature: <span>${this._AirConditioner}&#176C</span></p>
                    <p>Power: <button id="AirConditioner_btn" @click=${this.turnOnOff}>Open</button></p>
                    <input type="range" min="18" max="32" value="24" class="slider" id="Air_Conditioner" @input=${this.displayValue}>
                </div>
            </div>
            `;
        }
    }

}
customElements.define('device-controller', Device_Controller);