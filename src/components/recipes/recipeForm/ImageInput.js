import React from "react";
import { Image, Button, Input } from "semantic-ui-react";

class ImageInput extends React.Component {
  state = { file: "", imagePreviewUrl: this.props.imageURL };

  onChange = e => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
    console.log(file);
    this.props.input.onChange(e.target.files[0]);
  };

  render() {
    const { label, buttonContent } = this.props;
    return (
      <div>
        <label>{label}</label>

        <Image
          src={this.state.imagePreviewUrl}
          fluid
          style={{ marginBottom: "1em" }}
        />

        <Button
          as="label"
          htmlFor="photo"
          content={buttonContent}
          color="orange"
          floated="right"
        />

        <Input
          style={{ display: "none" }}
          type="file"
          id="photo"
          onChange={e => this.onChange(e)}
          content="choose"
          accept=".jpg, .png, .jpeg"
        />
      </div>
    );
  }
}

export default ImageInput;
