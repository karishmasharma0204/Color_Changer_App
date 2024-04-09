const mainImageContainer = document.createElement("div");
mainImageContainer.id = "mainImageContainer";
mainImageContainer.style.display = "inline-flex";
mainImageContainer.style.flexWrap = "wrap";
mainImageContainer.style.width = "480px";
mainImageContainer.style.marginTop = "10px";
mainImageContainer.style.borderRadius = "10px";

const thumbnailContainer = document.createElement("div");
thumbnailContainer.id = "thumbnailContainer";
thumbnailContainer.style.display = "flex";
thumbnailContainer.style.flexWrap = "wrap";
thumbnailContainer.style.width = "480px";
thumbnailContainer.style.marginTop = "10px";
thumbnailContainer.style.borderRadius = "10px";

const buttons = document.createElement("div");
buttons.id = "buttons";

document.body.appendChild(mainImageContainer);
document.body.appendChild(thumbnailContainer);
document.body.appendChild(buttons);

//Function to create the buttons

function createButtons() {
    var buttonsDiv = document.getElementById("buttons");
    var buttonContainer = document.createElement("div");
    buttonContainer.id = "buttonContainer";

    var allButton = document.createElement("button");
    allButton.id = "allButton";
    allButton.textContent = "All";
    allButton.style.backgroundColor = "rgba(216, 191, 216)";

    var redButton = document.createElement("button");
    redButton.id = "redButton";
    redButton.textContent = "Red";
    redButton.style.backgroundColor = "rgba(255, 0, 0)";

    var greenButton = document.createElement("button");
    greenButton.id = "greenButton";
    greenButton.textContent = "Green";
    greenButton.style.backgroundColor = "green";

    var blueButton = document.createElement("button");
    blueButton.id = "blueButton";
    blueButton.textContent = "Blue";
    blueButton.style.backgroundColor = "rgba(173, 216, 230)";

    buttonContainer.appendChild(allButton);
    buttonContainer.appendChild(redButton);
    buttonContainer.appendChild(greenButton);
    buttonContainer.appendChild(blueButton);

    buttonsDiv.appendChild(buttonContainer);
}

//Function to create dropdown

function createSelect() {
    var selectDiv = document.getElementById("buttons");
    var selectLabel = document.createElement("label");
    selectLabel.setAttribute("class", "colorSelect");
    selectLabel.textContent = "Select Color:";

    var select = document.createElement("select");
    select.id = "colorSelect";

    var options = ["All", "Red", "Green", "Blue"];
    options.forEach(function (optionText) {
        var option = document.createElement("option");
        option.value = optionText.toLowerCase();
        option.textContent = optionText;
        select.appendChild(option);
    });

    selectDiv.appendChild(selectLabel);
    selectDiv.appendChild(select);
}

createButtons();
createSelect();

const imagesData = [
    { src: "blue_1.jpeg", alt: "Thumbnail 1", color: "blue" },
    { src: "blue_2.jpg", alt: "Thumbnail 1.1", color: "blue" },
    { src: "blue_3.png", alt: "Thumbnail 1.2", color: "blue" },
    { src: "blue_4.jpg", alt: "Thumbnail 1.3", color: "blue" },
    { src: "blue_5.jpg", alt: "Thumbnail 1.4", color: "blue" },
    { src: "red_1.png", alt: "Thumbnail 2", color: "red" },
    { src: "red_2.png", alt: "Thumbnail 2.1", color: "red" },
    { src: "red_3.png", alt: "Thumbnail 2.2", color: "red" },
    { src: "green_1.png", alt: "Thumbnail 3", color: "green" },
    { src: "green_2.jpg", alt: "Thumbnail 3.1", color: "green" },
    { src: "green_3.jpg", alt: "Thumbnail 3.2", color: "green" },
    { src: "green_4.jpg", alt: "Thumbnail 3.3", color: "green" }
];

