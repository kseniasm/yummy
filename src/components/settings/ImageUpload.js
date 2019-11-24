import React, { Component, Fragment } from "react";
import {
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Input
} from "semantic-ui-react";
import CropperInput from "./CropperInput";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  uploadProfileImage,
  deletePhoto
} from "../../store/actions/userActions";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import PhotoPreview from "./PhotoPreview";

class ImageUpload extends Component {
  state = { file: "", imagePreviewUrl: "", image: null, cropping: false };

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  setImage = image => {
    this.setState({ image });
  };

  handleUploadImage = async () => {
    try {
      await this.props.uploadProfileImage(
        this.state.image,
        this.state.file.name
      );
      this.handleCancelCrop();
      toastr.success("Success", "Photo has been uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };

  handleCancelCrop = async () => {
    this.setState({
      file: "",
      image: null,
      imagePreviewUrl: ""
    });
  };

  handleDeletePhoto = async photo => {
    try {
      await this.props.deletePhoto(photo);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  render() {
    const { imagePreviewUrl, file } = this.state;

    return (
      <Segment>
        <Header dividing size="large" content="Profile Photo" />

        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            {!file && (
              <PhotoPreview
                profile={this.props.profile}
                deletePhoto={this.handleDeletePhoto}
              />
            )}

            {file && (
              <Fragment>
                <div
                  className="img-preview"
                  style={{
                    minHeight: "200px",
                    minWidth: "200px",
                    overflow: "hidden"
                  }}
                />
                <Button.Group>
                  <Button
                    loading={this.props.loading}
                    onClick={this.handleUploadImage}
                    style={{ width: "100px" }}
                    positive
                    icon="check"
                  />
                  <Button
                    disabled={this.props.loading}
                    onClick={this.handleCancelCrop}
                    style={{ width: "100px" }}
                    icon="close"
                  />
                </Button.Group>
              </Fragment>
            )}

            {!file && (
              <Fragment>
                <Input
                  style={{ display: "none" }}
                  type="file"
                  id="photo"
                  onChange={e => this.handleImageChange(e)}
                  content="choose"
                />
                <Button
                  icon="upload"
                  size="huge"
                  as="label"
                  htmlFor="photo"
                  color="green"
                  attached="bottom"
                />
              </Fragment>
            )}
          </Grid.Column>

          <Grid.Column width={1} />
          <Grid.Column width={4}>
            {file && (
              <Fragment>
                <CropperInput
                  imagePreview={imagePreviewUrl}
                  setImage={this.setImage}
                />
              </Fragment>
            )}
          </Grid.Column>
        </Grid>

        <Divider />
      </Segment>
    );
  }
}

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid
    }
  ];
};
const actions = {
  uploadProfileImage,
  deletePhoto
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  loading: state.async.loading
});

export default compose(
  connect(mapStateToProps, actions),
  firestoreConnect(auth => query(auth))
)(ImageUpload);
