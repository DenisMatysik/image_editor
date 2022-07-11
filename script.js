const fileInput = document.querySelector(".file-input");
const container = document.querySelector(".container");
const choseImgBtn = document.querySelector(".chose-img");
const previewImg = document.querySelector(".previews-img img");
const filterOptions = document.querySelectorAll(".filter button");

const loadImage = ()=>{
    let file = fileInput.files[0]; // get user select file
    if (!file) return; // if file not select
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{
        container.classList.remove("disable");
    })
}
fileInput.addEventListener("change", loadImage);
choseImgBtn.addEventListener("click", ()=> fileInput.click());

filterOptions.forEach(option => {
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        console.log(option);
    });
})