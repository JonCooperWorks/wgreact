import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OSBadge from "./OSBadge";
import CopyableValue from "./CopyableValue";


class Device extends Component {

    render() {
        return (
            <Card>
                <Card.Title>
                    <OSBadge OS={this.props.device.OS} />
                    {this.props.device.Name}
                </Card.Title>
                <Card.Subtitle
                    className="text-muted"
                    style={{marginLeft: "5px"}}>{this.props.device.OS}</Card.Subtitle>
                <Card.Body>
                    <CopyableValue
                        label="Public Key"
                        value={this.props.device.PublicKey} /> 
                            
                    <CopyableValue
                        label="IP Address"
                        value= {this.props.device.IPAddress} />

                    <Button 
                        variant="warning"
                        onClick={this.props.onRekeyDevice}>
                            Regenerate Credentials
                        </Button>
                    <Button 
                        variant="danger"
                        onClick={this.props.onDeleteDevice}>
                            Revoke Access
                    </Button>
                </Card.Body>
            </Card>
        )
    }
}

export default Device