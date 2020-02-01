// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.



// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {

    const sendToBackend = (event, arg) => {
        if (window.ipcRenderer) window.ipcRenderer.send(event, arg)
        else console.error("Dropping message", event, arg)
    }

    const registerHandlerFor = (event, func) => {
        if (window.ipcRenderer) window.ipcRenderer.on(event, func)
        else console.error("Unable to register event handler for", event)
    }

    registerHandlerFor('pong', (event, arg) => {
        console.log('Got Pong:', arg)
    })

    sendToBackend('ping', 'hello')


    const renderDeasmTable = () => {
        const template = document.querySelector("#deasm-table-row-template")
        var clone = template.content.cloneNode(true)
        var tr = clone.querySelector("tr")
        var td = tr.querySelectorAll("td")
        console.log(tr)
        td[0].textContent = "address"
        td[1].textContent = "value"
        td[2].textContent = "label"
        td[3].textContent = "converted"
        td[4].textContent = "address"

        const tbody = document.querySelector(".deasm-table-tbody")
        tbody.appendChild(clone)
    }

    renderDeasmTable()

})
