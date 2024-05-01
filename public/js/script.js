document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[input-form]").forEach((element) => {

        const app = document.querySelector("#app")

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

    const modalHandler = (open, close, modal) => {
        const openElement = document.querySelector(open)
        const closeElement = document.querySelector(close)
        const modalElement = document.querySelector(modal)

        if (!openElement || !closeElement || !modalElement) {
            console.log("um ou mais elementos não foram encontrados ou ainda não foram carregados")
            return
        }

        openElement.addEventListener("click", (evt) => {
            evt.preventDefault()
            modalElement.showModal()
            app.classList.add("background-blur")
        })

        closeElement.addEventListener("click", (evt) => {
            evt.preventDefault()
            modalElement.close()
            app.classList.remove("background-blur")
        })
    }

    modalHandler("#insert-button", "#insert-book-dialog-cancel", "#insert-book-dialog")
    modalHandler("#delete-button", "#delete-book-dialog-cancel", "#delete-book-dialog")
    modalHandler("#edit-button", "#edit-book-dialog-cancel", "#edit-book-dialog")

})