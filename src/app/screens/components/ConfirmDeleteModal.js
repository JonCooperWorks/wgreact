import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ConfirmDeleteModal extends Component {
    render () {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to permanently delete {this.props.device.Name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onDeleteDevice}>Yes</Button>
                    <Button variant="primary" onClick={this.props.onClose}>No</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ConfirmDeleteModal