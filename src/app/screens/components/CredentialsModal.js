import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert'
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
                    <Modal.Title>Wireguard Config</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="warning">
                            This is your <Alert.Link href="https://www.wireguard.com/install/" target="_blank" rel="noopener noreferrer">Wireguard</Alert.Link> private key.
                            For your safety, you won't be able to download it again.
                            Store it in a <strong>safe</strong> place.
                    </Alert>
                    <QRCode
                        value={this.props.config} 
                        size={256}
                        style={{margin: "0 auto", display: "block"}} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={this.props.onClose}>
                        Close
                    </Button>

                    <Button variant="success" onClick={this.props.onDownload}>Download</Button>
                </Modal.Footer>
            </Modal>
        )
    }
    
}


export default CredentialsModal