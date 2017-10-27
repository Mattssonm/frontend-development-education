let start = function() {
  let rectangles = [makeRectangle(30, 20, 50, 80), makeRectangle(50, 70, 50, 50), makeRectangle(130, 10, 50, 50), makeRectangle(200, 80, 50, 50)];
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let recStyles = ["red", "green", "blue", "yellow", "teal", "pink", "orange", "gray", "brown", "black"]
  
  let nrOfRectangles;
  for (nrOfRectangles = 0; nrOfRectangles < rectangles.length; nrOfRectangles++) {
      ctx.beginPath();
      ctx.strokeStyle=recStyles[nrOfRectangles];
      ctx.rect(rectangles[nrOfRectangles].leftx, rectangles[nrOfRectangles].topy, rectangles[nrOfRectangles].width, rectangles[nrOfRectangles].height);
      ctx.stroke();
  }
  
   function addRectangle(x, y, w, h) {
    let tempRect = makeRectangle(x, y, w, h);
      ctx.beginPath();
      ctx.strokeStyle=recStyles[nrOfRectangles];
      ctx.rect(tempRect.leftx, tempRect.topy, tempRect.width, tempRect.height);
      ctx.stroke();
  }
  
  
  console.log(nrOfRectangles);
  console.log(distanceBetween(rectangles[1], rectangles[3]));
  console.log(distanceBetween(rectangles[2], rectangles[3]));
  console.log(isOverlapping(rectangles[0], rectangles[1]));
  console.log(isOverlapping(rectangles[2], rectangles[3]));
  
};