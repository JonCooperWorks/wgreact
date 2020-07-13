import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {

    render() {
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper">
                <div className="main-panel">
                    <div className="content-wrapper">
                    <AppRoutes/>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default withRouter(App)