const styleElement = document.createElement("style");
styleElement.innerHTML = `
.thumbnail {
width: 100px;
height:100px;
margin: 10px;
cursor: pointer;
}

.thumbnail, .thumbnail:hover {
cursor: pointer;
}

#buttonContainer { 
display: inline-flex;
flex-wrap: wrap;
width: 500px;
margin-top: 10px;
margin-left: 20px;
position: absolute;
top: 1.5rem;
left: 720px;
}
#buttons{
margin-top: 20px;
position: absolute;
top: 5rem;
}

button:hover {
cursor: pointer;
}

button {
margin-right: 5px;
width: 50px;
height: 50px;
border-radius:20px;
font-size: 14px;
}

#colorSelect{
width: 100px;
height: 50px;
border: 1px solid black !important;
border-radius:10px;
background-color:rgba(216, 191, 216) !important;
font-size: 24px;
display: flex;
flex-wrap: wrap;
width: 200px;
margin-top: 20px;
position: absolute;
top: 5rem;
left: 800px;
}
.colorSelect{
font-family: "Helvetica Neue",Helvetica,Arial;
font-size: 25px;
position: absolute;
top: 6rem;
left: 700px;
}

.image-container {
position: relative;
display: inline-block;
}

.image-number {
position: absolute;
bottom: 85px;
left:5px;
padding: 2px 5px;
border-radius: 1px;
}

`;
document.head.appendChild(styleElement);

function createImageElement(imageData, index, totalCount, colorCounts) {
    const imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");

    const img = document.createElement("img");
    img.src = imageData.src;
    img.alt = imageData.alt;
    img.style.borderRadius = "10px";
    img.classList.add("thumbnail");
    img.setAttribute("data-color", imageData.color);

    colorCounts[imageData.color]++;

    const imageNumber = `${colorCounts[imageData.color]}/${totalCount} - ${imageData.color.toUpperCase()}`;

    const imageNumberSpan = document.createElement("span");
    imageNumberSpan.textContent = imageNumber;
    imageNumberSpan.classList.add("image-number");
    imgContainer.appendChild(img);
    imgContainer.appendChild(imageNumberSpan);

    img.addEventListener("click", function () {
        setMainImage(imageData.src, imageNumber);
    });

    return imgContainer;
}

function displayImages(color) {
    const thumbnailContainer = document.getElementById("thumbnailContainer");
    thumbnailContainer.innerHTML = "";

    let filteredImages;
    if (color === "all") {
        filteredImages = imagesData;
    } else {
        filteredImages = imagesData.filter(imageData => imageData.color === color);
    }

    let colorCounts = { red: 0, green: 0, blue: 0 };

    filteredImages.forEach((imageData, index) => {
        const totalCount = filteredImages.filter(img => img.color === imageData.color).length;
        const img = createImageElement(imageData, index, totalCount, colorCounts);
        thumbnailContainer.appendChild(img);
    });

    if (filteredImages.length > 0) {
        setMainImage(filteredImages[0].src, filteredImages[0].text);
    }
}

function setMainImage(src, text) {
    const mainImageContainer = document.getElementById("mainImageContainer");
    mainImageContainer.innerHTML = "";

    const mainText = document.createElement("button");
    mainText.textContent = text;
    mainText.style.position = "absolute";
    mainText.style.bottom = "550px";
    mainText.style.left = "10px";
    mainText.style.width = "200px";
    mainText.style.backgroundColor = "transparent";
    mainText.style.color = "white";
    mainText.style.fontFamily = "Arial, sans-serif";
    mainText.style.fontSize = "30px";
    mainText.style.zIndex = "1";
    mainText.style.border = "none";

    mainImageContainer.appendChild(mainText);

    const mainImg = document.createElement("img");
    mainImg.src = src;
    mainImg.alt = "Main Image";
    mainImg.style.width = "470px";
    mainImg.style.height = "250px";
    mainImg.style.objectFit = "cover";
    mainImg.style.borderRadius = "10px";
    mainImg.style.position = "relative";

    mainImageContainer.appendChild(mainImg);
}

document.getElementById("allButton").addEventListener("click", function () {
    displayImages("all");
});

document.getElementById("redButton").addEventListener("click", function () {
    displayImages("red");
});

document.getElementById("greenButton").addEventListener("click", function () {
    displayImages("green");
});

document.getElementById("blueButton").addEventListener("click", function () {
    displayImages("blue");
});

document.getElementById("colorSelect").addEventListener("change", function () {
    const selectedColor = this.value;
    displayImages(selectedColor);
});

displayImages("all");
