let pickColor = document.getElementById("pick-color");
let error = document.getElementById("error");
let fileInput = document.getElementById("file");
let image = document.getElementById("image");
let hexValRef = document.getElementById("hex-val-ref");
let rgbValRef = document.getElementById("rgb-val-ref");
let customAlert = document.getElementById("custom-alert");
let pickedColorRef = document.getElementById("picked-color-ref");

window.onload = () => {
  if (!("HTMLInputElement" in window && typeof HTMLInputElement.prototype.type === 'string' && "color" in HTMLInputElement.prototype)) {
    error.classList.remove("hide");
    error.innerText = "Your browser doesn't support ColorPicker API";
    pickColor.classList.add("hide");
    return false;
  }
};

const colorSelector = () => {
  let colorValue = pickColor.value;
  error.classList.add("hide");
  let hexValue = colorValue;
  let rgbArr = hexToRgb(hexValue);
  let rgbValue = "rgb(" + rgbArr.join(",") + ")";
  result.style.display = "grid";
  hexValRef.value = hexValue;
  rgbValRef.value = rgbValue;
  pickedColorRef.style.backgroundColor = hexValue;
};

pickColor.addEventListener("input", colorSelector);

fileInput.onchange = () => {
  result.style.display = "none";
  let reader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);
  reader.onload = () => {
    image.setAttribute("src", reader.result);
  };
};

let copy = (textId) => {
  document.getElementById(textId).select();
  document.execCommand("copy");
  customAlert.style.transform = "scale(1)";
  setTimeout(() => {
    customAlert.style.transform = "scale(0)";
  }, 2000);
};

// Helper function to convert hex color to RGB array
function hexToRgb(hex) {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return [r, g, b];
}
