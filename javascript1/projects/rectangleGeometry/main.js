let start = function() {
  let rectangles = [];
  function pushRectangle(x, y, w, h) {
    return rectangles.push(makeRectangle(x, y, w, h))
  }
  pushRectangle(30, 20, 50, 80); 
  pushRectangle(50, 70, 50, 50); 
  pushRectangle(130, 10, 50, 50);
  pushRectangle(200, 80, 50, 50);
  pushRectangle(170, 20, 50, 10);
  
  let canvas = document.getElementById("myCanvas");
  let ctx = canvas.getContext("2d");
  let recStyles = ["red", "green", "blue", "yellow", "teal", "pink", "orange", "gray", "brown", "black"]
  
  for (let i = 0; i < rectangles.length; i++) {
      ctx.beginPath();
      ctx.strokeStyle=recStyles[i];
      ctx.rect(rectangles[i].leftx, rectangles[i].topy, rectangles[i].width, rectangles[i].height);
      ctx.stroke();
  }
  
  console.log(distanceBetween(rectangles[1], rectangles[3]));
  console.log(distanceBetween(rectangles[2], rectangles[3]));
  console.log(isOverlapping(rectangles[0], rectangles[1]));
  console.log(isOverlapping(rectangles[2], rectangles[3]));
  
};