document.addEventListener('DOMContentLoaded', appStart)

let canvas
let ctx
function appStart () {
  canvas = document.querySelector('#canvas')
  document
    .querySelector('#btnDarken')
    .addEventListener('click', () => darkenFilter())
  document
    .querySelector('#btnContrast')
    .addEventListener('click', () => contrastFilter())
document
    .querySelector('#btnLighten')
    .addEventListener('click', () => lightenFilter())

  ctx = canvas.getContext('2d');
    resize();

    function el(id){return document.getElementById(id);} // Get elem by ID

    var canvas  = el("canvas");
    var context = canvas.getContext("2d");
    
    function readImage() {
        if ( this.files && this.files[0] ) {
            var FR= new FileReader();
            FR.onload = function(e) {
               var img = new Image();
               img.addEventListener("load", function() {
                 context.drawImage(img, 0, 0);
               });
               img.src = e.target.result;
            };       
            FR.readAsDataURL( this.files[0] );
        }
    }
    
    el("fileUpload").addEventListener("change", readImage, false);
}

function darkenFilter (amount = 30) {
  const canvasData = ctx.getImageData(0, 0, 1920, 1080)
  for (let i = 0; i < canvasData.data.length; i += 4) {
    // R
    canvasData.data[i] -= amount
    // G
    canvasData.data[i + 1] -= amount
    // B
    canvasData.data[i + 2] -= amount
  }
  ctx.putImageData(canvasData, 0, 0)
}

function lightenFilter (amount = 30) {
  const canvasData = ctx.getImageData(0, 0, 1920, 1080)
  for (let i = 0; i < canvasData.data.length; i += 4) {
    // R
    canvasData.data[i-1] -= amount
    // G
    canvasData.data[i - 1] -= amount
    // B
    canvasData.data[i - 2] -= amount
  }
  ctx.putImageData(canvasData, 0, 0)
}

function contrastFilter (amount = 7) {
  const canvasData = ctx.getImageData(0, 0, 1920, 1080)
  for (let i = 0; i < canvasData.data.length; i += 4) {
    const r = canvasData.data[i]
    const g = canvasData.data[i + 1]
    const b = canvasData.data[i + 2]

    const avg = (r + g + b) / 3
    if (avg <= 127) {
      amount = -amount
    }
    canvasData.data[i] += amount
    canvasData.data[i + 1] += amount
    canvasData.data[i + 2] += amount
  }
  ctx.putImageData(canvasData, 0, 0)
}

function drawImage (img, x, y) {
  ctx.drawImage(img, x, y)
}

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);
var pos = { x: 0, y: 0 };

// new position from mouse events
function setPosition(e) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}
function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function draw(e) {
  if (e.buttons !== 1) return; // if wcisniety lpm

  var color = document.getElementById("hex").value;

  ctx.beginPath(); // rozpoczecie 

  ctx.lineWidth = 20; 
  ctx.lineCap = "round";
  ctx.strokeStyle = color; // hex kolor

  ctx.moveTo(pos.x, pos.y); // z pozycji
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // na pozycje

  ctx.stroke(); // rysuje
}