import React, { Component, Fragment } from "react";
import axios from "axios";
import "./style.css";

class Pagination extends Component {
  updatePage = () => {
    axios
      .get("https://leboncoin-api.herokuapp.com/api/offer", {
        params: this.props.searchParams
      })
      .then(response => {
        this.props.updateOffersList(response.data);
      });
  };

  renderPreviousPage = () => {
    if (this.props.searchParams.skip <= 0) {
      return;
    }

    const newSkipValue =
      this.props.searchParams.skip - this.props.searchParams.limit; // page 1: skip 0 éléments, page 2: skip 25 éléments

    this.props.updateSearchParams(
      {
        skip: newSkipValue
      },
      this.updatePage
    );
  };

  renderNextPage = () => {
    const newSkipValue =
      this.props.searchParams.skip + this.props.searchParams.limit; // page 1: skip 0 éléments, page 2: skip 25 éléments

    this.props.updateSearchParams(
      {
        skip: newSkipValue
      },
      this.updatePage
    );
  };

  render() {
    return (
      <div className="pagination">
        <div className="btn-pagination" onClick={this.renderPreviousPage}>
          <i class="fas fa-chevron-left" /> Precédent
        </div>
        <div className="btn-pagination" onClick={this.renderNextPage}>
          Suivant <i class="fas fa-chevron-right" />
        </div>
      </div>
    );
  }
}

export default Pagination;
