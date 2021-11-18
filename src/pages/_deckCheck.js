import React from 'react';
import {Form, Button, Row, Col, Card} from 'react-bootstrap';
import _SearchResults from '../components/_searchResults';
import _MainDeck from '../components/_mainDeck';
import _SideDeck from '../components/_sideDeck';
import _ExtraDeck from '../components/_extraDeck';
import _Focus from '../components/_focus';
import axios from 'axios';
import DeckList from '../components/deckList';

class _DeckCheck extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            loadedDeckID: null,
            HoveredCard: null,
            MainDeck: [],
            SideDeck: [],
            ExtraDeck: [],
        }
    }  

    setLoaded = (id) =>{
        if(id!==this.props.loadedDeckID){
            this.setState((prevState) =>({
                loadedDeckID: id
            }))
        }
    }
    saveDeckServer = () =>{
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/decks',
            data:{
                name: "New Deck",
                MainDeck: this.state.MainDeck,
                SideDeck: this.state.SideDeck,
                ExtraDeck: this.state.ExtraDeck
            }
        })
    }
    loadDeckServer = () => {
        const _id = this.state.loadedDeckID;
        axios({
            method: 'get',
            url: 'http://localhost:5000/api/decks/'+_id,
            responseType: 'json'                
        })
            .then((response) =>{
                const Deck = response.data;
                console.log(Deck)
                this.setState({
                    MainDeck: Deck.mainDeck,
                    SideDeck: Deck.sideDeck,
                    ExtraDeck: Deck.extraDeck
                })
            })
            .catch(() =>{
                alert('REEEEEEEEEEEEEEEEEEEE')
            })
        }

    //Loads the deck from a text file
    loadDeckFile = async (e) => {
        let file = e.target.files[0];
        let text = await file.text();
        let Deck = JSON.parse(text);
        this.setState({
            HoveredCard: null,
            MainDeck: Deck.MainDeck,
            SideDeck: Deck.SideDeck,
            ExtraDeck: Deck.ExtraDeck,
        })
    }

    //Saves the deck as a text file on the users computer so they can keep/reload it later.
    saveDeckFile = () => {
        const deck = {
            HoveredCard: null,
            MainDeck: this.state.MainDeck,
            SideDeck: this.state.SideDeck,
            ExtraDeck: this.state.ExtraDeck,
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
            MainDeck: [],
            SideDeck: [],
            ExtraDeck: [],
        })
    }
    //Removes a card from a certain index in the specified deck (side, extra, main) 
    removeDeck = (index, deck) => {
       
        if(deck==="Main"){
            let MainDeck = this.state.MainDeck;
            if(index<MainDeck.length){
                let leftHand = MainDeck.slice(0,index) ? MainDeck.slice(0,index) : []
                let rightHand = MainDeck.slice(index+1, MainDeck.length) ? MainDeck.slice(index+1, MainDeck.length) : []
                MainDeck=[...leftHand, ...rightHand]
                this.setState({
                    MainDeck: MainDeck
                })
            }
        }
        if(deck==="Side"){
            let SideDeck = this.state.SideDeck;
            if(index<SideDeck.length){
                let leftHand = SideDeck.slice(0,index) ? SideDeck.slice(0,index) : []
                let rightHand = SideDeck.slice(index+1, SideDeck.length) ? SideDeck.slice(index+1, SideDeck.length) : []
                SideDeck=[...leftHand, ...rightHand]
                this.setState({
                    SideDeck: SideDeck
                })
            }
        }
        if(deck==="Extra"){
            let ExtraDeck = this.state.ExtraDeck;
            if(index<ExtraDeck.length){
                let leftHand = ExtraDeck.slice(0,index) ? ExtraDeck.slice(0,index) : []
                let rightHand = ExtraDeck.slice(index+1, ExtraDeck.length) ? ExtraDeck.slice(index+1, ExtraDeck.length) : []
                ExtraDeck=[...leftHand, ...rightHand]
                this.setState({
                    ExtraDeck: ExtraDeck
                })
            }
        }
        
    }
    //Counters how many times card  is in the specified deck
    checkMainDeck(card) {
        return this.state.MainDeck.filter(x => x===card).length;
    }
    checkSideDeck(card) {
        return this.state.SideDeck.filter(x => x===card).length;
    }
    checkExtraDeck(card) {
        return this.state.ExtraDeck.filter(x => x===card).length;
    }

    //Checks how many times a card is in a combination of the main, side and extra deck, and 
    //compares that to the amount that can be in your deck based on the ban list. Once this is done,
    //it gets added if the amount is lower.
    addMainDeck = (card) => {
        let count = this.checkMainDeck(card) + this.checkSideDeck(card);
        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    MainDeck:  [...this.state.MainDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        MainDeck:  [...this.state.MainDeck, card]
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
                            MainDeck:  [...this.state.MainDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            MainDeck:  [...this.state.MainDeck, card]
                        })
                    }
                }
            }
        }
    }
    addSideDeck = (card) => {
        let count = this.checkMainDeck(card) + this.checkSideDeck(card) + this.checkExtraDeck(card);

        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    SideDeck:  [...this.state.SideDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        SideDeck:  [...this.state.SideDeck, card]
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
                            SideDeck:  [...this.state.SideDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            SideDeck:  [...this.state.SideDeck, card]
                        })
                    }
                }
            }
        }
    }
    addExtraDeck = (card) => {
        let count = this.checkExtraDeck(card) + this.checkSideDeck(card);

        if(!card.banlist_info){
            if(count<3){
                this.setState({
                    ExtraDeck:  [...this.state.ExtraDeck, card]
                })
            }   
        }
        if(card.banlist_info){
            if(!card.banlist_info.ban_tcg){
                if(count<3){
                    this.setState({
                        ExtraDeck:  [...this.state.ExtraDeck, card]
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
                            ExtraDeck:  [...this.state.ExtraDeck, card]
                        })
                    }
                }
                if(card.banlist_info.ban_tcg === "Semi-Limited")
                {
                    if(count<2){
                        this.setState({
                            ExtraDeck:  [...this.state.ExtraDeck, card]
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

        const MainDeckCount = this.state.MainDeck.length ? this.state.MainDeck.length : 0 
        const MainDeckMonsterCount = this.state.MainDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length ? this.state.MainDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length : 0 
        const MainDeckSpellCount = this.state.MainDeck.filter(card => card.type==="Spell Card").length ? this.state.MainDeck.filter(card => card.type==="Spell Card").length : 0
        const MainDeckTrapCount = this.state.MainDeck.filter(card => card.type==="Trap Card").length ? this.state.MainDeck.filter(card => card.type==="Trap Card").length : 0
        const SideDeckCount = this.state.SideDeck.length ? this.state.SideDeck.length : 0
        const SideDeckMonsterCount = this.state.SideDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length ? this.state.SideDeck.filter(card => card.type!=="Spell Card" && card.type!=="Trap Card").length : 0
        const SideDeckSpellCount = this.state.SideDeck.filter(card => card.type==="Spell Card").length ? this.state.SideDeck.filter(card => card.type==="Spell Card").length : 0
        const SideDeckTrapCount = this.state.SideDeck.filter(card => card.type==="Trap Card").length ? this.state.SideDeck.filter(card => card.type==="Trap Card").length : 0



        return (
        <div>
            <Card>
                <Row>
                    <Col>
                        <_Focus 
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
                                    onClick = {this.clearDeck}
                                    >Clear Deck
                                </Button>
                            </Col>
                            <Col>
                                <DeckList 
                                    setLoaded= {this.setLoaded}
                                    loadedDeckID={this.state.LoadID}
                                />
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
                                    >Only Use Collection
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    onClick= {this.loadDeckServer}
                                    >Load Deck
                                </Button>
                            </Col>
                            <Col>
                                <Button 
                                    style={styleButton} 
                                    variant ="outline-primary"
                                    onClick = {this.saveDeckServer}
                                    >Save Deck
                                </Button>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={6}>
                        <Card>
                            <Card.Header>Deck Size: ({MainDeckCount}) Monster: ({MainDeckMonsterCount}) Spells: ({MainDeckSpellCount}) Trap: ({MainDeckTrapCount}) </Card.Header>
                            <_MainDeck 
                                MainDeck={this.state.MainDeck}
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                        <Card>
                            <Card.Header>Side Deck Size: ({SideDeckCount}) Monster: ({SideDeckMonsterCount}) Spells: ({SideDeckSpellCount}) Trap: ({SideDeckTrapCount})</Card.Header>
                            <_SideDeck
                                SideDeck={this.state.SideDeck} 
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                        <Card>
                            <Card.Header>Extra Deck</Card.Header>
                            <_ExtraDeck
                                ExtraDeck={this.state.ExtraDeck}
                                setFocus={this.setFocus}
                                removeDeck={this.removeDeck}
                            />
                        </Card>
                    </Col>

                    <Col >
                        <_SearchResults 
                            setFocus={this.setFocus}
                            addMainDeck={this.addMainDeck}
                            addExtraDeck={this.addExtraDeck}
                            addSideDeck={this.addSideDeck}
                            checkSideDeck={this.checkSideDeck}
                            checkMainDeck={this.checkMainDeck}
                            checkExtraDeck={this.checkExtraDeck}
                        />
                    </Col>
                </Row>
                
            </Card>
        </div>
        )
    }
}
 
export default _DeckCheck;