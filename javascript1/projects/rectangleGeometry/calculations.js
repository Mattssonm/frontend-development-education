function makeRectangle(leftx, topy, width, height) { 
  return {
    leftx: leftx,
    topy: topy, 
    width: width, 
    height: height,
    area: function() {
      return this.width * this.height;
    },
    circumference: function() {
      return this.width * 2 + this.height * 2;
    },
    moveRight: function(x) {
      this.leftx += x;
    },
    moveDown: function(y) {
      this.topy += y;
    }
  };
}

function isLeftOf (recA, recB) {
  return recA.leftx < recB.leftx;
}

function isOverlapping (recA, recB) {
  /*recA        recB
  0-----|     2-----|
  |     |     |     |
  |-----1     |-----3
  */
  //If 0 is to the right of 3
  if (recA.leftx>recB.leftx+recB.width)
    return false;
  //If 0 is below 3
  else if (recA.topy>recB.topy+recB.height)
    return false;
  //If 1 is to the left of 2
  else if (recA.leftx+recA.width<recB.leftx)
    return false;
  //If 1 is above 2
  else if (recA.topy+recA.height<recB.topy)
    return false;
  // If neither of these expressions evaluates to true, the rectangles overlap
  else 
    return true;
}

/*If they are not overlapping, there are 8 possible positions for recB to be in, in comparison to recA
1      2      3
    |-----|
4   | recA|   5
    |-----|  
6      7      8
*/
function horizontalDistanceBetween(recA, recB) {
  //if recA0 x is larger than recB3 x
  if (recA.leftx > recB.leftx+recB.width) {
    //recB is to the left of recA (recB is in position 1, 4 or 6)
    //return recA0x-recB3x
    return recA.leftx-(recB.leftx+recB.width);
  }
  //else if recA1 x is smaller than recB2 x
  else if (recA.leftx+recA.width<recB.leftx) {
    //recB is to the right of recA (recB is in position 3, 5 or 9). 
    //return recB2x-recA1x
    return recB.leftx-(recA.leftx+recA.width);
  }
  else {
    //recB is in position 2 or 7,
    return 0; 
  }
}

function verticalDistanceBetween(recA, recB) {
  //if recA0 y is larger than recB3 y 
  if (recA.topy > recB.topy + recB.height) {
    //recB is above recA (recB is in position 1, 2 or 3)
    //return recA0y- recB3y
    return recA.topy - (recB.topy + recB.height);
  }
  //else if recA1 y is smaller than recB2 y
  else if (recA.topy + recA.height < recB.topy) {
    //recB is below recA (recB is in positon 6, 7 or 8)
    //return recB2y - recA1y
    return recB.topy - (recA.topy + recA.height);
  }
  else { 
    //recB is in position 4 or 5
    return 0;
  }
}

function distanceBetween(recA, recB) {
  //call both vertical- and horizontalDistanceBetween and store them into variables
  let measuredVerticalDistance = verticalDistanceBetween(recA, recB);
  let measuredHorizontalDistance = horizontalDistanceBetween(recA, recB);
  //if the vertical distance is 0, return the horizontal distance
  if (measuredVerticalDistance === 0)
    return measuredHorizontalDistance + " px";
  //if the horizontal distance is 0, the vertical distance is returned
  else if (measuredHorizontalDistance === 0)
    return measuredVerticalDistance + " px";
  //else recB is in positon 1, 3, 6 or 8, which means the distance must be calculated using pythagoras
  else 
    return Math.sqrt(measuredVerticalDistance*measuredVerticalDistance+measuredHorizontalDistance*measuredHorizontalDistance) + " px";
}