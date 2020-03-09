/**
 * @author Wellington R. Alves
 * 
 * Sistema desenvolvido para colocar em pratica conhecimentos em javascript
 * eu utilizo a axios(lib) para fazer uma requisição na api dá randomDog
 */

const MY_IMAGES = JSON.parse(localStorage.getItem("__animals_photos_br")) || [];
const GALERY_IMAGES = document.querySelector("#galery");


function loadAllImages(image_url, element_galery) {
    image_url.forEach(image => {
        let divGalery = document.createElement("div");
        let div = document.createElement("div");
        let img = document.createElement("img");
        let span = document.createElement("span");
        let text = document.createTextNode(image);

        div.setAttribute("class", "col-lg-3");
        divGalery.setAttribute("class", "galeryImageList");
        img.setAttribute("src", image);

        element_galery.appendChild(div);
        div.appendChild(divGalery);
        divGalery.appendChild(img);
        divGalery.appendChild(span);
        span.appendChild(text);

        img.onclick = function() {
            let item = this.getAttribute("src");
            deleteImage(item);
        }

    })
}

function saveStorage(array_item) {
    localStorage.setItem("__animals_photos_br", JSON.stringify(array_item));
}

function deleteImage(img_url) {
    MY_IMAGES.splice(MY_IMAGES.indexOf(img_url), 1);
    saveStorage(MY_IMAGES);
    GALERY_IMAGES.innerHTML = "";
    loadAllImages(MY_IMAGES, GALERY_IMAGES);
}

window.onload = loadAllImages(MY_IMAGES, GALERY_IMAGES);
