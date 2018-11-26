import React, { Component } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import { faBell, faClock, faEye } from "@fortawesome/free-solid-svg-icons";

const validator = require("email-validator");

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    confirmpassword: "",
    passwordIncorrect: false,
    CGU: false,
    offres: false,
    message: null,
    messageEmail: null,
    messageCGU: null
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.password !== this.state.confirmpassword) {
      this.setState({
        message: "Veuillez entrez des mots de passe similaires",
        passwordIncorrect: true
      });
      return null;
    }
    if (!validator.validate(this.state.email)) {
      this.setState({
        messageEmail: "Veuillez entrez une adresse email valide"
      });
      return null;
    }
    if (!this.state.CGU) {
      this.setState({
        messageCGU:
          "Vous devez prendre connaissance des CGV et les cocher pour créer votre Compte Particulier."
      });
    } else {
      this.setState({ message: null });
      axios
        .post("https://leboncoin-api.herokuapp.com/api/user/sign_up", {
          email: this.state.email,
          password: this.state.password,
          username: this.state.username
        })
        .then(response => {
          // console.log(response.data);
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
    }
  };

  // htmlfor = "" : dans html on met "for" / dans react "htmlfor" pour lier un label à un input.
  //
  render() {
    return (
      <div className="container">
        <div className="body">
          <form className="form" onSubmit={this.onSubmit}>
            <h2 className="create-profile">Créez un compte</h2>
            <hr />
            <div className="inputGroup">
              <label htmlFor="username">Pseudo</label>
              <input
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />

              <label htmlFor="email">Adresse email</label>
              <input
                id="email"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="error-message">{this.state.messageEmail}</div>

              <div className="two-inputs">
                <div className="left-input">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={
                      this.state.passwordIncorrect === true ? "input-red" : ""
                    }
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div className="error-message">{this.state.message}</div>
                </div>

                <div className="right-input">
                  <label htmlFor="confirmpassword">
                    Confirmer le mot de passe
                  </label>
                  <input
                    id="confirmpassword"
                    name="confirmpassword"
                    type="password"
                    className={
                      this.state.passwordIncorrect === true ? "input-red" : ""
                    }
                    value={this.state.confirmpassword}
                    onChange={this.handleChange}
                  />
                  <div className="error-message">{this.state.message}</div>
                </div>
              </div>
              <div className="opt-ins">
                <div className="opt-in">
                  <input
                    type="checkbox"
                    name="offres"
                    className="checkmark"
                    value={this.state.offres}
                    onChange={this.handleChange}
                  />
                  <p>
                    Je souhaite recevoir des offres des partenaires du site
                    leboncoin susceptibles de m'intéresser
                  </p>
                </div>

                <div className="opt-in">
                  <input
                    type="checkbox"
                    name="CGU"
                    className="checkmark"
                    value={this.state.CGU}
                    onChange={this.handleChange}
                  />
                  <p>"Jaccepte les Conditions Générales de Vente"</p>
                </div>
                {!this.state.messageCGU ? null : (
                  <div className="error-message-CGU">
                    {this.state.messageCGU}
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">
                Créer mon compte personnel
              </button>
            </div>
          </form>

          <div className="why-create-profile">
            <h2>Pourquoi créer un compte ?</h2>
            <div className="item">
              <div className="icons">
                <FontAwesomeIcon
                  icon={faClock}
                  className="icons"
                  size="2x"
                  color="#4e83d1"
                />
              </div>
              <div>
                <h3>Gagnez du temps</h3>
                <p>
                  Publiez vos annonces rapidement, avec vos informations
                  pré-remplies chaque fois que vous souhaitez déposer une
                  nouvelle annonce.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="icons">
                <FontAwesomeIcon
                  icon={faBell}
                  className="icons"
                  size="2x"
                  color="#4e83d1"
                />
              </div>
              <div>
                <h3>Soyez les premiers informés</h3>
                <p>
                  Créez des alertes Immo ou Emploi et ne manquez jamais
                  l'annonce qui vous intéresse.
                </p>
              </div>
            </div>
            <div className="item">
              <div className="icons">
                <FontAwesomeIcon icon={faEye} size="2x" color="#4e83d1" />
              </div>
              <div>
                <h3>Visibilité</h3>
                <p>
                  Visibilité Suivez les statistiques de vos annonces (nombre de
                  fois où votre annonce a été vue, nombre de contacts reçus).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
