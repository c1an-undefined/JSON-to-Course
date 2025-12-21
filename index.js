

const jsonInput = document.getElementById("json-input")
const fileLoadBtn = document.getElementById("file-load-btn")
const errorMsg = document.getElementById("error-msg")
const courseDiv = document.getElementById("course")

fileLoadBtn.addEventListener("click", () => {
    const file = jsonInput.files[0]

    if (!file) {
        errorMsg.innerHTML = "No file attached"
        return
    }

    const reader = new FileReader()

    reader.onload = () => {
        try {
            const json = JSON.parse(reader.result)
            localStorage.setItem("course", JSON.stringify(json))
            errorMsg.innerHTML = ""
            loadCourse()
        } catch {
            errorMsg.innerHTML = "Invalid JSON file"
        }
    }

    reader.readAsText(file)
})

function loadCourse() {
    const raw = localStorage.getItem("course")
    if (!raw) return   

    courseDiv.children[0].innerHTML = ""
    courseDiv.children[1].innerHTML = ""

    const data = JSON.parse(raw)
    courseDiv.children[0].innerHTML = data.name
    for (let i = 1; i < Object.keys(data["chapters"]).length + 1; i++) {
        let chapterDiv = document.createElement("div")
        let chapterName = document.createElement("h4")
        let chapterList = document.createElement("ul")

        let currentChapter = data["chapters"][`Chapter ${i}`]

        chapterName.innerHTML = `${currentChapter["name"]}`

        for (const [key, lesson] of Object.entries(currentChapter["lessons"] || {})) {
            if (lesson && typeof lesson === "object" && lesson.title) {
                const lessonLink = document.createElement("li")
                lessonLink.textContent = lesson.title
                chapterList.appendChild(lessonLink)
            }
        }

        chapterDiv.appendChild(chapterName)
        chapterDiv.appendChild(chapterList)
        courseDiv.children[1].appendChild(chapterDiv)
    }
}

loadCourse()