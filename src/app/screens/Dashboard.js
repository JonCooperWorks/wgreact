import React, { Component } from 'react';
import  Button from 'react-bootstrap/Button';
import FileSaver from 'file-saver';

import { BsPlus } from 'react-icons/bs'

import AddDeviceModal from './components/AddDeviceModal';
import ConfirmRekeyModal from './components/ConfirmRekeyModal'
import ConfirmDeleteModal from './components/ConfirmDeleteModal'
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
            showConfirmRekeyModal: false,
            displayedCredentials: "",
            newDevice: {
                Name: "",
                OS: "macOS" // Default option in the Form.Control
            },
            deviceToDelete: {},
            deviceToRekey: {}
        }
        this.onAlertClosed = this.onAlertClosed.bind(this)
        this.onCredentialsModalClosed = this.onCredentialsModalClosed.bind(this)
        this.onConfigDownload = this.onConfigDownload.bind(this)
        this.onAddDeviceClicked = this.onAddDeviceClicked.bind(this)
        this.onAddDeviceModalClosed = this.onAddDeviceModalClosed.bind(this)
        this.onDeviceAdded = this.onDeviceAdded.bind(this)
        this.onFormSubmitted = this.onFormSubmitted.bind(this)
        this.onFormTextChange = this.onFormTextChange.bind(this)
        this.onDeviceDeleted = this.onDeviceDeleted.bind(this)
        this.onConfirmDeleteModalClosed = this.onConfirmDeleteModalClosed.bind(this)
        this.onConfirmRekeyDevice = this.onConfirmRekeyDevice.bind(this)
        this.onConfirmRekeyModalClosed = this.onConfirmRekeyModalClosed.bind(this)
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
                displayedCredentials: ""
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

            const timer = setTimeout(() => this.setState(
                () => {
                    return {showDeletedAlert: false}
                }
            ), 3000);
            return () => clearTimeout(timer);
            
        })
    }

    onConfirmDeleteModalClosed() {
        this.setState(() => {
            return {
                showConfirmDeleteModal: false,
                deviceToDelete: {}
            }
        })
    }

    onFormSubmitted(event) {
        event.preventDefault()
        this.wireguardAPI.newDevice({
            Name: this.state.newDevice.Name,
            OS: this.state.newDevice.OS
        })
        .then(config => {
            this.onDeviceAdded(config)
        })
    }

    onFormTextChange(fieldName) {
        return (event) => {
            event.persist()
            this.setState((state) => {
                state.newDevice[fieldName] = event.target.value
                return state
            })
        }
    }

    onConfirmRekeyDevice() {
        this.wireguardAPI.rekeyDevice(this.state.deviceToRekey.ID)
        .then(config => {
            this.setState(() => {
                return {
                    showCredentialsModal: true,
                    displayedCredentials: config,
                    showConfirmRekeyModal: false,
                    deviceToRekey: {}
                }
            })
        })
    }

    onConfirmRekeyModalClosed() {
        this.setState(() => {
            return {
                showConfirmRekeyModal: false,
                deviceToRekey: {}
            }
        })
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
            this.setState(() => {
                return {
                    showConfirmRekeyModal: true,
                    deviceToRekey: device
                }
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
                    onFormTextChange={this.onFormTextChange}
                    onFormSubmitted={this.onFormSubmitted} />

                <ConfirmRekeyModal
                    show={this.state.showConfirmRekeyModal}
                    onConfirmed={this.onConfirmRekeyDevice}
                    onClose={this.onConfirmRekeyModalClosed}
                    device={this.state.deviceToRekey} />

                <ConfirmDeleteModal
                    show={this.state.showConfirmDeleteModal}
                    onClose={this.onConfirmDeleteModalClosed}
                    onDeleteDevice={this.onDeviceDeleted}
                    device={this.state.deviceToDelete} />

                <Button 
                    style={{margin: "10px"}}
                    variant="success" 
                    onClick={this.onAddDeviceClicked}>
                        <BsPlus />
                        Add device
                </Button>

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