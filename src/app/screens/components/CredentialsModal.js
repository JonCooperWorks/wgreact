import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import QRCode from 'qrcode.react'

class CredentialsModal extends Component {
    render() {
        return (
            <Modal
                show={this.props.show}
                backdrop="static"
                keyboard={false}
                onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Credentials</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p
                        style={{margin: "0 auto", display: "block"}}>
                            This is your Wireguard private key.
                            Store it in a safe place.
                            You will not be able to download this key again after it is created.
                    </p>
                    <QRCode
                        value={this.props.config} 
                        size={256}
                        style={{margin: "0 auto", display: "block"}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={this.props.onDownload}>Download</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}


export default CredentialsModal