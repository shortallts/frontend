import React from 'react'
import { Image } from 'react-bootstrap';
import Back from '../images/cardBack.jpg';

class ExtraDeck extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            ExtraDeck: [],
        }
    }
    
    extraDeck(){
        const style ={
            maxHeight: 170, 
            maxWidth: 50, 
            margin: 2,
        }
        let extradeck= [];
        for(let i=0; i<15; i++){
            extradeck.push(i)
        }
        return (
            <div style={{
                maxHeight: 200,
                maxWidth: 830,
            }}>
            {extradeck.map((card)=>{
                return (
                <Image
                    onMouseEnter ={() => this.props.setFocus(this.props.extraDeck[card] ? this.props.extraDeck[card] : null)}
                    onClick={()=> this.props.removeDeck(card, "Extra")}  
                    src={this.state.ExtraDeck[card]!==this.props.extraDeck[card] ? this.props.extraDeck[card].card_images[0].image_url : Back} 
                    style={style} 
                    alt="back" 
                    id={"xd"+card}  
                    key={"xd"+card} 
                />)
            })}
            </div>
        )
    }
    render() { 
        return (
        <div>
            {this.extraDeck()}
        </div>
        )
    }
}
 
export default ExtraDeck;