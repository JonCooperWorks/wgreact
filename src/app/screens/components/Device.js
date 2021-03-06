import React, {Component} from "react";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import OSBadge from "./OSBadge";
import CopyableValue from "./CopyableValue";


class Device extends Component {

    render() {
        return (
            <Row>
            <Col>
                <Card
                    style={{margin: "10px"}}>
                    <Card.Header>
                        <Card.Title>
                            <OSBadge OS={this.props.device.OS} />
                            {this.props.device.Name}
                        </Card.Title>
                        <Card.Subtitle
                            className="text-muted"
                            style={{marginLeft: "5px"}}>{this.props.device.OS}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <CopyableValue
                            label="Public Key"
                            value={this.props.device.PublicKey} /> 
                                
                        <CopyableValue
                            label="IP Address"
                            value= {this.props.device.IPAddress} />

                    </Card.Body>
                    <Card.Footer>
                        <Button 
                            style={{
                                marginRight: "10px",
                                marginBottom: "5px",
                                marginTop: "5px"
                            }}
                            variant="warning"
                            onClick={this.props.onRekeyDevice}>
                                Regenerate Credentials
                            </Button>
                        <Button 
                            style={{
                                marginBottom: "5px",
                                marginTop: "5px"
                            }}
                            variant="danger"
                            onClick={this.props.onDeleteDevice}>
                                Revoke Access
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
            </Row>
        )
    }
}

export default Device