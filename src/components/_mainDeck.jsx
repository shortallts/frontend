import React from 'react'
import { Image } from 'react-bootstrap';
import Back from '../images/cardBack.jpg';

class MainDeck extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            MainDeck: [],
        }
    }
    
    mainDeck() {
        const style ={
            maxHeight: 170, 
            maxWidth: 75, 
            margin: 2,
        }
        let maindeck= [];
        for(let i=0; i<60; i++){    
            maindeck.push(i)
        }
        return (
            <div style={{
                maxHeight: 1000,
                maxWidth: 830,
            }}>
            {maindeck.map((card)=>{
                return (
                    <Image
                        onMouseEnter ={() => this.props.setFocus(this.props.mainDeck[card] ? this.props.mainDeck[card] : null)} 
                        onClick={()=> this.props.removeDeck(card, "Main")}
                        src={this.state.MainDeck[card]!==this.props.mainDeck[card] ? this.props.mainDeck[card].card_images[0].image_url : Back} 
                        style={style} 
                        alt="back" 
                        id={"md"+card} 
                        key={"md"+card} 
                    />)
            })}
            </div>
        )
    }
    render() { 
        return(
            <div>
                {this.mainDeck()}
            </div>
        )
    }
}
 
export default MainDeck;