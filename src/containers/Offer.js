import React, { Component, Fragment } from "react";
import axios from "axios";
/* import "./style.css"; */

class Offer extends Component {
  state = {
    offer: [],
    number: "Voir le numéro",
    condition: false
  };

  handleOnClick = event => {
    console.log(
      "this.state.offer.creator.account.phone",
      this.state.offer.creator.account.phone
    );
    this.setState({
      condition: !this.state.condition,
      number: this.state.offer.creator.account.phone
    });
    event.preventDefault();
  };

  render() {
    if (this.state.offer.creator === undefined) {
      return null;
    } else {
      return (
        <div className="body-offer">
          <div className="container">
            <div className="item-profile">
              <div className="bg-white">
                <div className="pictures-item">
                  <img
                    width="100%"
                    src={this.state.offer.pictures[0].secure_url}
                    alt="image-annonce"
                  />
                </div>
                <div className="title-price">
                  <h2>{this.state.offer.title}</h2>
                  <div className="price-item">
                    {this.state.offer.price}
                    {"€"}
                  </div>
                </div>
              </div>
              <div className="profile">
                <div className="avatar-username">
                  {" "}
                  <div className="avatar">
                    <i className="fas fa-user-circle fa-3x" />
                  </div>
                  <div className="username">
                    {this.state.offer.creator.account.username}
                  </div>
                </div>

                <button
                  onClick={this.handleOnClick}
                  className={this.state.condition ? "btn-actived" : "btn-num"}
                >
                  <i className="fas fa-phone" />
                  <div className="see-the-num">{this.state.number}</div>
                </button>
              </div>
            </div>

            <div className="category-description-item">
              <div className="category">Description</div>
              <div className="description-item">
                {this.state.offer.description}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://leboncoin-api.herokuapp.com/api/offer/" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({ offer: response.data });
        console.log("response.data : ", response.data);
      });
  }
}

export default Offer;
