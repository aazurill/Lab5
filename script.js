// script.js
/* eslint-disable */

const img = new Image(); // used to load image from <input> and draw to canvas

const imageUpload = document.getElementById('image-input');

// Grabbing all the buttons
const clear = document.querySelector('button[type=reset]');
const readText = document.querySelector('button[type=button]');
const voices = document.getElementById('voice-selection');
const generate = document.querySelector('button[type=submit');

const canvas = document.getElementById('user-image');
// Listens for file upload
imageUpload.addEventListener('change', () => {
  let file = document.querySelector('input[type=file]').files[0];
  let objURL = URL.createObjectURL(file);
  img.src = objURL;
 });

// Listens for generate meme -> then takes top and bottom text and puts it on to the picture
generate.addEventListener('click', (event) => {
  event.preventDefault();
  let topText = document.getElementById('text-top').value;
  let botText = document.getElementById('text-bottom').value;


  // Drawing the text onto the canvas
  let ctx = canvas.getContext('2d');
  ctx.font = "30px Arial";
  ctx.fillStyle="#ffffff";
  ctx.textAlign= 'center';
  ctx.fillText(topText, 200, 50);
  ctx.fillText(botText, 200, 350);

  //Toggle the clear and read text buttons
  clear.disabled = false;
  readText.disabled = false;
});
// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  clear.disabled = true;
  readText.disabled = true;
  voices.disabled = true;
  // TODO
  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  let ctx = canvas.getContext('2d');
  ctx.fillStyle='black';
  ctx.fillRect(0, 0, 400, 400);

  let dimObj = getDimmensions(400, 400, img.width, img.height);
  let locx = dimObj['startX'];
  let locy = dimObj['startY'];
  let iwidth = dimObj['width'];
  let iheight = dimObj['height'];
  ctx.drawImage(img, locx, locy, iwidth, iheight);

  // - Clear the form when a new image is selected
  document.getElementById('text-top').value = '';
  document.getElementById('text-bottom').value = '';
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
});

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions(canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatio, height, width, startX, startY;

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatio = imageWidth / imageHeight;

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatio < 1) {
    // Height is the max possible given the canvas
    height = canvasHeight;
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatio;
    // Start the Y at the top since it's max height, but center the width
    startY = 0;
    startX = (canvasWidth - width) / 2;
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth;
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatio;
    // Start the X at the very left since it's max width, but center the height
    startX = 0;
    startY = (canvasHeight - height) / 2;
  }

  return { 'width': width, 'height': height, 'startX': startX, 'startY': startY }
}
