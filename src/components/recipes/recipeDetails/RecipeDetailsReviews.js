import React, {Fragment} from 'react';
import {Segment, Comment, Header, Form, Button, Rating} from 'semantic-ui-react';

const RecipeDetailsReviews = () => {
    return (
               <Fragment>
                 <Segment
                   textAlign="center"
                   attached="top"
                   inverted
                   color="orange"
                   style={{ border: 'none' }}
                 >
                   <Header>Reviews</Header>
                 </Segment>
           
                 <Segment attached>
                   <Comment.Group>
                     <Comment>
                       <Comment.Avatar src="/assets/user.png" />
                       <Comment.Content>
                         <Comment.Author as="a">Matt</Comment.Author>
                         <Comment.Metadata>
                            <Rating disabled icon="star" defaultRating={3} maxRating={5} />
                           <div>Today at 5:42PM</div>
                           
                         </Comment.Metadata>
                         <Comment.Text>How artistic!</Comment.Text>
                         <Comment.Actions>
                           <Comment.Action>Reply</Comment.Action>
                         </Comment.Actions>
                       </Comment.Content>
                     </Comment>
           
                     <Comment>
                       <Comment.Avatar src="/assets/user.png" />
                       <Comment.Content>
                         <Comment.Author as="a">Elliot Fu</Comment.Author>
                         <Comment.Metadata>
                         <Rating disabled icon="star" defaultRating={3} maxRating={5} />
                           <div>Yesterday at 12:30AM</div>
                         </Comment.Metadata>
                         <Comment.Text>
                           <p>
                             This has been very useful for my research. Thanks as well!
                           </p>
                         </Comment.Text>
                         <Comment.Actions>
                           <Comment.Action>Reply</Comment.Action>
                         </Comment.Actions>
                       </Comment.Content>
                       
                     </Comment>
           
                     <Comment>
                       <Comment.Avatar src="/assets/user.png" />
                       <Comment.Content>
                         <Comment.Author as="a">Joe Henderson</Comment.Author>
                         
                         <Comment.Metadata>
                         <Rating disabled icon="star" defaultRating={3} maxRating={5} />
                           <div>5 days ago</div>
                         </Comment.Metadata>
                         <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                         <Comment.Actions>
                           <Comment.Action>Reply</Comment.Action>
                         </Comment.Actions>
                       </Comment.Content>
                     </Comment>
           
                     <Form reply>
                     <Rating icon="star" defaultRating={3} maxRating={5} />
                       <Form.TextArea />
                       <Button
                         content="Add Review"
                         labelPosition="left"
                         icon="edit"
                         color="green"
                       />
                     </Form>
                   </Comment.Group>
                 </Segment>
               </Fragment>
    )
}

export default RecipeDetailsReviews;
