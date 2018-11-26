import React, { Component } from "react";
import "./style.css";
import axios from "axios";

class Filter extends Component {
  //event.target quand un événement de changement se fait. Event.target va renvoyer les données
  handleChange = event => {
    const { name, value } = event.target;

    this.props.updateSearchParams({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { title, priceMin, priceMax, sort } = this.props.searchParams;
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer", {
        params: {
          title: title,
          priceMin: priceMin,
          priceMax: priceMax,
          sort: sort,
          skip: 0
        }
      })
      .then(response => {
        console.log(response.data);
        this.props.updateOffersList(response.data);
      });
  };

  render() {
    return (
      <div className="offers-filter-background">
        <div className="offers-filter-container">
          <form className="offers-filter-form" onSubmit={this.handleSubmit}>
            <div className="title-priceMin-priceMax">
              <input
                id="title-search"
                name="title"
                type="text"
                placeholder="Que recherchez-vous?"
                onChange={this.handleChange}
                value={this.props.searchParams.title}
              />
              <div className="priceMin-priceMax">
                <label htmlFor="priceMin">Prix entre</label>
                <input
                  id="priceMin"
                  name="priceMin"
                  type="number"
                  placeholder="Prix min"
                  onChange={this.handleChange}
                  value={this.props.searchParams.priceMin}
                />
                <label htmlFor="priceMax">et</label>
                <input
                  id="priceMax"
                  name="priceMax"
                  type="number"
                  placeholder="Prix max"
                  onChange={this.handleChange}
                  value={this.props.searchParams.priceMax}
                />
              </div>
            </div>
            <div className="sort-btn-submit">
              <select
                id="sort"
                name="sort"
                value={this.props.searchParams.sort}
                onChange={this.handleChange}
              >
                <option value="price-desc"> Tri : Prix decroissant</option>
                <option value="price-asc"> Tri : Prix croissant</option>
                <option value="date-asc"> Tri : Plus anciennes</option>
                <option value="date-desc"> Tri : Plus récentes</option>
              </select>
              <button className="btn-submit-filter" type="submit">
                Rechercher
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Filter;
