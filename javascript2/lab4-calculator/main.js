window.addEventListener("load", event => {
  let vm = new Vue({
    el: '#root',
    data: {
      lastEntry: 0,
      entryHistory: 0,
      entryNumbers: [],
      entryOperators: [],
      //entryArr: [],
      savedCalcs: [],
      operator: ""
    },
    methods: {
      addEntry: function(event) {
        let entry = event.path[0].innerHTML;
        
        //if entry is an operator
        if (isNaN(entry)) {
          //push the latest number typed in & and the operator
          this.pushLastNumberEntry();
          this.entryOperators.push(entry);
        } // if (isNaN(entry))
        
        this.lastEntry = entry;
        //this.entryArr.push(entry);
        //if entry is zero, remove the zero
        if (this.entryHistory == 0) {
          this.entryHistory = entry;
        } else {
          this.entryHistory += entry;
        }

      },
      clearEntries: function() {
        this.entryHistory = 0;
        this.lastEntry = 0;
        this.entryArr = [];
      },
      
      clearAll: function() {
        this.clearEntries();
        this.savedCalcs = [];
      },
      calculateEntries: function() {
        this.pushLastNumberEntry();
        this.lastEntry = this.evaluate(this.entryNumbers[0], this.entryOperators[0], this.entryNumbers[1]);
        
      },
      pushLastNumberEntry: function() {
          let str = this.entryHistory;
          
          //decide where to begin the loop
          let i = 1;
          //if an operator is last char, do not include it in loop
          if (!isNaN(str.charAt.length-1)) {
            i = 2;
          }
          let startingNum;
        
          //decide where number to push starts
          while (!isNaN(str.charAt(str.length-i))) {
            startingNum = str.length-i;
            console.log("WhiLE")
            if (str.length - i == -1) {
              startingNum = 0;
              break;
            }
            i++;
          }
          
          let tempNum ="";
          console.log(startingNum);
          //generate number
          for (let i=startingNum; i < str.length-1; i++) {
            tempNum += "" + str.charAt(i);
            console.log("FOR")
          }
          
          this.entryNumbers.push(tempNum);
      },
      /*calculateEntries: function() {
        //loop the entryArr
        let num1;
        let num2;
        let currentOp;
        let totalSum;
        this.entryArr.forEach( entry => {
          //if the entry is an operator
          if (isNaN(entry)) {
            //if there is no saved operator
            if (currentOp === undefined) {
              currentOp = entry;
            } else {
              totalSum = this.evaluate(num1, currentOp, num2);
              this.lastEntry = totalSum;
              num1 = undefined;
              num2 = undefined;
              currentOp = entry;
            }
          }
          
          //else the entry is a number
          else {
            //if there are no saved numbers and no currentOp
            if (num1 === undefined && currentOp === undefined) {
            //save it to tempnum
            num1 = entry;
            
            //else if there are a num1 but no currentOp
            } else if (num1 !== undefined && currentOp === undefined) { 
              num1 = "" + num1 + entry;
            
            //else if there are a num1 and a currentOp nut no num2
            } else if (num1 !== undefined && currentOp !== undefined && num2 === undefined) {
              num2 = entry
            //else num1 & currentOp & num2 exists
            } else {
              //concatenate num2 with entry
              num2 = "" + num2 + entry;
            }
          }
        }); //forEach
        console.log(num1, currentOp, num2, totalSum);
      },*/
      evaluate: function (num1, op, num2) {
        let ops = {
          '+': (x, y) => x + y,
          '-': (x, y) => x - y,
          '/': (x, y) => x / y,
          '*': (x, y) => x * y
        }
        console.log(this.entryNumbers);
        console.log(this.entryOperators);
        console.log(ops[op](Number(num1), Number(num2)));
        return ops[op](num1, num2);
      }
    } //methods
  }); //vm
}); //window.load