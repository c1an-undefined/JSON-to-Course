

const jsonInput = document.getElementById("json-input")
const fileLoadBtn = document.getElementById("file-load-btn")
const errorMsg = document.getElementById("error-msg")

fileLoadBtn.addEventListener("click", () => {
    if (!jsonInput.files[0]) {
        errorMsg.innerHTML = "No file attached"
        return
    }

    let data = jsonInput.files[0]
    if (data) {
        errorMsg.innerHTML = ""
    }
    else {
        errorMsg.innerHTML = "Incorrect file format"
        return 
    }
})