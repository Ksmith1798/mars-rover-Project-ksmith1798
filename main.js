const baseUrl = 'https://mars-photos.herokuapp.com/';
const perseveranceLandingDate = '2021-02-18'; // Perseverance rover's landing date
let currentImageIndex = 0;
let images = [];

document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('datePicker');
    const today = new Date().toISOString().split('T')[0];
    datePicker.max = today;
    datePicker.min = perseveranceLandingDate;
});

function fetchImages() {
    const date = document.getElementById('datePicker').value;
    if (!date) return;

    fetch(`${baseUrl}api/v1/rovers/Perseverance/photos?earth_date=${date}`)
        .then(response => response.json())
        .then(data => {
            images = data.photos;
            currentImageIndex = 0;
            displayImage();
        })
        .catch(error => console.error('Error:', error));
}

function displayImage() {
    const imageContainer = document.getElementById('roverImage');
    if (images.length > 0) {
        imageContainer.src = images[currentImageIndex].img_src;
        imageContainer.alt = `Mars Rover Image ${currentImageIndex + 1} of ${images.length}`;
    } else {
        imageContainer.src = '';
        imageContainer.alt = 'No images available for this date';
    }
}

function navigateImages(direction) {
    if (images.length === 0) return;

    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    displayImage();
}
