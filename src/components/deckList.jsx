import React from "react";
import axios from 'axios';

class DeckList extends React.Component {

    constructor(props){
        super(props)
        this.state ={
            decks: null,
            DeckServer: 'http://localhost:5000/api/decks'
        }
    }

    componentDidMount(){
        axios.get(this.state.DeckServer)
        .then(res =>{
            this.setState({
                decks: res.data
            });      
        });
    }

    handleChange(id){
        this.props.setLoaded(id)
        //console.log(this.props)
    }

    generateOptions(){
        const decks = this.state.decks ? this.state.decks : []
        return (
           decks.map((deck) => (
            <option 
                key={deck._id}
                value={deck._id}
                >{deck.name}
            </option>
           ))
        )
    }
    
    render() { 

        return (
            <div>
                <select 
                    className="form-control col-md-3"
                    title="Saved Decks"
                    onChange={e => this.handleChange(e.target.value)}>
                    <option value="">--- Saved Decks ---</option>
                    {this.generateOptions()}
                </select>
            </div>
        );
    }
}
 
export default DeckList;