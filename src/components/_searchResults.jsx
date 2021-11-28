import React from 'react'
import Back from '../images/cardBack.jpg';
import { Image, Col, Row, Button, FormControl, InputGroup, Form, FloatingLabel, Card } from 'react-bootstrap';
import axios from 'axios';

class _SearchResults extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            //State related to the API Calls
            APIURL: 'https://db.ygoprodeck.com/api/v7/cardinfo.php',
            Desc: '',
            CardType: '',
            ID: '',
            Effect: '',
            Name: '',
            Attribute : '',
            TrapType: '',
            MonsterType: '',
            SpellType: '',
            Ability: '',
            SummonType: '',
            CardEffect: '',
            CardAtk:'',
            CardDef:'',
            Cardlvl: '',
            CardAttribute: '',
            PicURL:'',
            PicSmallURL:'',
            MinAtk: '',
            MaxAtk: '',
            MinDef: '',
            MaxDef: '',
            MinLvl: '',
            MaxLvl: '',
            //state relating to images
            CardList: null,
            CardListLength: '',
            Page: 0,

        }
    }

    //Gets all of the cards from the database on mount
    componentDidMount(){
        axios.get(this.state.APIURL).then(res =>{
            this.setState({
                CardList: res.data.data,
                CardListLength: res.data.data.length
            });
        });
    }
    handleRightClick(e,card){
        e.preventDefault()
        if(card){
            this.props.addSideDeck(card)
        }
    }
    handleLeftClick(card){
        if(!card){
            return null;
        }
        if(card.type==="Fusion Monster" || card.type==="Link Monster" || card.type==="Pendulum Effect Fusion Monster" || card.type==="Synchro Monster" || card.type==="Synchro Pendulum Effect Monster" || card.type==="Synchro Tuner Monster" || card.type==="XYZ Monster" || card.type==="XYZ Pendulum Effect Monster"){
            this.props.addExtraDeck(card)
        }
        else{
            this.props.addMainDeck(card)
        }
    }
    
    handleMouseEnter(card){
        if(card){
            this.props.setFocus(card)
        }
    }
    handlePageButton(buttonNumber){
        let page= buttonNumber-1
        if(true){
            this.setState((prevState) =>({
                Page: page
            }))
        }
    }
    handleFront(){
        this.setState((prevState) =>({
            Page: 0
        }))
    }
    handleLast(){
        let last = Math.ceil(this.state.CardListLength/20) -1
        this.setState((prevState) =>({
             Page: last
         }))
    }
    tidyUpCardInfo(card){
        if(card.type!=="Skill Card" || card.type!=="Spell Card" || card.type==="Trap Card")
        {
            var Effect = "Effect";
            var Ability = '';
            var SummonType = '';
            var tempCard={};

            //Assigns all the types of normal monsters
            if(card.type==="Normal Monster" || card.type==="Normal Tuner Monster" || card.type==="Normal Monster" || 
            card.type==="Normal Monster" || card.type==="Normal Monster")
            {
                Effect = "Normal"
            }
            
            //Finds all of the tuners
            if(card.type==="Normal Tuner Monster" || card.type==="Tuner Monster" || card.type==="Flip Tuner Effect Monster" || 
            card.type==="Pendulum Tuner Effect Monster" || card.type==="Synchro Tuner Monster")
            {
                Ability = "Tuner"
            }
            //Find all of the Gemini
            if(card.type==="Gemini Monster"){
                Ability= "Gemini"
            }

            //Find all of the spirit monsters
            if(card.type==="Spirit Monster"){
                Ability= "Spirit"
            }
            //Find all of the Flip monsters
            if(card.type==="Flip Monster" || card.type==="Flip Effect Monster" || card.type==="Flip Tuner Effect Monster" || card.type==="Pendulum Flip Effect Monster"){
                Ability= "Flip"
            }
            //Find all of the toon monsters
            if(card.type==="Toon Monster"){
                Ability="Toon"
            }
            //Find all union monsters
            if(card.type==="Union Effect Monster"){
                Ability="Union"
            }
            if(card.type==="Fusion Monster" || card.Type==="Pendulum Effect Fusion Monster"){
                SummonType = "Fusion"
            }
            if(card.type==="Link Monster"){
                SummonType = "Link"
            }
            if(card.type==="Ritual Monster" || card.type==="Ritual Effect Monster"){
                SummonType = "Ritual"
            }
            if(card.type==="Pendulum Effect Monster" || card.type==="Pendulum Normal Monster" || card.type==="Pendulum Tuner Effect Monster" || card.type==="" || 
            card.type==="XYZ Pendulum Effect Monster" || card.type==="Pendulum Flip Effect Monster" || card.type==="Pendulum Effect Fusion Monster"){
                SummonType= "Pendulum"
            }
            if(card.type==="XYZ Monster" || card.type==="XYZ Pendulum Effect Monster"){
                SummonType= "XYZ"
            }
            if(card.type==="Synchro Monster" || card.type==="Synchro Tuner Monster" || card.type==="Synchro Pendulum Effect Monster"){
                SummonType="Synchro"
            }
             tempCard={
                SummonType: SummonType,
                Id: card.id,
                Name: card.name,
                Type: card.type,
                MonsterType: card.race,
                CardEffect: card.desc,
                CardAtk: card.atk,
                CardDef: card.def,
                CardLvl: card.level,
                SpellType: '',
                TrapType: '',
                CardAttribute: card.attribute,
                PicURL: card.card_images[0].image_url,
                PicSmallURL: card.card_images[0].image_url_small,
                Ability: Ability,
                Effect: Effect,
                
            }
        }
        if(card.type==="Spell Card"){
                 tempCard={
                SummonType: '',
                Id: card.id,
                Name: card.name,
                Type: card.type,
                MonsterType: '',
                CardEffect: card.desc,
                CardAtk: '',
                CardDef: '',
                CardLvl: '',
                SpellType: card.race,
                TrapType: '',
                CardAttribute: '',
                PicURL: card.card_images[0].image_url,
                PicSmallURL: card.card_images[0].image_url_small,
                Ability: '',
                Effect: ''
            }
        }
        if(card.type==="Trap Card"){
              tempCard={
                SummonType: '',
                Id: card.id,
                Name: card.name,
                Type: card.type,
                MonsterType: '',
                CardEffect: card.desc,
                CardAtk: '',
                CardDef: '',
                CardLvl: '',
                SpellType: '',
                TrapType: card.race,
                CardAttribute: '',
                PicURL: card.card_images[0].image_url,
                PicSmallURL: card.card_images[0].image_url_small,
                Ability: '',
                Effect: ''
            }
        }
        if(card===undefined){
            tempCard=null;
        }
        return tempCard
    }

    renderParam(){
        let lastPage = Math.ceil(this.state.CardListLength/20)
        const styleButton={
            margin: 2,
            padding: 2,
        }
        if(this.state.CardType==="Monster" || this.state.CardType===''){
            return (
                        <Card>
                            <Card.Header>SEARCH</Card.Header>
                            <Card.Title></Card.Title>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <InputGroup style={styleButton} size="sm" className="mb-3">
                                            <InputGroup.Text id="inputGroup-sizing-sm">Card Name</InputGroup.Text>
                                            <FormControl onChange={(e) => {this.handleNameChange(e.target.value)}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup style={styleButton} size="sm" className="mb-3">
                                            <InputGroup.Text id="inputGroup-sizing-sm">Desc</InputGroup.Text>
                                            <FormControl onChange={(e) => {this.handleDescChange(e.target.value)}} aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Col>
                                </Row> 
                                <Row>
                                    <Col>
                                        <FloatingLabel onChange={(e) => {this.handleTypeChange(e.target.value)}} style={styleButton} controlId="type" label="Card Type">
                                            <Form.Select>
                                                <option value=''>--</option>
                                                <option value="Monster">Monster</option>
                                                <option value="Spell">Spell</option>
                                                <option value="Trap">Trap</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="MonsterType" label="Monster Type">
                                        <Form.Select onChange={(e) => {this.handleMonsterTypeChange(e.target.value)}}>
                                        <option>--</option>
                                        <option value="Aqua">Aqua</option>
                                        <option value="Beast">Beast</option>
                                        <option value="Beast-Warrior">Beast-Warrior</option>
                                        <option value="Cyberse">Cyberse</option>
                                        <option value="Dinosaur">Dinosaur</option>
                                        <option value="Divine-Beast">Divine-Beast</option>
                                        <option value="Dragon">Dragon</option>
                                        <option value="Fairy">Fairy</option>
                                        <option value="Fiend">Fiend</option>
                                        <option value="Fish">Fish</option>
                                        <option value="Machine">Machine</option>
                                        <option value="Plant">Plant</option>
                                        <option value="Psychic">Psychic</option>
                                        <option value="Pyro">Pyro</option>
                                        <option value="Reptile">Reptile</option>
                                        <option value="Rock">Rock</option>
                                        <option value="Sea Monster">Sea Monster</option>
                                        <option value="Spellcaster">Spellcaster</option>
                                        <option value="Thunder">Thunder</option>
                                        <option value="Warrior">Warrior</option>
                                        <option value="Winged Beast">Spellcaster</option>
                                        <option value="Wyrm">Wyrm</option>
                                        <option value="Zombie">Zombie</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="summonType" label="Summon Type">
                                        <Form.Select onChange={(e) => {this.handleSummonTypeChange(e.target.value)}}>
                                        <option>--</option>
                                        <option value="Ritual">Ritual</option>
                                        <option value="Fusion">Fusion</option>
                                        <option value="Synchro">Synchro</option>
                                        <option value="XYZ">XYZ</option>
                                        <option value="Link">Link</option>
                                        <option value="Pendulum">Pendulum</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="effect" label="Effect">
                                        <Form.Select onChange={(e) => {this.handleEffectChange(e.target.value)}}>
                                            <option>--</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Effect">Effect</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="monsterAbility" label="Monster Ability">
                                        <Form.Select onChange={(e) => {this.handleAbilityChange(e.target.value)}}>
                                        <option>--</option>    
                                        <option value="Gemini">Gemini</option>
                                        <option value="Spirit">Spirit</option>
                                        <option value="Toon">Toon</option>
                                        <option value="Tuner">Tuner</option>
                                        <option value="Union">Union</option>
                                        <option value="Flip">Flip</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel style={styleButton} controlId="monsterAttribute" label="Monster Attribute">
                                            <Form.Select onChange={(e) => {this.handleAttributeChange(e.target.value)}}>
                                            <option>--</option>
                                            <option value="Dark">Dark</option>
                                            <option value="Divine">Divine</option>
                                            <option value="Earth">Earth</option>
                                            <option value="Fire">Fire</option>
                                            <option value="Light">Light</option>
                                            <option value="Water">Water</option>
                                            <option value="Wind">Wind</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl onChange={(e) => {this.handleMinLvlChange(e.target.value)}} id="minLvl" placeholder="Min Lv" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl onChange={(e) => {this.handleMaxLvlChange(e.target.value)}} id="maxLvl" placeholder="Max Lv" />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                    <Form.Group>
                                        <InputGroup style={styleButton} className="mb-2">
                                            <FormControl onChange={(e) => {this.handleMinAtkChange(e.target.value)}} id="minAtk" placeholder="Min Atk" />
                                            <InputGroup.Text>{"<="}</InputGroup.Text>
                                            <FormControl onChange={(e) => {this.handleMaxAtkChange(e.target.value)}} id="maxAtk" placeholder="Max Atk" />
                                        </InputGroup>
                                    </Form.Group>
                                    </Col>
                                 </Row>
                                 <Row>
                                     <Col>
                                        <Form.Group>
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl onChange={(e) => {this.handleMinDefChange(e.target.value)}} id="minDef" placeholder="Min Def" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl onChange={(e) => {this.handleMaxDefChange(e.target.value)}} id="maxDef" placeholder="Max Def" />
                                                <Button style={styleButton} onSubmit={this.handleSubmit} variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                     </Col>
                                </Row>
                                <Row>     
                                    <Col>   
                                        <InputGroup>
                                            <Button onClick={() => this.handleFront()} style={styleButton} variant="primary">Front</Button>
                                            <Button onClick={() => this.handleBackButton()} style={styleButton} variant="primary">Back</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-2)} variant="primary"> {this.state.Page>1 ? this.state.Page -1 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-1)} variant="primary"> {this.state.Page>0 ? this.state.Page : '.'}</Button>
                                            <InputGroup.Text>{(this.state.Page+1) + " of "+Math.ceil(this.state.CardListLength/20)}</InputGroup.Text>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+2)} variant="primary"> {this.state.Page<lastPage-1 ? this.state.Page +2 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+3)} variant="primary"> {this.state.Page<lastPage-2 ? this.state.Page +3: '.'}</Button>
                                            <Button onClick={() => this.handleForwardButton()} style={styleButton} variant="primary">Next</Button>
                                            <Button  onClick={() => this.handleLast()} style={styleButton} variant="primary">Last</Button>
                                        </InputGroup>                                        
                                    </Col>
                                </Row>
                                {this.searchResults()} 
                            </Form>
                        </Card>                
            )
        }
        if(this.state.CardType==='Spell'){
            return(
            <Card>
                            <Card.Header>SEARCH</Card.Header>
                            <Card.Title></Card.Title>
                            <Form onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col>
                                        <InputGroup style={styleButton} size="sm" className="mb-3">
                                            <InputGroup.Text id="inputGroup-sizing-sm">Card Name</InputGroup.Text>
                                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup style={styleButton} size="sm" className="mb-3">
                                            <InputGroup.Text id="inputGroup-sizing-sm">Desc</InputGroup.Text>
                                            <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                        </InputGroup>
                                    </Col>
                                </Row> 
                                <Row>
                                    <Col>
                                        <FloatingLabel style={styleButton}  onChange={(e) => {this.handleTypeChange(e.target.value)}} controlId="type" label="Card Type">
                                            <Form.Select>
                                                <option value=''>--</option>
                                                <option value="Monster">Monster</option>
                                                <option value="Spell">Spell</option>
                                                <option value="Trap">Trap</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                    <FloatingLabel style={styleButton} onChange={(e)=> {this.handleSpellTypeChange(e.target.value)}} controlId="spellType" label="Spell Type">
                                        <Form.Select>
                                            <option>--</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Continuous">Continuous</option>
                                            <option value="Equip">Equip</option>
                                            <option value="Field">Field</option>
                                            <option value="Quick-Play">Link</option>
                                            <option value="Ritual">Ritual</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    </Col>
                                    
                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel style={styleButton} controlId="summonType" label="Summon Type">
                                            <Form.Select disabled>
                                            <option>--</option>
                                            <option value="Ritual">Ritual</option>
                                            <option value="Fusion">Fusion</option>
                                            <option value="Synchro">Synchro</option>
                                            <option value="XYZ">XYZ</option>
                                            <option value="Link">Link</option>
                                            <option value="Pendulum">Pendulum</option>
                                            </Form.Select>
                                        </FloatingLabel>    
                                    </Col>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="effect" label="Effect">
                                        <Form.Select disabled>
                                            <option>--</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Effect">Effect</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    <FloatingLabel style={styleButton} controlId="monsterAbility" label="Monster Ability">
                                        <Form.Select disabled>
                                        <option>--</option>    
                                        <option value="Gemini">Gemini</option>
                                        <option value="Spirit">Spirit</option>
                                        <option value="Toon">Toon</option>
                                        <option value="Tuner">Tuner</option>
                                        <option value="Union">Union</option>
                                        <option value="Flip">Flip</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel style={styleButton} controlId="monsterAttribute" label="Monster Attribute">
                                            <Form.Select disabled>
                                            <option>--</option>
                                            <option value="Dark">Dark</option>
                                            <option value="Divine">Divine</option>
                                            <option value="Earth">Earth</option>
                                            <option value="Fire">Fire</option>
                                            <option value="Light">Light</option>
                                            <option value="Water">Water</option>
                                            <option value="Wind">Wind</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group >
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl disabled id="minLvl" placeholder="Min Lv" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl disabled id="maxLvl" placeholder="Max Lv" />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group>
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl disabled id="minAtk" placeholder="Min Atk" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl disabled id="maxAtk" placeholder="Max Atk" />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                     <Col>
                                        <Form.Group>
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl disabled onChange={(e) => {this.handleMinDefChange(e.target.value)}} id="minDef" placeholder="Min Def" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl disabled onChange={(e) => {this.handleMaxDefChange(e.target.value)}} id="maxDef" placeholder="Max Def" />
                                                <Button style={styleButton} onSubmit={this.handleSubmit} variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                     </Col>
                                </Row>
                                <Row>     
                                    <Col>   
                                        <InputGroup>
                                            <Button onClick={() => this.handleFront()} style={styleButton} variant="primary">Front</Button>
                                            <Button onClick={() => this.handleBackButton()} style={styleButton} variant="primary">Back</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-2)} variant="primary"> {this.state.Page>1 ? this.state.Page -1 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-1)} variant="primary"> {this.state.Page>0 ? this.state.Page : '.'}</Button>
                                            <InputGroup.Text>{(this.state.Page+1) + " of "+Math.ceil(this.state.CardListLength/20)}</InputGroup.Text>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+2)} variant="primary"> {this.state.Page<lastPage-1 ? this.state.Page +2 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+3)} variant="primary"> {this.state.Page<lastPage-2 ? this.state.Page +3: '.'}</Button>
                                            <Button onClick={() => this.handleForwardButton()} style={styleButton} variant="primary">Next</Button>
                                            <Button  onClick={() => this.handleLast()} style={styleButton} variant="primary">Last</Button>
                                        </InputGroup>                                        
                                    </Col>
                                </Row>
                                
                                {this.searchResults()} 
                            </Form>
                        </Card>
            )}
            if(this.state.CardType==='Trap'){
                return(
                    <Card>
                    <Card.Header>SEARCH</Card.Header>
                    <Card.Title></Card.Title>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <InputGroup style={styleButton} size="sm" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Card Name</InputGroup.Text>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                            </Col>
                            <Col>
                                <InputGroup style={styleButton} size="sm" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Desc</InputGroup.Text>
                                    <FormControl aria-label="Small" aria-describedby="inputGroup-sizing-sm" />
                                </InputGroup>
                            </Col>
                        </Row> 
                        <Row>
                            <Col>
                                <FloatingLabel style={styleButton}  onChange={(e) => {this.handleTypeChange(e.target.value)}} controlId="type" label="Card Type">
                                    <Form.Select>
                                        <option value=''>--</option>
                                        <option value="Monster">Monster</option>
                                        <option value="Spell">Spell</option>
                                        <option value="Trap">Trap</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col>
                            <FloatingLabel style={styleButton} onChange={(e)=> {this.handleTrapTypeChange(e.target.value)}} controlId="trapType" label="Trap Type">
                                <Form.Select>
                                    <option>--</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Continuous">Continuous</option>
                                    <option value="Counter">Counter</option>
                                </Form.Select>
                            </FloatingLabel>
                            </Col>
                            
                        </Row>
                        <Row>
                            <Col>
                                <FloatingLabel style={styleButton} controlId="summonType" label="Summon Type">
                                    <Form.Select disabled>
                                    <option>--</option>
                                    <option value="Ritual">Ritual</option>
                                    <option value="Fusion">Fusion</option>
                                    <option value="Synchro">Synchro</option>
                                    <option value="XYZ">XYZ</option>
                                    <option value="Link">Link</option>
                                    <option value="Pendulum">Pendulum</option>
                                    </Form.Select>
                                </FloatingLabel>    
                            </Col>
                            <Col>
                            <FloatingLabel style={styleButton} controlId="effect" label="Effect">
                                <Form.Select disabled>
                                    <option>--</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Effect">Effect</option>
                                </Form.Select>
                            </FloatingLabel>
                            
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <FloatingLabel style={styleButton} controlId="monsterAbility" label="Monster Ability">
                                <Form.Select disabled>
                                <option>--</option>    
                                <option value="Gemini">Gemini</option>
                                <option value="Spirit">Spirit</option>
                                <option value="Toon">Toon</option>
                                <option value="Tuner">Tuner</option>
                                <option value="Union">Union</option>
                                <option value="Flip">Flip</option>
                                </Form.Select>
                            </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel style={styleButton} controlId="monsterAttribute" label="Monster Attribute">
                                    <Form.Select disabled>
                                    <option>--</option>
                                    <option value="Dark">Dark</option>
                                    <option value="Divine">Divine</option>
                                    <option value="Earth">Earth</option>
                                    <option value="Fire">Fire</option>
                                    <option value="Light">Light</option>
                                    <option value="Water">Water</option>
                                    <option value="Wind">Wind</option>
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group >
                                    <InputGroup style={styleButton} className="mb-2">
                                        <FormControl disabled id="minLvl" placeholder="Min Lv" />
                                        <InputGroup.Text>{"<="}</InputGroup.Text>
                                        <FormControl disabled id="maxLvl" placeholder="Max Lv" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <InputGroup style={styleButton} className="mb-2">
                                        <FormControl disabled id="minAtk" placeholder="Min Atk" />
                                        <InputGroup.Text>{"<="}</InputGroup.Text>
                                        <FormControl disabled id="maxAtk" placeholder="Max Atk" />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                                     <Col>
                                        <Form.Group>
                                            <InputGroup style={styleButton} className="mb-2">
                                                <FormControl disabled onChange={(e) => {this.handleMinDefChange(e.target.value)}} id="minDef" placeholder="Min Def" />
                                                <InputGroup.Text>{"<="}</InputGroup.Text>
                                                <FormControl disabled onChange={(e) => {this.handleMaxDefChange(e.target.value)}} id="maxDef" placeholder="Max Def" />
                                                <Button style={styleButton} onSubmit={this.handleSubmit} variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                     </Col>
                                </Row>
                                <Row>     
                                    <Col>   
                                        <InputGroup>
                                            <Button onClick={() => this.handleFront()} style={styleButton} variant="primary">Front</Button>
                                            <Button onClick={() => this.handleBackButton()} style={styleButton} variant="primary">Back</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-2)} variant="primary"> {this.state.Page>1 ? this.state.Page -1 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page-1)} variant="primary"> {this.state.Page>0 ? this.state.Page : '.'}</Button>
                                            <InputGroup.Text>{(this.state.Page+1) + " of "+Math.ceil(this.state.CardListLength/20)}</InputGroup.Text>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+2)} variant="primary"> {this.state.Page<lastPage-1 ? this.state.Page +2 : ".."}</Button>
                                            <Button onClick={() => this.handlePageButton(this.state.Page+3)} variant="primary"> {this.state.Page<lastPage-2 ? this.state.Page +3: '.'}</Button>
                                            <Button onClick={() => this.handleForwardButton()} style={styleButton} variant="primary">Next</Button>
                                            <Button  onClick={() => this.handleLast()} style={styleButton} variant="primary">Last</Button>
                                        </InputGroup>                                        
                                    </Col>
                                </Row>
                        {this.searchResults()} 
                    </Form>
                </Card>
                )}
    }
    handleTrapTypeChange(value){
        this.setState((prevState) =>({
        TrapType: value
        }))
     }
     handleSpellTypeChange(value){
        this.setState((prevState) =>({
        SpellType: value
        }))
     }
     handleSetURL(value){
        this.setState((prevState) =>({
        APIURL: value
        }))
     }
 
      handleMinAtkChange(value){
         this.setState((prevState) =>({
         MinAtk: value
         }))
      }
      handleMaxAtkChange(value){
         this.setState((prevState) =>({
         MaxAtk: value
         }))
      }
      handleMinDefChange(value){
         this.setState((prevState) =>({
         MinDef: value
         }))
      }
      handleMaxDefChange(value){
         this.setState((prevState) =>({
         MaxDef: value
         }))
      }
      handleMinLvlChange(value){
         this.setState((prevState) =>({
         MinLvl: value
         }))
      }
      handleMaxLvlChange(value){
         this.setState((prevState) =>({
         MaxLvl: value
         }))
      }
      handleTypeChange(value) { 
         this.setState((prevState) =>({
         CardType: value
         }))
      }
      handleError(){
          if((this.state.MinAtk!=='' && this.state.MaxAtk!=='') || (this.state.MinDef!=='' && this.state.MaxDef!=='') || (this.state.MinLvl!=='' && this.state.MaxLvl!=='') )
          {
              alert("Due to the API this website is built off of, you cannot search for both less then and greater than for the level, attack or defense values. Please choose either less then or greater then for attack, defense, and level")
              console.log(this.state)
              return false
          }
          return true
      }
      handleNameChange(value){
         this.setState((prevState) =>({
         Name: value
         }))
      }
      handleDescChange(value){
         this.setState((prevState) =>({
         Desc: value
         }))
      }
     handleEffectChange(value) {
         this.setState((prevState) =>({
         Effect: value
         }))
     }
     handleSummonTypeChange(value) {
         this.setState((prevState) =>({
         SummonType: value
     }))
     }
     handleMonsterTypeChange(value) {
             
         this.setState((prevState) =>({
         MonsterType: value
     }))
     }
     handleAbilityChange(value) {
         
         this.setState((prevState) =>({
         Ability: value
     }))
     }
     handleAttributeChange(value) {
         
         this.setState({
         Attribute: value
     })
     }

     handleSubmit = (e) => {
        e.preventDefault();
        if(this.handleError()){
            let URL = this.generateURL()
            this.handleSetURL(URL)
            axios.get(URL).then(res =>{
                this.setState({
                    CardList: res.data.data,
                    CardListLength: res.data.data.length,
                    Page: 0,
                });
            });
        }  
    }
    handleBackButton(){
        if(this.state.Page>0){
            this.setState((prevState) => ({
                Page: prevState.Page - 1
            }))
            this.searchResults()
        }
      }
    handleForwardButton(){
        if(this.state.Page<(this.state.CardListLength/20)-1){
            this.setState((prevState) => ({
                Page: prevState.Page + 1
            })) 
            this.searchResults()
        }  
    }

     generateURL(){
        var baseURL='https://db.ygoprodeck.com/api/v7/cardinfo.php?';
        if(this.state.Name!==''){
            baseURL+='name='+this.state.Name+'&'
        }
        if(this.state.Desc!==''){
            baseURL+='desc='+this.state.Desc+'&'
        }
        if(this.state.CardType==='Monster' & this.state.Ability===''){
            baseURL+='type=Normal Monster,Normal Tuner Monster,Effect Monster,Tuner Monster,Flip Monster,'; 
            baseURL+='Flip Effect Monster,Flip Tuner Effect Monster,Spirit Monster,Union Effect Monster,Gemini Monster,';
            baseURL+='Pendulum Effect Monster,Pendulum Normal Monster,Pendulum Tuner Effect Monster,Ritual Monster,';
            baseURL+='Ritual Effect Monster,Toon Monster,Fusion Monster,Synchro Monster,Synchro Tuner Monster,';
            baseURL+='Synchro Pendulum Effect Monster,XYZ Monster,XYZ Pendulum Effect Monster,Link Monster,';
            baseURL+='Pendulum Flip Effect Monster,Pendulum Effect Fusion Monster&';
        }
        if(this.state.CardType==='Monster' & this.state.Ability!==''){
            baseURL+='type=Normal Monster,Effect Monster,'; 
            baseURL+='Pendulum Effect Monster,Pendulum Normal Monster,Ritual Monster,';
            baseURL+='Ritual Effect Monster,Fusion Monster,Synchro Monster,';
            baseURL+='Synchro Pendulum Effect Monster,XYZ Monster,XYZ Pendulum Effect Monster,Link Monster,';
            baseURL+='Pendulum Effect Fusion Monster&';
        }
        if(this.state.Effect==='Effect'){
            baseURL+="has_effect=true&"
        }
        if(this.state.Effect==='Normal'){
            baseURL+="has_effect=false&"
        }
        if(this.state.SummonType==='Fusion'){
            baseURL+="type=Fusion Monster,Pendulum Effect Fusion Monster&"
        }
        if(this.state.SummonType==='Link'){
            baseURL+="type=Link Monster&"
        }
        if(this.state.SummonType==='Ritual'){
            baseURL+="type=Ritual Effect Monster,Ritual Monster&"
        }
        if(this.state.SummonType==='Pendulum'){
            baseURL+='type=Pendulum Effect Monster,Pendulum Normal Monster,Pendulum Tuner Effect Monster,'
            baseURL+='XYZ Pendulum Effect Monster,Pendulum Flip Effect Monster,Pendulum Effect Fusion Monster&'
        }
        if(this.state.SummonType==='Synchro'){
            baseURL+='type=Synchro Monster,Synchro Tuner Monster,Synchro Pendulum Effect Monster&'
        }
        if(this.state.SummonType==='XYZ'){
            baseURL+='type=XYZ Monster,XYZ Pendulum Effect Monster&'
        }
        if(this.state.MonsterType!==''){
            baseURL+='race='+this.state.MonsterType+'&'
        }
        if(this.state.Ability==='Gemini'){
            baseURL+='type=Gemini Monster&'
        }
        if(this.state.Ability==='Toon'){
            baseURL+='type=Toon Monster&'
        }
        if(this.state.Ability==='Tuner'){
            baseURL+='type=Normal Tuner Monster,Tuner Monster,Flip Tuner Effect Monster",Pendulum Tuner Effect Monster,Synchro Tuner Monster&'
        }
        if(this.state.Ability==='Spirit'){
            baseURL+='type=Spirit Monster&'
        }
        if(this.state.Ability==='Flip'){
            baseURL+='type=Flip Monster,Flip Effect Monster,Flip Tuner Effect Monster,Pendulum Flip Effect Monster&'
        }
        if(this.state.Ability==='Union'){
            baseURL+='type=Union Effect Monster&'
        }
        if(this.state.Attribute!==''){
            baseURL+='attribute='+this.state.Attribute+'&'
        }
        if(this.state.MinLvl!==''){
            baseURL+='level=gte'+this.state.MinLvl+'&'
        }
        if(this.state.MaxLvl!==''){
            baseURL+='level=lte'+this.state.MaxLvl+'&'
        }
        if(this.state.MinAtk!==''){
            baseURL+='atk=gte'+this.state.MinAtk+'&'
        }
        if(this.state.MaxAtk!==''){
            baseURL+='atk=lte'+this.state.MaxAtk+'&'
        }
        if(this.state.MinDef!==''){
            baseURL+='def=gte'+this.state.MinDef+'&'
        }
        if(this.state.MaxDef!==''){
            baseURL+='def=lte'+this.state.MaxDef+'&'
        }
        if(this.state.TrapType!==''){
            baseURL+='race='+this.state.TrapType+'&'
        }
        if(this.state.SpellType!==''){
            baseURL+='race='+this.state.SpellType+'&'
        }
        if(this.state.CardType==='Spell'){
            baseURL+='type=Spell Card&'
        }
        if(this.state.CardType==='Trap'){
            baseURL+='type=Trap Card&'
        }
        return encodeURI(baseURL)
    }

    searchResults(){
        const style ={
            maxHeight: 120, 
            maxWidth: 100, 
            margin: 2,
        }
        let search= [];
        for(let i=0; i<20; i++){
            search.push(i)
        }

        return (
            <div style={{
                maxHeight: 200,
                maxWidth: 830,
            }}>
            {search.map((card)=>{
                return (
                <Image
                    onContextMenu={(e) => this.handleRightClick(e, this.state.CardList[card+(this.state.Page*20)])}
                    onClick={(e) => {this.handleLeftClick(this.state.CardList[card+(this.state.Page*20)])}}
                    onMouseEnter={(e) =>{ this.handleMouseEnter(this.state.CardList[card+(this.state.Page*20)])}}
                    src={this.state.CardList!==null && this.state.CardList[card+(this.state.Page*20)] ? this.state.CardList[card+(this.state.Page*20)].card_images[0].image_url :Back} 
                    style={style} 
                    alt="back" 
                    id={"search"+card}  
                    key={"search"+card} 
                />)
            })}
            </div>
        )
    
    }
    render() { 
        return (
            <div>
                {this.renderParam()}
            </div>
        )
    }
}
 
export default _SearchResults;