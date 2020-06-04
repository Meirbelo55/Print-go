import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge} from "react-bootstrap";

export default class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            taillePanier: props.taille
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.taille)
            this.setState({taillePanier: nextProps.taille});
    }

    render() {
        return (
            <Navbar bg="ecommerce1" expand="md">
                <Navbar.Brand className="text-ecommerce2" href="#home">
                    <h3>Print'n Go</h3>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#devis" onClick={this.props.showDevis}>Faire un devis</Nav.Link>
                        <Nav.Link href="#boutiques" onClick={this.props.showBoutiques}>Boutiques</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#urgences">Urgences</NavDropdown.Item>
                            <NavDropdown.Item href="#covid">Covid 19</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#propos">A propos</Nav.Link>
                        <Nav.Link href="#devis" onClick={this.props.showPanier}>
                            <Badge variant={"ecommerce3"}>{this.state.taillePanier}</Badge>
                            Panier
                        </Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Recherchez un objet" className="mr-sm-2" />
                        <Button variant="ecommerce3">Go</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}