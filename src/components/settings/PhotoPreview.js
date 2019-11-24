import React, { Fragment } from "react";
import {Image, Button, Card} from 'semantic-ui-react';


const PhotoPreview = ({profile, deletePhoto}) => {
  return (
    <Fragment>

   
      <Card.Group > 
        <Card>
          <Button
          floated='right'
          size='mini'
          onClick={() => deletePhoto(profile.photo)} 
          icon="trash" color="red" 
        />
          <Image src={  profile.photo? profile.photo.photoURL :'/assets/user.png' } />
        </Card>

      
      </Card.Group>
    </Fragment>
  );
}

export default PhotoPreview;