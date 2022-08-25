const urlParams = new URLSearchParams(window.location.pathname);

const modelKit = urlParams.toString()

let currentId = modelKit.split("%2F")[2]

const myModal = new bootstrap.Modal(
    document.getElementById(`deleteModal-${currentId}`), {})

myModal.show()