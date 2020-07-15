import React, { Component } from 'react';
import Image from 'react-bootstrap/Image'

class Login extends Component {
    render() {
        return (
            <div>
                <h1>{document.domain}</h1>
                <a href="/api/auth/authenticate?provider=azureadv2">
                    <Image
                        src={require("../../assets/images/sign-in-azure-ad.svg")} />
                </a>
            </div>
        )
    }
}

export default Login