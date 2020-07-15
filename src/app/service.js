class WireguardAPI {
    async userInfo() {
        return fetch("/api/me", {
            method: 'GET',
            withCredentials: true
        })
        .then(response => {
            localStorage.setItem("csrfToken", response.headers.get("X-CSRF-Token"))
            return response
        })
        .then(response => response.json())
    }

    async devices() {
        return fetch("/api/devices", {
            method: 'GET',
            withCredentials: true
        })
        .then(response => response.json())
        .then(devices => devices.sort((first, second) => first.ID - second.ID))
    }

    async newDevice(deviceInfo) {
        return fetch('/api/devices', {
            method: "POST",
            withCredentials: true,
            headers: {
                "X-CSRF-Token": localStorage.getItem("csrfToken"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(deviceInfo)
        })
        .then(response => response.text())

    }

    async rekeyDevice(deviceID) {
        return fetch('/api/devices/' + deviceID, {
            method: "POST",
            withCredentials: true,
            headers: {
                "X-CSRF-Token": localStorage.getItem("csrfToken"),
                "Content-Type": "application/json"
            }
        })
        .then(response => response.text())
    }

    async deleteDevice(deviceID) {
        return fetch('/api/devices/' + deviceID, {
            method: "DELETE",
            withCredentials: true,
            headers: {
                "X-CSRF-Token": localStorage.getItem("csrfToken"),
            }
        })
    }
}

export default WireguardAPI