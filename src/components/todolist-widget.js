import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { BASE_URL } from '../config.js';

class TODO_List extends LitElement {
    static properties =  {
        url : {type: String},
        _summary: {type: String},
        _text: {type: String},
        _priority: {type: Number},
        _category: {type: String},
        _due: {type: Date},
        _id: {type: Number}
    }

    static styles = css`
        :host {
            color: rgb(221, 180, 104);    

        }

        #ToDoList {
            background-color: rgb(34, 40, 57);    
            height: 800px;   
            width: 80%;
            margin: auto;
            padding: 10px 30px 30px 30px; 
            border-radius: 10px;
        }

        #createTask {
            text-align: left;
            margin: 0;
            padding: 0 0px 0 45px;
            display: block;
            border: 5px solid white;
            width: 500px;
            height: 650px;
            float: left;
            border-radius: 10px;
        }

        input {
            border-radius: 5px;
            border: 0;
        }

        input[type="number"] {
            padding: 12px 20px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            background-color: #f8f8f8;
            font-size: 16px;
            resize: none;
        }

        input[type="date"] {
            padding: 10px 20px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            background-color: #f8f8f8;
            font-size: 16px;
            resize: none;
            width: 40%;
        }
        
        input[type="radio"] {
            height: 15px;
            width: 15px;
        }

        textarea {
            width: 90%;
            height: 80px;
            padding: 12px 20px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            background-color: #f8f8f8;
            font-size: 16px;
            resize: none;
        }

        #smry {
            height: 50px;
        }

        #create_btn {
            height: 40px;
            width: 100px;
            border: 2px solid #ccc;
            border-radius: 10px;
            background-color: #f8f8f8;
            font-size: 16px;
            margin-left: 70%;
        }

        #editTask {
            height: 640px;
            width: 550px;
            display: block;
            float: right;
            text-align: left;
            padding: 0 10px 10px 20px;
            border: 5px solid white;
            border-radius: 10px;
        }

        #editTask textarea {
            width: 80%;
            height: 80px;
            padding: 12px 20px;
            box-sizing: border-box;
            border: 2px solid #ccc;
            border-radius: 4px;
            background-color: #f8f8f8;
            font-size: 16px;
            resize: none;
        }

        #editTask button {
            height: 45px;
            width: 100px;
            border: 2px solid #ccc;
            border-radius: 10px;
            background-color: #f8f8f8;
            font-size: 16px;
            margin-left: 50px;
        }

        #editTask #edit_smry {
            height: 50px;
        }

        h2 {
            text-align: center;
            font-style: italic;
            padding: 0;
        }

        p {
            padding: 0;
            margin-bottom: 5px;
        }
        
        h3 {
            font-size: 30px;
            border: 5px solid white;
            padding: 10px 0 10px 0;
            border-radius: 10px;
            font-weight: 1000;
        }

        
    `;

    constructor() {
        super();
        this._url = `${BASE_URL}tasks/`;
        this._summary = '';
        this._text = '';
        this._category = '';
        this._due = '';
        this._priority = 1;
        this._id = 1;
    }   

