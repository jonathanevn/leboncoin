import React, { Component } from "react";
import axios from "axios";
import ListItems from "../components/ListItem";
import Filter from "../components/Filter";
import Pagination from "../components/Pagination";
import "./Home.css";

class Home extends Component {
  state = {
    offers: [],
    offersCount: 0,
    params: {
      title: "",
      priceMin: "",
      priceMax: "",
      sort: "price-desc",
      skip: 0,
      limit: 25
    }
  };

  //callbackFunction : 2eme arg pour envoyer une fonction qui sera déclenché quand les fonctions sont mises à jour.
  // déclenché quand updateSearchParams est déclenché.
  updateSearchParams = (newParams, callbackFunction) => {
    this.setState(
      {
        params: {
          ...this.state.params,
          ...newParams
        }
      },
      callbackFunction
    );
  };

  updateOffersList = offers => {
    this.setState({ offers: offers });
  };

  render() {
    return (
      <div>
        <Filter
          updateOffersList={this.updateOffersList}
          searchParams={this.state.params}
          updateSearchParams={this.updateSearchParams}
        />
        <div className="container-home">
          <div className="body-home">
            <ListItems items={this.state.offers} user={this.props.user} />
            <Pagination
              updateOffersList={this.updateOffersList}
              searchParams={this.state.params}
              updateSearchParams={this.updateSearchParams}
            />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer/with-count", {
        params: { skip: this.state.params.skip, limit: this.state.params.limit }
      })
      .then(response => {
        console.log("response.data.offers", response.data.offers);
        this.setState({
          offers: response.data.offers,
          offersCount: response.data.count
        });
      });
  }
}

export default Home;
