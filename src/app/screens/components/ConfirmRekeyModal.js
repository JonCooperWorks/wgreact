import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ConfirmRekeyModal extends Component {
    render () {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to rekey {this.props.device.Name}?</p>
                    <p>The device's access will be revoked until new credentials are installed.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onConfirmed}>Yes</Button>
                    <Button variant="primary" onClick={this.props.onClose}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmRekeyModal