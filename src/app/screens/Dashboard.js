import React, { Component } from 'react';
import  Button from 'react-bootstrap/Button';
import FileSaver from 'file-saver';

import AddDeviceModal from './components/AddDeviceModal';
import CredentialsModal from './components/CredentialsModal';
import Device from './components/Device'
import DeletedAlert from './components/DeletedAlert'

import WireguardAPI from '../service'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            devices: [],
            showDeletedAlert: false,
            showCredentialsModal: false,
            showAddDeviceModal: false,
            showConfirmDeleteModal: false,
            displayedCredentials: "",
            newDevice: {
                Name: "",
                OS: ""
            },
            deviceToDelete: {}
        }
        this.onAlertClosed = this.onAlertClosed.bind(this)
        this.onCredentialsModalClosed = this.onCredentialsModalClosed.bind(this)
        this.onCoznfigDownload = this.onConfigDownload.bind(this)
        this.onAddDeviceClicked = this.onAddDeviceClicked.bind(this)
        this.onAddDeviceModalClosed = this.onAddDeviceModalClosed.bind(this)
        this.onDeviceAdded = this.onDeviceAdded.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onDeviceDeleted = this.onDeviceDeleted.bind(this)
        this.onConfirmDeleteModalClosed = this.onConfirmDeleteModalClosed.bind(this)
        this.loadDevices = this.loadDevices.bind(this)
        this.wireguardAPI = new WireguardAPI()
    }
    
    componentDidMount() {
        this.wireguardAPI.userInfo()
        .then(userInfo => {
            this.setState((state) => {
                return {user: userInfo}
            })
        })
        
        this.loadDevices()
    }

    loadDevices() {
        this.wireguardAPI.devices()
        .then(devices => {
            this.setState((state) => {
                state.devices = devices
                return state
            })
        })
    }

    onAlertClosed() {
        this.setState(() => {
            return {showDeletedAlert: false}
        })
    }

    onCredentialsModalClosed() {
        this.setState(() => {
            return {
                showCredentialsModal: false,
                displayedCredential: ""
            }
        })
        this.loadDevices()
    }

    onConfigDownload() {
        var config = new Blob([this.state.displayedCredentials], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(config, document.domain + ".conf")
    }

    onAddDeviceClicked(){
        this.setState(() => {
            return {showAddDeviceModal: true}
        })
    }

    onAddDeviceModalClosed() {
        this.setState(() => {
            return {showAddDeviceModal: false}
        })
    }

    onDeviceAdded(deviceConfig) {
        this.setState((state) => {
            return {
                showAddDeviceModal: false,
                showCredentialsModal: true,
                displayedCredentials: deviceConfig
            }
        })
    }

    onDeviceDeleted() {
        this.wireguardAPI.deleteDevice(this.state.deviceToDelete.ID)
        .then(() => {
            this.setState((state) => {
                return {
                    devices: state.devices.filter((device) => device.ID !== this.state.deviceToDelete.ID),
                    showDeletedAlert: true,
                    showConfirmDeleteModal: false,
                    deviceToDelete: {}
                }
            })
        })
    }

    onConfirmDeleteModalClosed() {
        this.setState(() => {
            return {showConfirmDeleteModal: false}
        })
    }

    handleSubmit(event) {
        this.wireguardAPI.newDevice({
            Name: this.state.newDevice.Name,
            OS: this.state.newDevice.OS
        })
        .then(config => {
            this.onDeviceAdded(config)
        })
        event.preventDefault()
    }

    handleChange(fieldName) {
        return (event) => {
            event.persist()
            this.setState((state) => {
                state.newDevice[fieldName] = event.target.value
                return state
            })
        }
    }

    render() {
        const deleteHandlers = this.state.devices.map((device, index) =>  () => {
            this.setState(() => {
                return {
                    showConfirmDeleteModal: true,
                    deviceToDelete: device
                }
            })
        })

        const rekeyHandlers = this.state.devices.map((device, index) => () => {
            this.wireguardAPI.rekeyDevice(device.ID)
            .then(config => {
                this.setState(() => {
                    return {
                        showCredentialsModal: true,
                        displayedCredentials: config
                    }
                })
            })
        })

        return (
            <div>
                <h1>Dashboard</h1>
                <DeletedAlert 
                    show={this.state.showDeletedAlert}
                    onClose={this.onAlertClosed} />

                <CredentialsModal 
                    show={this.state.showCredentialsModal}
                    config={this.state.displayedCredentials}
                    onClose={this.onCredentialsModalClosed}
                    onDownload={this.onConfigDownload} />

                <AddDeviceModal
                    show={this.state.showAddDeviceModal}
                    onClose={this.onAddDeviceModalClosed}
                    onSuccess={this.onDeviceAdded}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit} />

                <ConfirmDeleteModal
                    show={this.state.showConfirmDeleteModal}
                    onClose={this.onConfirmDeleteModalClosed}
                    onDeleteDevice={this.onDeviceDeleted}
                    device={this.state.deviceToDelete} />

                <Button variant="success" onClick={this.onAddDeviceClicked}>Add device</Button>

                {this.state.devices.map((device, key) =>
                    <Device 
                        device={device} 
                        onDeleteDevice={deleteHandlers[key]} 
                        onRekeyDevice={rekeyHandlers[key]} />
                )}
            </div>
        )
    }
}

export default Dashboard