const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imageLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API

const count = 30;
const apiKey = "Y917yBOkjyqJYxtWHrYDqIHWjBlCv_2mMRq2wXKYtfc";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imagesLoaded() {
  imageLoaded++;
  if (imageLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links e photos, add to DOM
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // create <a> to link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imagesLoaded);
    // Put <img> indide <a>, then both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos();
    ready = false;
  }
});

// On load
getPhotos();
