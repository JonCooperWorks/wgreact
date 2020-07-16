import React, { Component } from "react";
import Col from 'react-bootstrap/Col'
import {FaCopy} from 'react-icons/fa'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'

import copy from 'copy-to-clipboard';


class CopyableValue extends Component {

    constructor(props) {
        super(props)
        this.onCopyClicked = this.onCopyClicked.bind(this)
    }

    onCopyClicked() {
        copy(this.props.value)
        alert("Copied to clipoard")
    }

    render() {
        return (
            <Form>
                <Form.Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Group>
                            <Form.Label>{this.props.label}</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    value={this.props.value}
                                    readOnly  />
                                <InputGroup.Append>
                                    <InputGroup.Text
                                        onClick={this.onCopyClicked}>
                                        <FaCopy />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Form.Row>
            </Form>
        )
    }
}

export default CopyableValue