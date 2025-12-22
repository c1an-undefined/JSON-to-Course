

const jsonInput = document.getElementById("json-input")
const fileLoadBtn = document.getElementById("file-load-btn")
const errorMsg = document.getElementById("error-msg")
const courseDiv = document.getElementById("course")
const courseTitle = document.getElementById("course-title")
const chaptersEl = document.getElementById("chapters")

fileLoadBtn.addEventListener("click", () => {
    const file = jsonInput.files[0]

    if (!file) {
        errorMsg.textContent = "No file attached"
        return
    }

    const reader = new FileReader()

    reader.onload = () => {
        try {
            const json = JSON.parse(reader.result)
            localStorage.setItem("course", JSON.stringify(json))
            errorMsg.textContent = ""
            loadCourse()
        } catch (err) {
            console.error(err)
            errorMsg.textContent = "Invalid JSON file"
        }
    }

    reader.readAsText(file)
})

function loadCourse() {
    const raw = localStorage.getItem("course")
    if (!raw) return   

    courseTitle.innerHTML = ""
    chaptersEl.innerHTML = ""

    const data = JSON.parse(raw)
    courseTitle.textContent = data.name
    for (const chapter of data.chapters || []) {
        const chapterDiv = document.createElement("div")
        const chapterName = document.createElement("h4")
        const chapterList = document.createElement("ul")

        chapterName.textContent = `${chapter["name"]}`

        for (const lesson of chapter["lessons"] || []) {
            if (lesson && typeof lesson === "object" && lesson.title) {
                const lessonLink = document.createElement("li")
                lessonLink.textContent = lesson.title
                chapterList.appendChild(lessonLink)
            }
        }

        chapterDiv.appendChild(chapterName)
        chapterDiv.appendChild(chapterList)
        chaptersEl.appendChild(chapterDiv)
    }
}

loadCourse()