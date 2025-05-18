import { LitElement, html, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import { getUser, storeUser, deleteUser} from '../auth.js';
import { BASE_URL } from '../config.js';

class LoginWidget extends LitElement {
  static properties = {
    loginUrl: { type: String },
    user: {type: String, state: true }
  }

  static styles = css`
    :host {
        display: block;
    }
    
    form {
      padding: 20px 10px 10px 10px;
      text-align: left;
      padding-left: 10%;
    
    }
    
    label {
      font-size: 20px;
    }

    .textboxes {
      padding: 10px 20px;
      box-sizing: border-box;
      border: 2px solid #ccc;
      border-radius: 4px;
      background-color: #f8f8f8;
      font-size: 16px;
      resize: none;
      width: 90%;
    }

    #SubmitBtn {
      height: 40px;
      width: 90%;
      border: 0;
      border-radius: 10px;
      background-color: #f8f8f8;
      font-size: 16px;
      cursor: pointer;
      background-color: rgb(123, 138, 170);
      color: white;
    }

    #SubmitBtn:hover {
      background-color: rgb(87, 95, 133);
    }


    button {
      height: 40px;
      width: 50%;
      border: 0;
      border-radius: 10px;
      background-color: #f8f8f8;
      font-size: 16px;
      cursor: pointer;
      background-color: rgb(123, 138, 170);
      color: white;
    }

    button:hover {
      background-color: rgb(87, 95, 133);
    }

    p {
      font-size: 20px;
      padding-top: 40px;
    }

      `;

  constructor() {
    super();
    this.loginUrl = `${BASE_URL}users/login`;
    this.user = getUser();
  }

  submitForm(event) { 
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    fetch(this.loginUrl, {
        method: 'post',
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(result => result.json()).then(response => {
        this.user = response;
        storeUser(response);
    })
  }

  logout() {
    deleteUser();
    this.user = null;
  }

  render() {
    if (this.user) {
        return html`<p>Logged in as ${this.user.name}</p><button @click=${this.logout}>Logout</button>`
    } 
    return html`
      <form @submit=${this.submitForm}>
          <label>Username:</label> <br>
          <input class="textboxes" name="username"> <br><br>  
          <label>Password:</label> <br>
          <input class="textboxes" type="password" name="password"> <br><br>
          <input id="SubmitBtn" type='submit' value='Login'>
      </form>`;
    
  }
}

customElements.define('login-widget',  LoginWidget);