import React from 'react';
import { Navbar, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Title extends React.Component{
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Yu-Gi-Oh! Card Database</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <LinkContainer to="/">
                        <Button>
                            Home
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="/collection">
                        <Button>
                            Collection Manager
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="/looking">
                        <Button>
                            Currently Looking for
                        </Button>
                    </LinkContainer>
                    <LinkContainer to="/deck">
                        <Button>
                            Deck Checker
                        </Button>
                    </LinkContainer>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
export default Title;
