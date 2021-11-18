import React from 'react'
import { Image, Form } from 'react-bootstrap';
import Back from '../images/cardBack.jpg';

class _Focus extends React.Component {
 
    constructor(props){
        super(props)
        this.state ={
            HoveredCard: null,
        }
    }

    focus(){
        const HoveredCard = (this.props.HoveredCard!==this.state.HoveredCard ? this.props.HoveredCard.card_images[0].image_url : Back)
        const Desc = (this.props.HoveredCard!==this.state.HoveredCard ? this.props.HoveredCard.desc : "card description...")
        const Sets= (this.props.HoveredCard!==this.state.HoveredCard ? JSON.stringify(this.props.HoveredCard.card_sets, ["set_name", "set_code","set_rarity"],1) : "card sets...")

        return(
            <div>
                <Image 
               src={HoveredCard} 
               alt="back" 
               key={"focusImg"} 
               id={"focus"} 
               style={{
                   maxHeight: 400,
                   maxWidth: 300,
               }}
           />
           <Form.Control style={{ resize: 'none' }}rows="7" cols="5" size ="lg" id={"focusDesc"} as="textarea" placeholder={Desc} readOnly disabled/>
           <Form.Control style={{ resize: 'none' }}rows="5" cols="5" size ="lg" id={"rarities"} as="textarea" placeholder={Sets} readOnly disabled/>
            </div>
           
        )
       
    }
    render() { 
        return (
        <div>
            {this.focus()}
        </div>
        )
    }
}
 
export default _Focus;