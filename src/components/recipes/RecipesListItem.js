import React, { Component } from "react";
import { Rating, Card, Image} from "semantic-ui-react";
import { Link } from "react-router-dom";

class RecipesListItem extends Component {
  render() {
    const { recipe } = this.props;
    
    return (
      <Card as={Link} to={`/recipes/${recipe.id}`}>
      {/* // <Card> */}
        <Image src={recipe.dishPhotoURL} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{recipe.title}</Card.Header>
          <Rating disabled icon="star" defaultRating={recipe.rating} maxRating={5} />
          <Card.Description>{recipe.description}</Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Image  size="mini" circular src={recipe.hostPhotoURL} />
          <span style={{ marginLeft: "1em" }}>Recipe by {recipe.recipeBy}</span>
        </Card.Content>
        {/* <Button onClick={() => selectRecipe(recipe)} content="View"></Button>
        <Button onClick={() => deleteRecipe(recipe.id)} content="Delete" color="red"></Button> */}
      </Card>

    );
  }
}

export default RecipesListItem;
