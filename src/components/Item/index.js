import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class Item extends Component {
  renderImage() {
    if (this.props.pictures[0] === undefined) {
      return <div className="fake-img" />;
    } else {
      return (
        <div>
          <img
            width="190px"
            height="100%"
            src={this.props.pictures[0].secure_url}
            alt="image-annonce"
          />
        </div>
      );
    }
  }
  render() {
    return (
      <Link to={"offer/" + this.props.id} style={{ textDecoration: "none" }}>
        <div className="items">
          {this.renderImage()}
          <div className="info-item">
            <div className="title-item">{this.props.title}</div>
            <div className="price-item">
              {this.props.price} {"€"}
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Item;
