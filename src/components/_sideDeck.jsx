import React from 'react'
import { Image } from 'react-bootstrap';
import Back from '../images/cardBack.jpg';


class _SideDeck extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            SideDeck: [],
        }
    }
  
    sideDeck(){
        const style ={
            maxHeight: 170, 
            maxWidth: 50, 
            margin: 2,
        }
        let sidedeck= [];
        for(let i=0; i<15; i++){
            sidedeck.push(i)
        }
        return (
            <div style={{
                maxHeight: 200,
                maxWidth: 830,
            }}>
            {sidedeck.map((card)=>{
                return (
                    <Image
                        onMouseEnter ={() => this.props.setFocus(this.props.SideDeck[card] ? this.props.SideDeck[card] : null)} 
                        onClick={()=> this.props.removeDeck(card, "Side")} 
                        src={this.state.SideDeck[card]!==this.props.SideDeck[card] ? this.props.SideDeck[card].card_images[0].image_url : Back} 
                        style={style} 
                        alt="back" 
                        id={"sd"+card}  
                        key={"sd"+card} 
                        />
                )
            })}
            </div>
        )
    }
    render() { 
        return (
            <div>
                {this.sideDeck()}
            </div>
        )
    }
}
 
export default _SideDeck;