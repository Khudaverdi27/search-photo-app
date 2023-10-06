
let imageWrapper = document.querySelector(".imageWrapper")
let formWrapper = document.querySelector(".formWrapper")
let inputSearch = document.querySelector(".inputSearch")
let btnReset = document.querySelector(".btnReset")
let btnSubmit = document.querySelector(".btnSubmit")
let searchIcon = document.querySelector(".fa-magnifying-glass")

runEventListener()

function runEventListener() {
    formWrapper.addEventListener("submit", submitSearch)
    searchIcon.addEventListener("click", submitSearch)
    btnReset.addEventListener("click", clearSearch)
    btnSubmit.addEventListener("click", SearchImage)
    searchIcon.addEventListener("click", SearchImage)
}
//send search values to API
function submitSearch(e) {
    let value = inputSearch.value.trim()
    getData(value);
    e.preventDefault()
}

//clear current search
function clearSearch() {
    inputSearch.value = ""
    Array.from(imageWrapper.children).forEach((child) => {
        child.remove()
    });
}
//clear current search and add new search
function SearchImage() {
    Array.from(imageWrapper.children).forEach((child) => {
        child.remove()
    });
}
async function getData(data) {

    try {
        let api = await (fetch(`https://api.unsplash.com/search/photos?query=${data}`, {
            method: "GET",
            headers: {
                Authorization: "Client-ID B1git8vkm0euthpuUNHe7YJ91om8Xzwtvh7h_IK8hNA"
            }
        })
        )
        if (api.ok) {
            let response = await api.json();
            renderApi(response);
        } else {
            console.log("HTTP Error: " + api.status);
        }

    } catch (error) {
        console.error("Error:", error);
    }

}
//send images to function
function renderApi(images) {
    Array.from(images.results).forEach((img) => {
        exportImagesHtml(img.urls.small);
    })
}
//send images to HTML
function exportImagesHtml(pictures) {
    let div = document.createElement('div');
    div.classList.add("imgs")
    let img = document.createElement('img');
    img.setAttribute('src', pictures)
    img.width = "250",
        img.height = "230"
    div.appendChild(img)
    imageWrapper.appendChild(div)

}