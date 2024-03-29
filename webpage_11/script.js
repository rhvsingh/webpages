const imageInput = document.getElementById("image")
const imageShow = document.getElementById("image-show")
const imageModal = document.getElementById("image-modal")
const imageModalOverlay = document.getElementById("image-modal-overlay")
const imageModalShow = document.getElementById("image-modal-show")
const imageRadio = document.getElementsByClassName("modal-radio")
const imageUseButton = document.getElementById("image-use-button")

const imageName = [
    "user_image_frame_1.png",
    "user_image_frame_2.png",
    "user_image_frame_3.png",
    "user_image_frame_4.png",
]

const imageId = ["image-heart", "image-square", "image-circle", "image-rectangle"]

const canvas = document.getElementById("mycanvas")
const context = canvas.getContext("2d")

let selectedMask = -1
let imageLoaded

function modalClose() {
    imageModal.style.visibility = "hidden"
    imageModal.style.opacity = 0
    setTimeout(() => {
        imageModal.style.display = "none"
    }, 300)
}

function modalOpen() {
    imageModal.style.display = "flex"
    setTimeout(() => {
        imageModal.style.visibility = "visible"
        imageModal.style.opacity = 1
    }, 300)
}

imageModalOverlay.onclick = () => {
    modalClose()
}

function imageModalPreviewSetter(index) {
    let imageModalPreview = document.getElementById("mycanvas")
    if (index === -1) {
        imageModalPreview.style.webkitMaskImage = "none"
        imageModalPreview.style.maskImage = "none"
        return
    }
    let imagePath = `asset/${imageName[index]}`
    imageModalPreview.style.webkitMaskImage = `url('${imagePath}')`
    imageModalPreview.style.maskImage = `url('${imagePath}')`
    //context.globalCompositeOperation = 'destination-in';
}

function effectSelector(id, i) {
    selectedMask = i
    switch (id) {
        case "modal-image-heart":
            imageModalPreviewSetter(0)
            break
        case "modal-image-square":
            imageModalPreviewSetter(1)
            break
        case "modal-image-circle":
            imageModalPreviewSetter(2)
            break
        case "modal-image-rectangle":
            imageModalPreviewSetter(3)
            break
        default:
            imageModalPreviewSetter(-1)
            break
    }
}

for (let i = 0; i < imageRadio.length; i++) {
    imageRadio[i].onclick = (e) => {
        effectSelector(e.target.id, i)
    }
}

function cropImage(imagePath) {
    let image = new Image()
    image.src = imagePath
    image.onload = function () {
        imageLoaded = image
        canvas.width = image.width
        canvas.height = image.height
        //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        context.drawImage(image, 0, 0, image.width, image.height)
    }
}

imageInput.onchange = (e) => {
    let fileReader = new FileReader()
    //context.drawImage(inMemoryCanvasElementReference, 0, 0);
    fileReader.addEventListener(
        "load",
        () => {
            modalOpen()
            //let imageHTML = `<img src="${fileReader.result}" id="image-modal-preview" alt="Image Changer">`
            cropImage(fileReader.result)
        },
        false
    )

    if (e.target.files[0]) {
        fileReader.readAsDataURL(e.target.files[0])
    }
}

imageUseButton.onclick = function () {
    let index
    let imagePath

    let canvasWidth = imageModalShow.offsetWidth
    let canvasHeight = imageModalShow.offsetHeight
    for (let i = 0; i < imageRadio.length; i++) {
        if (imageRadio[i].checked) {
            index = i
            imageRadio[i].checked = false
            break
        }
    }

    context.clearRect(0, 0, imageLoaded.width, imageLoaded.height)

    if (selectedMask != -1) {
        let img = new Image()
        img.src = document.getElementById(imageId[selectedMask - 1]).src
        img.setAttribute("width", imageLoaded.width)
        img.setAttribute("height", imageLoaded.height)

        img.onload = function () {
            context.drawImage(img, 0, 0, imageLoaded.width, imageLoaded.height)
            context.globalCompositeOperation = "source-in"
            context.drawImage(imageLoaded, 0, 0, imageLoaded.width, imageLoaded.height)
        }
    }

    if (index) {
        imagePath = `-webkit-mask-image: url('asset/${imageName[index - 1]}');`
    } else {
        imagePath = `-webkit-mask-image: none;`
    }
    let imageHTML = `<img src="${canvas.toDataURL()}"  alt="Image Changer">`
    imageShow.innerHTML = imageHTML

    modalClose()

    context.clearRect(0, 0, canvasWidth, canvasHeight)
    canvas.style.webkitMaskImage = "none"
    canvas.style.maskImage = "none"
    imageInput.type = "text"
    imageInput.type = "file"
    selectedMask = -1
}
