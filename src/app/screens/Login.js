import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div>
                <h1>{document.domain}</h1>
                <p>
                    <a href="/api/auth/authenticate?provider=azureadv2">Log in with Azure AD</a>
                </p>
                <p>
                    <Link to="/dashboard">Dashboard</Link>
                </p>
            </div>
        )
    }
}

export default Login