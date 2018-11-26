import React, { Component } from "react";
import axios from "axios";
import ReactFileReader from "react-file-reader";

class Publish extends Component {
  state = {
    title: "",
    description: "",
    price: "",
    messageTitle: null,
    messageDescription: null,
    messagePrice: null,
    errorInput: false,
    files: []
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [name]: value });
  };

  handleFiles = files => {
    console.log("files:", files);
    const newFiles = [...this.state.files, ...files.base64];
    this.setState({
      files: newFiles
    });
  };

  onSubmit = event => {
    const { title, description, price } = this.state;
    event.preventDefault();

    if (title === "") {
      this.setState({
        messageTitle: "Veuillez entrer le titre de votre annonce",
        errorInput: true
      });
    }
    if (description === "") {
      this.setState({
        messageDescription: "Veuillez entrer la description de votre annonce",
        errorInput: true
      });
    }

    if (price === "") {
      this.setState({
        messagePrice: "Veuillez entrer le prix de votre annonce",
        errorInput: true
      });
    } else {
      axios
        .post(
          "https://leboncoin-api.herokuapp.com/api/offer/publish",
          {
            title: title,
            description: description,
            files: this.state.files,
            price: Number(price)
          },
          { headers: { authorization: "Bearer " + this.props.user.token } }
        )
        .then(response => {
          alert("Merci, votre annonce a bien été publié !");
          console.log("response.data:", response.data);
          this.props.history.push(`/offer/${response.data._id}`);
        });
    }
  };

  renderImages() {
    const MAX_PHOTOS_NUMBER = 6;
    const filesArray = [];
    for (let i = 0; i < MAX_PHOTOS_NUMBER; i++) {
      if (this.state.files[i]) {
        filesArray.push(
          <div className="imageUploaded">
            <div className="icon-cross">
              <i class="fas fa-times-circle" />
            </div>
            <div className="image">
              <img
                key={i}
                width="170px"
                onClick={() => {
                  const newFiles = [...this.state.files];
                  newFiles.splice(i, 1);
                  this.setState({ files: newFiles });
                }}
                src={this.state.files[i]}
                alt="Annonce"
              />
            </div>
          </div>
        );
      } else {
        filesArray.push(
          <ReactFileReader
            name="files"
            fileTypes={[".png", ".jpg"]}
            base64={true}
            multipleFiles={true}
            handleFiles={this.handleFiles}
          >
            <div className="addImage">
              <div className="addImageLabel">PHOTO {i + 1}</div>
              <div className="addImageIcon">
                <i class="fas fa-camera fa-3x" />
              </div>
            </div>
          </ReactFileReader>
        );
      }
    }
    return filesArray;
  }

  render() {
    return (
      <div className="body-publish">
        <div className="container-publish">
          <div className="your-offer">Votre annonce</div>
          <form className="form-offer" onSubmit={this.onSubmit}>
            <label htmlFor="title">Titre de l'annonce</label>
            <input
              id="title"
              name="title"
              type="text"
              value={this.state.title}
              className={this.state.errorInput === true ? "input-red" : ""}
              onChange={this.handleChange}
            />
            <div className="error-message">{this.state.messageTitle}</div>
            <label htmlFor="description">Texte de l'annonce</label>
            <textarea
              id="description"
              name="description"
              type="text"
              value={this.state.description}
              className={this.state.errorInput === true ? "input-red" : ""}
              onChange={this.handleChange}
            />
            <div className="error-message">{this.state.messageDescription}</div>
            <label htmlFor="price">Prix</label>
            <input
              name="price"
              id="price-publish"
              type="number"
              value={this.state.price}
              className={this.state.errorInput === true ? "input-red" : ""}
              onChange={this.handleChange}
            />
            <div className="error-message">{this.state.messagePrice}</div>
            <label htmlFor="files">Photos :</label>
            <span className="hint">
              Une annonce avec photo est 7 fois plus consultée qu'une annonce
              sans photo
            </span>
            <div className="addImageSection"> {this.renderImages()}</div>

            <button type="submit" className="submit-btn">
              Valider
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Publish;
