import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OSBadge from "./OSBadge";


class Device extends Component {

    render() {
        return (
            <Card>
                <Card.Title>
                    <OSBadge OS={this.props.device.OS} />
                    {this.props.device.Name}
                </Card.Title>
                <Card.Body>
                    <p>{this.props.device.PublicKey}</p>
                    <p>{this.props.device.IPAddress}</p>
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