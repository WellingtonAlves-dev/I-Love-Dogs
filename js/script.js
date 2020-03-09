/**
 * @author Wellington R. Alves
 * 
 * Sistema desenvolvido para colocar em pratica conhecimentos em javascript
 * eu utilizo a axios(lib) para fazer uma requisição na api dá randomDog
 */
const API_URL = "https://random.dog/woof.json";
const IMAGE_ELEMENT = document.querySelector("#image_pic");
const BTNS_CLASS = document.querySelectorAll(".circulo");

const MY_IMAGES = JSON.parse(localStorage.getItem('__animals_photos_br')) || [];

function setImage(urlImage, element) {
    element.setAttribute("src", urlImage);
}

function sharedImage(urlImage) {
    alert(urlImage);
} 

function saveImage(urlImage) {
    MY_IMAGES.push(urlImage);
    saveStorage(MY_IMAGES);
}

async function getApiImage(api_url, IMAGE_ELEMENT) {
    setImage("img/loading.gif", IMAGE_ELEMENT);
    axios.get(api_url)
    .then((response) => {
        let url_image = response.data.url;
        console.log(url_image);
        setImage(url_image, IMAGE_ELEMENT);
    })
    .catch((error) => {
        console.error("Erro: " + error);
    })
}

function saveStorage(array_item) {
    localStorage.setItem("__animals_photos_br", JSON.stringify(array_item));
}
window.onload = getApiImage(API_URL, IMAGE_ELEMENT);

BTNS_CLASS.forEach((button) => {
    button.onclick = function() {
        let todayUrl = IMAGE_ELEMENT.getAttribute('src');

        let buttonOption = this.getAttribute("name");
        
        switch (buttonOption) {
            case 'dontlike':
                getApiImage(API_URL, IMAGE_ELEMENT);
                //
                break;
        
            case 'like':
                saveImage(todayUrl);
                getApiImage(API_URL, IMAGE_ELEMENT);
                break;
            case 'shared':
                sharedImage(todayUrl);

            default:
                break;
        }
        
    }
})