document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[input-form]").forEach((element) => {

        const toggleInputEmptyClass = () => {
            if (element.value != "") {
                element.classList.remove("input-empty")
            } else {
                element.classList.add("input-empty")
            }
        }
        toggleInputEmptyClass()

        element.addEventListener("blur", toggleInputEmptyClass)

    })

    document.querySelector("#edit-button").addEventListener("click", (evt) => {
        evt.preventDefault()
        document.querySelector("#editbook-dialog").showModal();
        document.querySelector("#app").classList.add("background-blur")
    })

    document.querySelector("#editbook-dialog-cancel").addEventListener("click", (evt) => {
        evt.preventDefault()
        document.querySelector("#editbook-dialog").close();
        document.querySelector("#app").classList.remove("background-blur")
    })

    document.querySelector("#delete-button").addEventListener("click", (evt) => {
        evt.preventDefault()
        document.querySelector("#deletebook-dialog").showModal();
        document.querySelector("#app").classList.add("background-blur")
    })

    document.querySelector("#deletebook-dialog-cancel").addEventListener("click", (evt) => {
        evt.preventDefault()
        document.querySelector("#deletebook-dialog").close();
        document.querySelector("#app").classList.remove("background-blur")
    })
})