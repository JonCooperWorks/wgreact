import React, { Component } from "react";
import { FaWindows, FaAndroid, FaLinux, FaApple } from 'react-icons/fa';

class OSBadge extends Component {
    render() {
        switch (this.props.OS) {
            case "iOS":
            case "macOS":
                return <FaApple
                            style={{
                                marginLeft: "5px",
                                marginRight: "5px",
                                marginTop: "0px"
                            }} />

            case "Android":
                return <FaAndroid
                            style={{
                                marginLeft: "5px",
                                marginRight: "5px",
                                marginTop: "1px"
                            }} />

            case "Windows":
                return <FaWindows
                            style={{
                                marginLeft: "5px",
                                marginRight: "5px",
                                marginTop: "1px"
                            }} />

            case "Linux":
            default:
                return <FaLinux
                            style={{
                                marginLeft: "5px",
                                marginRight: "5px",
                                marginTop: "1px"
                            }} />
                            
        }
    }
}

export default OSBadge