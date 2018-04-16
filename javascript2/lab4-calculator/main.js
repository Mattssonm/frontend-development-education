window.addEventListener("load", event => {
  let vm = new Vue({
    el: '#root',
    data: {
      lastEntry: 0,
      entryHistory: "0",
      entriesToCalc: [],
      savedCalcs: [],
      operator: "",
      showList: false,
      lastEntryIsSum: false,
    },
    methods: {
      addEntry: function(event) {
        let entry = event.path[0].innerHTML;
        
        if (this.entryHistory.includes("=")) {
          this.entryHistory = String(this.lastEntry);
        }
        
        //if entry is an operator
        if (isNaN(entry) && entry != ".") {
          //push the latest number typed in
          this.entriesToCalc.push(Number(this.lastEntry));
          
          //if previous operands exist
          if (this.includesOperand(this.entryHistory)) {
            this.lastEntry = this.evaluate(this.entriesToCalc);
            this.entriesToCalc = [this.lastEntry];
            this.lastEntryIsSum = true;
          } else {
          //assign the operator to last entry
          this.lastEntry = entry;
          }
          //push the operator
          this.entriesToCalc.push(entry);
          
          //if lastEntry is 0 or an operator, replace it
        } else if (this.lastEntry == 0 || isNaN(this.lastEntry) || this.lastEntryIsSum === true) {
          this.lastEntry = entry;
          this.lastEntryIsSum = false;

          //else add it
        } else {
          this.lastEntry += entry;
        }
        
        //if entry is zero, replace it
        if (this.entryHistory == 0) {
          this.entryHistory = entry;
          //else add it
        } else {
          this.entryHistory += entry;
        }
      },
      clearEntries: function() {
        this.entryHistory = "0";
        this.lastEntry = 0;
        this.entriesToCalc = [];
      },
      
      clearAll: function() {
        this.clearEntries();
        this.savedCalcs = [];
      },
      
      calculateEntries: function() {
        this.entriesToCalc.push(Number(this.lastEntry));
        let result = this.evaluate(this.entriesToCalc);
        this.lastEntry = result;
        this.entryHistory += "=" + result;
        this.entriesToCalc = [];
        this.savedCalcs.push(this.entryHistory);
        this.showList = true;
      },
      
      evaluate: function(arr) {
          let result = 0;
          let ops = {
          '+': (x, y) => x + y,
          '-': (x, y) => x - y,
          '/': (x, y) => x / y,
          '*': (x, y) => x * y
        }
        
        if (arr.length == 1) {
          return arr[0];
        } else {
          //result += ops[arr[1]](arr[0], arr[2]);
          
          for (let i = 1; i<arr.length; i+=2) {
            result += ops[arr[i]](arr[i-1], arr[i+1])
          }
        }
        return result;
      },
      
      includesOperand: function(str) {
        let opsArr = ["+", "-", "/", "*"];
        let bool = false;
        opsArr.forEach(function(op) {
          if (str.includes(op)) {
            bool = true;
          }
        });
        return bool;
      }
    } //methods
  }); //vm
}); //window.load