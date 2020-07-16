import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container'

import AppRoutes from './AppRoutes'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    render() {
        return (
            <Container fluid>
                <AppRoutes/>
            </Container>
        )
    }
}

export default withRouter(App)