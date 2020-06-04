import React from "react";
import STLViewer from "stl-viewer";
import {Form, Row, Col, Container, Button} from "react-bootstrap";
import ApiThingiverse from "./ApiThingiverse";

export default class Devis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: "https://threejs.org/examples/models/stl/binary/colored.stl",
            color: "#6d071a",
            validate: null,
            coeff: {
                "#6d071a": 1,
                "#0035AD": 1.1,
                "#0B2345": 1.3,
                "#cbb341": 1.3,
                "#f1dec0": 1.5,
                "#BED9ED": 1.3,
                "#73685a": 1.8,
                "#8b5a2b": 2.3,
                "#aaa9ad": 3.8,
                "#36454f": 4.3,
                "#ccff00": 1.5
            },
            coeffDevis: 1,
            click: false
        }
    }

    uploadStl = (e) => {
        this.setState({
            model: URL.createObjectURL(e.target.files[0]),
            validate: true
        });
    }

    changeColor = (e) => {
        this.setState({
            color: e.target.value,
            coeffDevis: this.state.coeff[e.target.value]
        });
        if(this.state.click)
            this.showDevis();
    }

    showDevis = (e) => {
        this.setState({
            devis: true,
            price: 15.00 * this.state.coeffDevis,
            click: true
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <STLViewer
                        model={this.state.model}
                        width={400}
                        height={400}
                        modelColor={this.state.color}
                        backgroundColor='#EAEAEA'
                        rotate={true}
                        orbitControls={true}
                    />
                    <Form>
                        <Form.Group controlId="exampleForm.SelectCustom">
                            <Form.Label>Filament:</Form.Label>
                            <Form.Control as="select" onChange={this.changeColor} custom>
                                <option value={"#6d071a"}>ABS</option>
                                <option value={"#0035AD"}>PLA</option>
                                <option value={"#0B2345"}>PET</option>
                                <option value={"#cbb341"}>PETT</option>
                                <option value={"#f1dec0"}>Nylon</option>
                                <option value={"#BED9ED"}>PVA</option>
                                <option value={"#73685a"}>Gres</option>
                                <option value={"#8b5a2b"}>Bois</option>
                                <option value={"#aaa9ad"}>Metal</option>
                                <option value={"#36454f"}>Carbon</option>
                                <option value={"#ccff00"}>Phosphorecent</option>
                            </Form.Control>
                            {
                                this.state.validate && <>
                                    <br/>
                                    <Button variant={"ecommerce3"} onClick={this.showDevis}>
                                        Faire un devis
                                    </Button>
                                </>
                            }
                            {
                                this.state.devis && <h2>
                                    {`${this.state.price}€`}
                                </h2>
                            }
                        </Form.Group>
                    </Form>
                </Row>
                <Form>
                    <Form.File
                        id="custom-file"
                        label="Choisissez un fichier stl"
                        onChange={this.uploadStl}
                        custom
                    />
                </Form>
                <ApiThingiverse/>
            </Container>
        )
    }
}