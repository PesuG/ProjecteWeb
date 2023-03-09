const carrusel = document.querySelector(".carrusel");
firstImg = carrusel.querySelectorAll("img")[0];
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    let scrollWidth = carrusel.scrollWidth - carrusel.clientWidth;
    arrowIcons[0].style.display = carrusel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carrusel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 45;
        carrusel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
    })
});

const autoSlide = () => {
    if (carrusel.scrollLeft == (carrusel.scrollWidth - carrusel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 45;
    let valDifference = firstImgWidth - positionDiff;

    if (carrusel.scrollLeft > prevScrollLeft) {
        return carrusel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    } else {
        carrusel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
}

const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carrusel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    carrusel.classList.add("dragging");
    isDragging = true;
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrusel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carrusel.classList.remove("dragging");

    if (!isDragging) return;
    isDragging = false;
    autoSlide();
}

carrusel.addEventListener("mousedown", dragStart);
carrusel.addEventListener("touchstart", dragStart);

carrusel.addEventListener("mousemove", dragging);
carrusel.addEventListener("touchmove", dragging);

carrusel.addEventListener("mouseup", dragStop);

carrusel.addEventListener("mouseleave", dragStop);
carrusel.addEventListener("touchend", dragStop);