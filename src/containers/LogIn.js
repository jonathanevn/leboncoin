import React, { Component } from "react";
import "../App.css";
import axios from "axios";

class LogIn extends Component {
  state = {
    email: "",
    password: "",
    messageAddressEmpty: null,
    messagePasswordEmpty: null,
    errorInput: false
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    if (this.state.email === "") {
      this.setState({
        messageAddressEmpty: "Veuillez entrez votre adresse email",
        errorInput: true
      });
      return null;
    } else if (this.state.password === "") {
      this.setState({
        messagePasswordEmpty: "Veuillez entrez votre mot de passe",
        errorInput: true
      });
      return null;
    }
    axios
      .post("https://leboncoin-api.herokuapp.com/api/user/log_in", {
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        // {
        //   account: {
        //     username: "farid";
        //   }
        //   token: "WKOCjBUoSZRfbicPLNVlCzrZPGKNA2YkcKBB9vwb8r9ysZJgoGCjJu0bhXJZgOZ8";
        //   _id: "5bf3c652d3e6e00014dd74bf";
        // }

        if (response.data && response.data.token) {
          this.props.setUser({
            token: response.data.token,
            username: response.data.account.username,
            _id: response.data._id
          });

          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  render() {
    return (
      <div className="container">
        <div className="body-connexion">
          <h2>Connexion</h2>
          <hr />
          <form className="form-connexion" onSubmit={this.onSubmit}>
            <div className="inputGroup">
              <label htmlFor="email">Adresse Email</label>
              <input
                id="email"
                name="email"
                type="text"
                className={this.state.errorInput === true ? "input-red" : ""}
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="error-message">
                {this.state.messageAddressEmpty}
              </div>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                name="password"
                type="password"
                className={this.state.errorInput === true ? "input-red" : ""}
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div className="error-message">
                {this.state.messagePasswordEmpty}
              </div>
            </div>
            <button className="submit-btn-2" type="submit">
              Se connecter
            </button>
            <div className="do-you-have-profile">
              <p className="bolder">Vous n'avez pas de compte ?</p>
              <button
                className="secondary-btn"
                onClick={() => this.props.history.push("sign_up")}
              >
                Créer un compte
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LogIn;