    //Create a new task and store the task into the server
    createTask(event) {
        event.preventDefault(); //Prevent the webpage refreshes when the event is executed

        //Set the local properties with user's input
        this._summary = event.target.smry.value;
        this._text = event.target.txt.value;
        this._priority = event.target.priority.value;
        this._category = event.target.category.value;
        this._due = event.target.due.value;    
        
        // assign these local properties into an new JSON object
        const newTask = {
            summary: this._summary,
            text: this._text,
            priority: this._priority,  
            category: this._category,
            due: this._due
        };

        //Convert the JSON object into JSON string and send to the server
        fetch(this._url, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
            },
            body: JSON.stringify(newTask) 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            alert('Task created successfully. Your taskID is '+data.id); //display the id for the task that just created
        })
        .catch(error => {
            console.error('Error creating task:', error);
        });

        //clear user's input in the form after submitting to ready for another submission
        this.renderRoot.querySelector('#smry').value = '';
        this.renderRoot.querySelector('#txt').value = '';
        this.renderRoot.querySelector('#priority').value = '';
        this.renderRoot.querySelector('#todo').checked = false;
        this.renderRoot.querySelector('#completed').checked = false;
        this.renderRoot.querySelector('#due').value = '';
    }

    //Obtain task details from the server by using the ID of the task 
    getTask(event) {
        event.preventDefault();
        
        fetch(this._url+this._id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data);
            this._summary = data.summary;
            this._text = data.text;
            this._priority = data.priority;
            this._category = data.category;
            this._due = data.due;
            this._id = data.id;
            //Allow the user to update and delete the task since the task does exist in the server. 
            this.renderRoot.querySelector('#updateTask').disabled = false; 
            this.renderRoot.querySelector('#deleteTask').disabled = false; 
        })
        .catch(error => {
            alert("Your taskID "+"'"+this._id+"'"+" is not found");
            console.log("An error occured when getting the task: ", error);
        });

        //display the details of the task
        this.renderRoot.querySelector('#edit_smry').value = this._summary;
        this.renderRoot.querySelector('#edit_txt').value = this._text;
        this.renderRoot.querySelector('#edit_priority').value = this._priority;
        if(this._category === "Todo") {
            this.renderRoot.querySelector('#edit_todo').checked = true;
        }
        else if (this._category === "Completed") {
            this.renderRoot.querySelector('#edit_completed').checked = true;
        }
        this.renderRoot.querySelector('#edit_due').value= this.formatDate(this._due);
    }

    //Delete a task from the server by using the ID of the task
    deleteTask(event) {
        event.preventDefault();

        if (!(this.renderRoot.querySelector('#TaskID').value)) { //If the user inputted an empty task ID, the event will not execute
            alert("Please enter the id of an task at 'TaskID'. ");
        }
        else {
            fetch(this._url+this._id, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json(); 
            })
            .then(data => {
                alert("The ID "+"'"+this._id+"'"+" task has been deleted sucessfully.");
                console.log("Deleted task: ", data);
            })
            .catch(error => {
                alert("Your taskID "+"'"+this._id+"'"+" is not found");
                console.log("An error occured when deleting the task: ", error);
            });
    
            //clear the details of the task as the task has being deleted.
            this.renderRoot.querySelector('#TaskID').value = '';
            this.renderRoot.querySelector('#edit_smry').value = '';
            this.renderRoot.querySelector('#edit_txt').value = '';
            this.renderRoot.querySelector('#edit_priority').value = 1;
            this.renderRoot.querySelector('#edit_todo').checked = false;
            this.renderRoot.querySelector('#edit_completed').checked = false;
            this.renderRoot.querySelector('#edit_due').value = '';

            //initialise the local properties
            this._summary = '';
            this._text = '';
            this._category = '';
            this._due = '';
            this._priority = 1;

            //set the update and delete task button back to disable
            this.renderRoot.querySelector('#updateTask').disabled = true; 
            this.renderRoot.querySelector('#deleteTask').disabled = true; 
        }
    }

    //Update the details of a task from the server
    updateTask(event) {
        event.preventDefault();

        if (!(this.renderRoot.querySelector('#TaskID').value)) {
            alert("Please enter the id of an task at 'TaskID'. ");
        }
        else {
            //Create a new JSON object and assign it with the new task details from the user
            this._summary = this.renderRoot.querySelector('#edit_smry').value;
            console.log("Summary: "+this._summary);
            this._text = this.renderRoot.querySelector('#edit_txt').value;
            this._priority = this.renderRoot.querySelector('#edit_priority').value;
            if (this.renderRoot.querySelector('#edit_todo').checked === true) {
                this._category = "Todo";
            }
            else if (this.renderRoot.querySelector('#edit_completed').checked === true){
                this._category = "Completed";
            }
            this._due = this.renderRoot.querySelector('#edit_due').value;

            const updated_task = {
                summary: this._summary,
                text: this._text,
                priority: this._priority,  
                category: this._category,
                due: this._due
            };
            
            //Obatin the task and set it with new task details
            fetch(this._url+this._id, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer dbc6900e-e200-40fc-95a2-31eac36ef540'
                },
                body: JSON.stringify(updated_task)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json(); 
            })
            .then(data => {
                data = updated_task; //Assign the task with new task details
                alert("The ID "+"'"+this._id+"'"+" task has been updated sucessfully.");
            })
            .catch(error => {
                alert("Your taskID "+"'"+this._id+"'"+" is not found");
                console.log("An error occured when updating the task: ", error);
            });
    
            this.renderRoot.querySelector('#TaskID').value = '';
            this.renderRoot.querySelector('#edit_smry').value = '';
            this.renderRoot.querySelector('#edit_txt').value = '';
            this.renderRoot.querySelector('#edit_priority').value = 1;
            this.renderRoot.querySelector('#edit_todo').checked = false;
            this.renderRoot.querySelector('#edit_completed').checked = false;
            this.renderRoot.querySelector('#edit_due').value = '';

            this.renderRoot.querySelector('#updateTask').disabled = true; 
            this.renderRoot.querySelector('#deleteTask').disabled = true; 
        }
    }

    //Clear the details of previously searched task on the interface when the user inputting another task id
    _updateID(e) {
        this._id = e.target.value; //Assign the inputted task id into the local property. 
 
        this.renderRoot.querySelector('#updateTask').disabled = true; 
        this.renderRoot.querySelector('#deleteTask').disabled = true; 
        this.renderRoot.querySelector('#edit_smry').value = '';
        this.renderRoot.querySelector('#edit_txt').value = '';
        this.renderRoot.querySelector('#edit_priority').value = 1;
        this.renderRoot.querySelector('#edit_due').value = '';

        this._summary = '';
        this._text = '';
        this._category = '';
        this._due = '';
        this._priority = 1;
    }

    //Modify the format of the date value to allow it to display within a screen element
    formatDate(input) {
        const date = new Date(input);

        // Get 0-based values for day, month and year
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        // Format in year-month-day
        const formatted = `${year}-${month}-${day}`;
        
        return formatted;
    }    

    render() {
        return html`
            <div id="ToDoList">
                <h3>TODO List</h3>
                <form id="createTask" @submit=${this.createTask}>
                    <h2>Create a task</h2>
                    <p>Summary: </p>
                    <textarea id="smry" type="text" placeholder="Enter a summary" required></textarea>
                    <p>Text: </p>
                    <textarea id="txt" type="text" placeholder="Enter the text here" required></textarea>
                    <p>Priority: </p>
                    <input id="priority" type="number" min=1 placeholder="Enter the priority" value=1 required>
                    <p>Category:</p> 
                    <input id="todo" type="radio" value="Todo" name="category" checked>
                    <label for="todo">ToDo</label>
                    <input id="completed" type="radio" value="Completed" name="category">
                    <label for="completed" >Completed</label> 
                    <p>Due: </p><input id="due" type="date" required>
                    <br>
                    <br>
                    <button id="create_btn" type="submit" value="create" style="">Create</button>
                </form>
                <form id="editTask" @submit=${this.getTask}>
                    <h2 class="head">Edit a task</h2>
                    <p>TaskID: </p>
                    <input id="TaskID" @change=${this._updateID} min=1 type=number placeholder="Enter task id here..." required>
                    <button type="submit">Search</button>                    
                    <p>Summary: </p>
                    <textarea id="edit_smry" type="text"></textarea>
                    <p>Text: </p>
                    <textarea id="edit_txt" type="text"></textarea>
                    <p>Priority: </p>
                    <input id="edit_priority" type="number" value=1 min=1>  
                    <p>Category:</p> 
                    <input id="edit_todo" type="radio" value="Todo" name="edit_category">
                    <label for="todo">ToDo</label>
                    <input id="edit_completed" type="radio" value="Completed" name="edit_category">
                    <label for="completed">Completed</label> 
                    <p>Due: </p><input id="edit_due" type="date">
                    <button id="updateTask" @click=${this.updateTask} disabled>Update</button>
                    <button id="deleteTask" @click=${this.deleteTask} disabled>Delete</button>
                </form>
            </div>
        `;
    }

}

customElements.define('todo-list', TODO_List);