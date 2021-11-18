import React from 'react';
import { Card, CardGroup, Button, Row, Col, Container } from 'react-bootstrap';
import collectionImg from '../images/cardcollection.jpg';

class CollectionManagement extends React.Component {
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
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <CardGroup>
                                <Card
                                    className="mb-3 p-3"
                                    border="primary"
                                    style={style}>
                                    <Card.Img
                                        style={styleImg}
                                        variant="top" 
                                        src={collectionImg} />
                                    <Card.Body>
                                    <Card.Title>Card Inventory Management</Card.Title>
                                    <Card.Text>
                                        Tired of losing track of where your cards are in your collection? 
                                        Use our inventory system to keep track of which cards you own, in which
                                        binder/container they are in. You can sort owned cards by rarity, set, 
                                        and many other parameters.
                                    </Card.Text>
                                    <Button>Collection Manager</Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>
                        </Col>
                        <Col>
                            <Card>
                                <Card.Header>Features:</Card.Header>
                                <Card.Title>Add/Remove Cards</Card.Title>
                                <Card.Body>
                                    The Collection Manager allows you to add, delete or update information pertaining to Your
                                    collection. You can organize the collection based on many parameters such as rarity, which location
                                    the item is stored in, 
                                </Card.Body>
                                <Card.Title> Find Card's Location</Card.Title>
                                <Card.Body>
                                    Locating a card inside your collection is as simple as looking it up in the database! Collection 
                                    Manager allows instant access to any card in your collection by telling you which box/binder/deck 
                                    the card in question is currently located in. 
                                </Card.Body>
                                <Card.Title>Show your Collection off!</Card.Title>
                                <Card.Body>
                                    The versatility to show off your collection is now at your fingertips, without having to carry around
                                    and potentially damage thousands of cards. Whether you just want to show off your collection, 
                                    are interested in selling/trading, or anything in between, this is the perfect option for you.
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                

            </div>   
        )
    }
}
 
export default CollectionManagement;