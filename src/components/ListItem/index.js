import React, { Component } from "react";
import Item from "../Item";
/* import "./style.css"; */

class ListItems extends Component {
  handleOnClick = event => {};

  render() {
    let listOffers = [];
    for (let i = 0; i < this.props.items.length; i++) {
      listOffers.push(
        <Item
          key={i}
          onClick={this.handleOnClick}
          id={this.props.items[i]._id}
          title={this.props.items[i].title}
          description={this.props.items[i].description}
          price={this.props.items[i].price}
          pictures={this.props.items[i].pictures}
        />
      );
    }
    return <div className="list-offers">{listOffers}</div>;
  }
}

export default ListItems;
