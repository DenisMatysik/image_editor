const fileInput = document.querySelector(".file-input");
const container = document.querySelector(".container");
const choseImgBtn = document.querySelector(".chose-img");
const previewImg = document.querySelector(".previews-img img");
const filterOptions = document.querySelectorAll(".filter button");
const rotateOptions = document.querySelectorAll(".rotate button");
const filterName = document.querySelector(".filter-info .name");
const filterValue = document.querySelector(".filter-info .value");
const filterSlider = document.querySelector(".slider input");
const resetBtn = document.querySelector(".reset-filters");
const saveImgBtn = document.querySelector(".save-img");
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipUp = 1, flipDown = 1;

const loadImage = ()=>{
    let file = fileInput.files[0]; // get user select file
    if (!file) return; // if file not select
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", ()=>{
    resetBtn.click(); // clean all filters when you pick new image
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
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipUp}, ${flipDown})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const resetFilter = ()=>{
    brightness = 100;
    saturation = 100;
    inversion = 0;
    grayscale = 0;
    rotate = 0;
    flipUp = 1;
    flipDown = 1;
    filterOptions[0].click();
    applyFilters();
}

const saveImg = ()=>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth; // set canvas width to actual image width
    canvas.height = previewImg.naturalHeight; // set canvas height to actual image height
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`; // aply filter settings
    ctx.translate(canvas.width/2, canvas.height/2); // canvas from center
    if (rotate !== 0){
        ctx.rotate(rotate*Math.PI/180);
    }
    ctx.scale(flipUp, flipDown); // flip canvas up/down
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height); // drawImage(image to draw, dx,dy,dWidth, dHeigth)
    const link = document.createElement("a");
    link.download = "image.jpg"; // passing <a> tag download value to "image.pg"
    link.href = canvas.toDataURL(); // passing <a> tag href value to canvas data url
    link.click(); // clicking <a> tag so the img download
}

fileInput.addEventListener("change", loadImage);
choseImgBtn.addEventListener("click", ()=> fileInput.click());
filterSlider.addEventListener("input", updateFilter);
resetBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImg)

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

rotateOptions.forEach(option => {
    option.addEventListener("click", ()=>{
        if(option.id === "left"){
            rotate -=90;
        } else if(option.id === "right"){
            rotate +=90;
        } if(option.id === "up"){
            flipUp = flipUp === 1 ? -1 :1;
        } else {
            flipDown = flipDown === 1 ? -1 :1;
        }
        applyFilters();
    })
})