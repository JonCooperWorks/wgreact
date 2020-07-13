import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class Device extends Component {

    render() {
        return (
            <Card>
                <Card.Title>
                    {this.props.device.Name}
                </Card.Title>
                <Card.Body>
                    <p>{this.props.device.OS}</p>
                    <p>{this.props.device.PublicKey}</p>
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