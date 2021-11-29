import React from 'react';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import SearchResults from '../components/_searchResults';
import mainDeck from '../components/_mainDeck';
import sideDeck from '../components/_sideDeck';
import extraDeck from '../components/_extraDeck';
import Focus from '../components/_focus';
import DeckList from '../components/deckList';

class _DeckCheck extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            decksChanged: false,
            saveDeckName: null,
            loadedDeckID: null,
            HoveredCard: null,
            mainDeck: [],
            sideDeck: [],
            extraDeck: [],
        }
    }  
    createDeck = () =>{
        const Deck = {
            mainDeck: this.state.mainDeck,
            sideDeck: this.state.sideDeck,
            extraDeck: this.state.extraDeck,
        }
        return Deck
    }
    setDeck = (Deck) =>{
        if(Deck){
            this.setState({
                mainDeck: Deck.mainDeck,
                sideDeck: Deck.sideDeck,
                extraDeck: Deck.extraDeck,
            })
            
        }
    }

    //Loads the deck from a text file
    loadDeckFile = async (e) => {
        let file = e.target.files[0];
        let text = await file.text();
        let Deck = JSON.parse(text);
        this.setState({
            HoveredCard: null,
            mainDeck: Deck.mainDeck,
            sideDeck: Deck.sideDeck,
            extraDeck: Deck.extraDeck,
        })
    }

    //Saves the deck as a text file on the users computer so they can keep/reload it later.
    saveDeckFile = () => {
        const deck = {
            HoveredCard: null,
            mainDeck: this.mainDeck,
            sideDeck: this.sideDeck,
            extraDeck: this.extraDeck,
        }
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(deck, null, 2)], {
            type: "text/json"
        }));
        a.setAttribute("download", "My Deck.json");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }

    //Clears the main/side/extra deck of all cards
    clearDeck = () => {
        this.setState({
            HoveredCard: null,
            mainDeck: [],
            sideDeck: [],
            extraDeck: [],
        })
    }
    //Removes a card from a certain index in the specified deck (side, extra, main) 
    removeDeck = (index, deck) => {
       
        if(deck==="Main"){
            let mainDeck = this.state.mainDeck;
            if(index<mainDeck.length){
                let leftHand = mainDeck.slice(0,index) ? mainDeck.slice(0,index) : []
                let rightHand = mainDeck.slice(index+1, mainDeck.length) ? mainDeck.slice(index+1, mainDeck.length) : []
                mainDeck=[...leftHand, ...rightHand]
                this.setState({
                    mainDeck: mainDeck
                })
            }
        }
        if(deck==="Side"){
            let sideDeck = this.state.sideDeck;
            if(index<sideDeck.length){
                let leftHand = sideDeck.slice(0,index) ? sideDeck.slice(0,index) : []
                let rightHand = sideDeck.slice(index+1, sideDeck.length) ? sideDeck.slice(index+1, sideDeck.length) : []
                sideDeck=[...leftHand, ...rightHand]
                this.setState({
                    sideDeck: sideDeck
                })
            }
        }
        if(deck==="Extra"){
            let extraDeck = this.state.extraDeck;
            if(index<extraDeck.length){
                let leftHand = extraDeck.slice(0,index) ? extraDeck.slice(0,index) : []
                let rightHand = extraDeck.slice(index+1, extraDeck.length) ? extraDeck.slice(index+1, extraDeck.length) : []
                extraDeck=[...leftHand, ...rightHand]
                this.setState({
                    extraDeck: extraDeck
                })
            }
        }
        
    }
    //Counters how many times card  is in the specified deck
    checkmainDeck(card) {
        return this.state.mainDeck.filter(x => x===card).length;
    }
    checksideDeck(card) {
        return this.state.sideDeck.filter(x => x===card).length;
    }
    checkextraDeck(card) {
        return this.state.extraDeck.filter(x => x===card).length;
    }

    //Checks how many times a card is in a combination of the main, side and extra deck, and 
    //compares that to the amount that can be in your deck based on the ban list. Once this is done,
    //it gets added if the amount is lower.
    addMainDeck = (card) => {
        let count = this.checkmainDeck(card) + this.checksideDeck(card);
        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    mainDeck:  [...this.state.mainDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        mainDeck:  [...this.state.mainDeck, card]
                    })
                }
            }
        }
        if(card.banlist_info){
            if(card.banlist_info.ban_tcg){
                if(card.banlist_info.ban_tcg === "Banned")
                {
                    console.log("Banned")
                }
                if(card.banlist_info.ban_tcg === "Limited")
                {
                    if(count<1){
                        this.setState({
                            mainDeck:  [...this.state.mainDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            mainDeck:  [...this.state.mainDeck, card]
                        })
                    }
                }
            }
        }
    }
    addSideDeck = (card) => {
        let count = this.checkmainDeck(card) + this.checksideDeck(card) + this.checkextraDeck(card);

        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    sideDeck:  [...this.state.sideDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        sideDeck:  [...this.state.sideDeck, card]
                    })
                }
            }
        }
        if(card.banlist_info){
            if(card.banlist_info.ban_tcg){
                if(card.banlist_info.ban_tcg === "Banned")
                {
                    console.log("Banned")
                }
                if(card.banlist_info.ban_tcg === "Limited")
                {
                    if(count<1){
                        this.setState({
                            sideDeck:  [...this.state.sideDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            sideDeck:  [...this.state.sideDeck, card]
                        })
                    }
                }
            }
        }
    }
    addExtraDeck = (card) => {
        let count = this.checkextraDeck(card) + this.checksideDeck(card);

        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    extraDeck:  [...this.state.extraDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        extraDeck:  [...this.state.extraDeck, card]
                    })
                }
            }
        }
        if(card.banlist_info){
            if(card.banlist_info.ban_tcg){
                if(card.banlist_info.ban_tcg === "Banned")
                {
                    console.log("Banned")
                }
                if(card.banlist_info.ban_tcg === "Limited")
                {
                    if(count<1){
                        this.setState({
                            extraDeck:  [...this.state.extraDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            extraDeck:  [...this.state.extraDeck, card]
                        })
                    }
                }
            }
        }
    }

    //Shows the card being hovered over as the focus on the left hand side.
    setFocus = (card) => {
        this.setState({
            HoveredCard: card,
        })
    }
    //Handles which values of the forms can be interacted with.
    handleTypeChange(value) { 
        this.setState({
        cardType: value
        })
     }
    
    render() { 
        const styleButton={
            margin: 2,
            padding: 2,
        }

        const mainDeckCount = this.state.mainDeck.length ? this.state.mainDeck.length : 0 
        const mainDeckMonsterCount = this.state.mainDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length ? this.state.mainDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length : 0 
        const mainDeckSpellCount = this.state.mainDeck.filter(card => card.type==="Spell Card").length ? this.state.mainDeck.filter(card => card.type==="Spell Card").length : 0
        const mainDeckTrapCount = this.state.mainDeck.filter(card => card.type==="Trap Card").length ? this.state.mainDeck.filter(card => card.type==="Trap Card").length : 0
        const sideDeckCount = this.state.sideDeck.length ? this.state.sideDeck.length : 0
        const sideDeckMonsterCount = this.state.sideDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length ? this.state.sideDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length : 0
        const sideDeckSpellCount = this.state.sideDeck.filter(card => card.type==="Spell Card").length ? this.state.sideDeck.filter(card => card.type==="Spell Card").length : 0
        const sideDeckTrapCount = this.state.sideDeck.filter(card => card.type==="Trap Card").length ? this.state.sideDeck.filter(card => card.type==="Trap Card").length : 0



        return (
        <div>
            <Card>
                <Row>
                    <Col>
                        <Focus 
                            HoveredCard={this.state.HoveredCard}
                        />
                        <Row>
                            <Col>
                                <Form.Group controlId="formFileSm" className="mb-3">
                                    <Form.Label>Import Deck</Form.Label>
                                    <Form.Control 
                                        type="file" 
                                        size="sm" 
                                        onChange={(e) => this.loadDeckFile(e)} 
                                        name='files[]'
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    onClick ={this.saveDeckFile}
                                    >Export Deck
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    >Use All Cards
                                </Button>
                            </Col>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    >Use Collection
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    onClick = {this.clearDeck}
                                    >Clear Deck
                                </Button>
                               
                            </Col>
                            <Col>
                                
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DeckList
                                    loadedDeckID={this.state.loadedDeckID}
                                    decksChanged={this.state.decksChanged}
                                    setDeck={this.setDeck}
                                    createDeck = {this.createDeck}
                                />
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={6}>
                        <Card>
                            <Card.Header>Deck Size: ({mainDeckCount}) Monster: ({mainDeckMonsterCount}) Spells: ({mainDeckSpellCount}) Trap: ({mainDeckTrapCount}) </Card.Header>
                            <mainDeck 
                                mainDeck={this.state.mainDeck}
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                        <Card>
                            <Card.Header>Side Deck Size: ({sideDeckCount}) Monster: ({sideDeckMonsterCount}) Spells: ({sideDeckSpellCount}) Trap: ({sideDeckTrapCount})</Card.Header>
                            <sideDeck
                                sideDeck={this.state.sideDeck} 
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                        <Card>
                            <Card.Header>Extra Deck</Card.Header>
                            <extraDeck
                                extraDeck={this.state.extraDeck}
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                    </Col>

                    <Col >
                        <SearchResults 
                            setFocus={this.setFocus}
                            addMainDeck={this.addMainDeck}
                            addExtraDeck={this.addExtraDeck}
                            addSideDeck={this.addSideDeck}
                            checksideDeck={this.checksideDeck}
                            checkmainDeck={this.checkmainDeck}
                            checkextraDeck={this.checkextraDeck}
                        />
                    </Col>
                </Row>
                
            </Card>
        </div>
        )
    }
}
 
export default _DeckCheck;