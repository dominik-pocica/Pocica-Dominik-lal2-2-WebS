const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let img = new Image(); //let - that makes you redefine variable unlike const
let fileName = '';

const downloadButton = document.getElementById('download-btn');
const uploadFile = document.getElementById('upload-file');
const revertBtn = document.getElementById('revert-btn');


// uploadaa file
uploadFile.addEventListener('change', (e) => {
    //get file
    const file = document.getElementById('upload-file').files[0];     //well have an array called files adn we want the firs element which is file
    
    //init filereader
    const reader = new FileReader();
    if(file) {
        //set filename
        fileName = file.name;
        //read data as url
        reader.readAsDataURL(file);
        
    }
    
    //add img to canvas
    reader.addEventListener('load', () => {
        //create img
        img = new Image();
        img.src = reader.result;
        
        //on image load add to canvas
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
        }
    }, false)
})

$("#sepia").click(function(){
    $("#canvas").toggleClass("sepia");
});

$("#blur").click(function(){
    $("#canvas").toggleClass("blur");
});

$("#saturate").click(function(){
    $("#canvas").toggleClass("saturate");
});

$("#invert").click(function(){
    $("#canvas").toggleClass("invert");
});

$("#br1").click(function(){
    $("#canvas").toggleClass("br1");
});

$("#br2").click(function(){
    $("#canvas").toggleClass("br2");
});

$("#br3").click(function(){
    $("#canvas").toggleClass("br3");
});

$("#br4").click(function(){
    $("#canvas").toggleClass("br4");
});


$("#contrast1").click(function(){
    $("#canvas").toggleClass("contrast1");
});

$("#contrast2").click(function(){
    $("#canvas").toggleClass("contrast2");
});

$("#contrast3").click(function(){
    $("#canvas").toggleClass("contrast3");
});

$("#contrast4").click(function(){
    $("#canvas").toggleClass("contrast4");
});
