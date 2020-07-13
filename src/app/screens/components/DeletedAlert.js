import React, { Component } from "react";
import Alert from 'react-bootstrap/Alert'

class DeletedAlert extends Component {

    render() {
        if (this.props.show) {
            return (
                <Alert variant="success" onClose={this.props.onClose} dismissible>
                    <Alert.Heading>Device successfully deleted </Alert.Heading>
                </Alert>
            )
        }

        return null
    }
}

export default DeletedAlert