import React from 'react';
import {Item ,Rating, Segment, Image, Header, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

const RecipeDetailsHeader = ({recipe}) => {
    
  return (

             <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={recipe.dishPhotoURL} fluid />
        
                <Segment basic>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content={recipe.title}
                          style={{ color: 'black' }}
                        />
                       
                            <Rating disabled icon="star" defaultRating={recipe.rating} maxRating={5} style={{marginLeft: "1em"}} />
                        
                        
                        
                        <p>{recipe.description}</p>
                        <p>
                          Recipe by <strong>{recipe.recipeBy}</strong>
                        </p>

                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom">
                
                <Button color="green">Save</Button>
                <Button color="green">Rate</Button>
                <Button color="red" floated="right">Delete</Button>
                <Button as={Link} to={`/recipes/edit/${recipe.id}`} color="green" floated="right"> Edit Recipe
                </Button>
                
                
                  
              </Segment>
            </Segment.Group>

    )
}

export default RecipeDetailsHeader;
