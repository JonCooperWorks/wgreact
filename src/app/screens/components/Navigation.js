import React, { Component } from "react";
import  Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { BsPlus } from 'react-icons/bs'

class Navigation extends Component {
    render() {
        return (
            <Navbar
                sticky="top"
                bg="light">
                <Navbar.Brand>{document.domain}</Navbar.Brand>
                    <Nav className="mr-auto">
                    </Nav>
                    <Button 
                        variant="outline-success" 
                        onClick={this.props.onAddDeviceClicked}>
                            <BsPlus />
                            Add device
                    </Button>
            </Navbar>
        )
    }
}

export default Navigation