import React, { Component } from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import collectionImg from '../images/cardcollection.jpg';
import lookingImg from '../images/looking.jpg';
import newdeckImg from '../images/newdeck.jpg';

class Main extends Component {
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
            </CardGroup>
               
        )  
    }
}
 
export default Main;