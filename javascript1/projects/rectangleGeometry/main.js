//start of program which loads in the html with body onload
let start = function() {
  
  //make 4 rectangles to start with by calling the makeRectangle function in calculation.js
  let rectangles = [makeRectangle(30, 20, 50, 80), makeRectangle(50, 70, 50, 50), makeRectangle(130, 10, 50, 50), makeRectangle(200, 80, 50, 50)];
  
  //initialization to use canvas
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  
  //colors on rectangles to see the difference
  let rectStyles = ["red", "green", "blue", "yellow", "teal", "pink", "orange", "gray", "brown", "black"]
  
  //a function which loops through the array of rectangles and draws them, using different colors
  function drawRectangles(arrOfRectangles) {
    let nrOfRectangles;
    for (nrOfRectangles = 0; nrOfRectangles < arrOfRectangles.length; nrOfRectangles++) {
        ctx.beginPath();
        ctx.strokeStyle=rectStyles[nrOfRectangles];
        ctx.rect(arrOfRectangles[nrOfRectangles].leftx, arrOfRectangles[nrOfRectangles].topy, arrOfRectangles[nrOfRectangles].width, arrOfRectangles[nrOfRectangles].height);
        ctx.stroke();
    }
  };
  
  //a function which listens to the submit button, gathers the values from the form 
  //and pushes the new rectangle onto the array rectangles. 
  document.getElementById("createRectangle").addEventListener("click", function() {
    let x = document.getElementById("x").value;
    let y = document.getElementById("y").value;
    let w = document.getElementById("w").value;
    let h = document.getElementById("h").value;
    rectangles.push(makeRectangle(x, y, w, h));
    drawRectangles(rectangles);
  });
  
  drawRectangles(rectangles);
   
  /* Not used code:
{ 
function addRectangle(x, y, w, h) {
    rectangles.push(makeRectangle(x, y, w, h)); 
}
      ctx.beginPath();
      ctx.strokeStyle=recStyles[nrOfRectangles];
      ctx.rect(tempRect.leftx, tempRect.topy, tempRect.width, tempRect.height);
      ctx.stroke();
  }*/
  
};