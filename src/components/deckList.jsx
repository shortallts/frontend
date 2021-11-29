import React from "react";
import axios from 'axios';
import { ButtonGroup, Button, InputGroup, FormControl, Row} from "react-bootstrap";
import config from "../default.json"

class DeckList extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            loadedDeckID: null,
            saveDeckName: null,
            decks: null,
            selectedDeck: null,
            DeckServer: config.server,
        }
    }
    refreshDecks = async () =>{
        const res = await axios.get(this.state.DeckServer+'api/decks/');
        const data = res.data;
        this.setState({
            decks: res.data
        });
    }
    setLoaded = (id) =>{
        if(id!==this.props.loadedDeckID){
            this.setState((prevState) =>({
                loadedDeckID: id
            }))
        }
    }
    deleteDeckServer = async() =>{
        const _id = this.state.loadedDeckID;
        const res = await axios.delete(this.state.DeckServer+'api/decks/'+_id);
        this.refreshDecks();
        return res;
    }
    saveDeckServer = () =>{
        const name = this.state.saveDeckName;
        const Deck = this.props.createDeck();
        const res = axios({
            method: 'post',
            url: this.state.DeckServer+'api/decks/',
            data:{
                name: name,
                mainDeck: Deck.mainDeck,
                sideDeck: Deck.sideDeck,
                extraDeck: Deck.extraDeck
            }
        })
        this.refreshDecks();
        return res
    }
    loadDeckServer = () => {
        const _id = this.state.loadedDeckID;
        axios({
            method: 'get',
            url: this.state.DeckServer+'api/decks/'+_id,
            responseType: 'json'                
        })
            .then((response) =>{
                const Deck = response.data;
                this.props.setDeck(Deck);  
            })
            .catch(() =>{
                alert('REEEEEEEEEEEEEEEEEEEE')
            })
    }

    saveDeckName = (e) =>{
        const name = e.target.value;
        if(name!==this.state.saveDeckName){
            this.setState({
                saveDeckName: name,
            })
        }
    }

    componentDidMount(){
        this.refreshDecks();
    }


    handleChange(id){
        this.setState({
            loadedDeckID: id,
        })
    }

    generateOptions(){
        const decks = this.state.decks ? this.state.decks : []
        return (
            decks.map((deck) => (
            <option 
                key={deck._id}
                value={deck._id}
                >
                    {deck.name}
            </option>
            ))
        )
    }

    render() {
        const styleButton={
            margin: 2,
            padding: 2,
        }
        return (
            <div>
                <Row>
                    <InputGroup>
                        <FormControl
                            style={styleButton} 
                            type="text"
                            placeholder="Deck Name"
                            onChange = {this.saveDeckName}
                        />
                        <Button
                            style={styleButton} 
                            variant ="outline-primary"
                            onClick = {this.saveDeckServer}
                            >Save Deck
                        </Button>
                    </InputGroup>
                </Row>
                <Row>
                    <ButtonGroup>
                        <Button 
                            style={styleButton} 
                            variant ="outline-primary"
                            onClick= {this.loadDeckServer}
                            >Load Deck
                        </Button>
                        <select
                            style={styleButton} 
                            className="form-control md-3"
                            title="Saved Decks"
                            onChange={e => this.handleChange(e.target.value)}>
                        <option value="">-Decks-</option>
                        {this.generateOptions()}
                        </select>
                        
                        <Button 
                            style={styleButton} 
                            variant ="outline-primary"
                            onClick= {this.deleteDeckServer}
                        >Delete Deck
                        </Button>
                    </ButtonGroup> 
                    
                </Row>
                
                     
            </div>    
            
        );
    }
}
 
export default DeckList;