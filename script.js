const fileInput = document.querySelector(".file-input");
const container = document.querySelector(".container");
const choseImgBtn = document.querySelector(".chose-img");
const previewImg = document.querySelector(".previews-img img");
const filterOptions = document.querySelectorAll(".filter button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const loadImage = ()=>{
    let file = fileInput.files[0]; // get user select file
    if (!file) return; // if file not select
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{
        container.classList.remove("disable");
    })
}

const updateFilter = ()=>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");
    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    } else if (selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    } else if (selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilters();
}

const applyFilters = ()=>{
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

fileInput.addEventListener("change", loadImage);
choseImgBtn.addEventListener("click", ()=> fileInput.click());
filterSlider.addEventListener("input", updateFilter)

filterOptions.forEach(option => { // add clcik event to eact button of filter, and add class "active"
    option.addEventListener("click", ()=>{
        document.querySelector(".filter .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;
        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if (option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        } else if (option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
})