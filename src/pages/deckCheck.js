
import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import newdeckImg from '../images/newdeck.jpg';

class DeckCheck extends React.Component {
    state={
        cardType='',
    }
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
                <Row>
                    <Col>
                        <Card
                            className="mb-3 p-3"
                            border="primary"
                            style={style}>
                            <Card.Img
                                style={styleImg}
                                variant="top" 
                                src={newdeckImg} />
                            <Card.Body>
                            <Card.Title>New Deck Check</Card.Title>
                            <Card.Text>
                                You see a new deck online that you really want to try, but are unsure of how much 
                                of the deck you already own? This feature will take in all of the cards for the main deck,
                                side deck, and extra deck and compare them to what is listed in our database. It will tell you 
                                in which boxes have each card you own, and which ones you need to purchase. There is even a one button option
                                to add the remaining cards to your wishlist to find the cards from your friends!
                            </Card.Text>
                            <Button>New Deck Check</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header>Features</Card.Header>
                            <Card.Title>Create New Decks:</Card.Title>
                            <Card.Body>
                                Use The deck creator to create decks, using any card or only cards in your collection. Browse
                                through cards in your collection to get inspiration or copy a deck you found online.
                            </Card.Body>
                            <Card.Title>Generate lists of Missing Cards:</Card.Title>
                            <Card.Body>
                                Deck check will return a list which cards which aren't owned. This allows greater flexibility in deck building, 
                                by either removing cards not owned from the deck or automatically adding the cards missing to your wish list.
                            </Card.Body>
                            <Card.Title>Add Missing Cards to Wishlist</Card.Title>
                            <Card.Body>
                                Deck check will allow you to add some/all of the missing cards with the simple click of a button. 
                            </Card.Body>
                            <Card.Title>Locate Your Owned Cards:</Card.Title>
                            <Card.Body>
                                Deck check returns a list of all of the cards you already own, and the location of the card. 
                                No more spending hours looking when you can go straight to the correct box/binder.
                            </Card.Body>
                            <Card.Title>Save and Load Decks</Card.Title>
                            <Card.Body>
                                If you like a deck but don't want to commit to adding the cards to your wish list, 
                                just save the list! There are options to download/upload the deck or use our server.
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </div>
        )
    }
}
 
export default DeckCheck;