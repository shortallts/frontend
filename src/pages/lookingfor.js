import React from 'react';
import { Card, Container, Row, Col} from 'react-bootstrap';
import lookingImg from '../images/looking.jpg';
import { Button } from 'react-bootstrap';
class LookingFor extends React.Component {
    render() {
        const styleImg={
            minHeight: 300,
            minWidth: 300,
        }
        const style={
            maxHeight: 800,
            maxWidth: 400,
            margin: 2,
            padding: 2,
        }
        return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Card
                            className="mb-3 p-3"
                            border="primary"
                            style={style}>
                            <Card.Img
                                style={styleImg}
                                variant="top" 
                                src={lookingImg} />
                            <Card.Body>
                            <Card.Title>Card Wishlist</Card.Title>
                            <Card.Text>
                                Sick of trying searching for the best deals on multiple different
                                sites and with multiple different people and can't keep track of what you need
                                and what you already bought?Don't feel like specifying max rarity, min rarity, cheapest, etc?
                                Keep track of what cards you are looking for in our database so you can 
                                just share a link with your wishlist on it!
                            </Card.Text>
                            <Button>Card Wishlist</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col>
                        <Row>
                            <Col>
                                <Card style={style}>
                                    <Card.Header>Features:</Card.Header>
                                    <Card.Title>Publicly Share The Wish List</Card.Title>
                                    <Card.Body>
                                        Tired of forgetting which cards you are looking for, which ones you have already picked up,
                                        or how many of each card you still need? With our wish list the ability to check and show others
                                        your wish list became easier. All you have to do is send them a unique URL and it will show them 
                                        everything on your list.
                                    </Card.Body>
                                    <Card.Title>Add/Remove Cards from your Wishlist</Card.Title>
                                    <Card.Body>
                                        Maintaining your wishlist has never been easier. All that is required is to type in the name of the card,
                                        desired rarity/condition/quanitity wanted, and click add. Once you purchase a card or decide 
                                        the card is no longer desired, you can get rid of it by simply clicking remove. Its as easy as that
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                        </Row>
                        
                    </Col>
                </Row>

            </Container>   
        </div>
        )
    }
}
 
export default LookingFor;