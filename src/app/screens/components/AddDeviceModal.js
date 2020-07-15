import React, { Component } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

class AddDeviceModal extends Component {

    render() {
        return (
            <Modal
                show={this.props.show}
                backdrop="static"
                keyboard={false}
                onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Device</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.onFormSubmitted}>
                        <Form.Group controlId="formDeviceOS">
                            <Form.Label>Device OS</Form.Label>
                            <Form.Control name="OS" as="select" custom onChange={this.props.onFormTextChange("OS")}>
                                <option value="macOS">macOS</option>
                                <option value="Windows">Windows</option>
                                <option value="Linux">Linux</option>
                                <option value="iOS">iOS</option>
                                <option value="Android">Android</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formDeviceName">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control name="Name" type="text" placeholder="Device Nickname" onChange={this.props.onFormTextChange("Name")} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Add Device
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default AddDeviceModal