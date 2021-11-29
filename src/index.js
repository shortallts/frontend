import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//importing title and footer components
import Title from "./components/title"
//importing the routes 
import Main from './pages/main'
import CollectionManagement from './pages/collectionManagement'
import LookingFor from './pages/lookingfor';
import DeckCheck from './pages/_deckCheck';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Route, Switch} from 'react-router-dom';


ReactDOM.render(
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
              <Container>
                  <Title />
                  <Main />
              </Container> 
          </Route>
          <Route exact path="/looking">
            <Container>
              <Title /> 
              <LookingFor /> 
            </Container> 
          </Route>
          <Route exact path="/collection">
            <Container>
              <Title /> 
              <CollectionManagement />
            </Container> 
          </Route>
          <Route exact path ='/deck'>
            <Container>
              <Title /> 
              <DeckCheck />
            </Container> 
          </Route>
        </Switch> 
      </BrowserRouter>
    </div>
  ,
  document.getElementById('root')
);
