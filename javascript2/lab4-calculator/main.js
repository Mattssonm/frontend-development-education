window.addEventListener("load", event => {
  let vm = new Vue({
    el: '#root',
    data: {
      lastEntry: 0,
      entryHistory: "0",
      entriesToCalc: [],
      savedCalcs: [],
      showList: false,
      lastEntryIsSum: false,
      rootDisabled: false
    },
    methods: {
      addEntry: function(event) {
        let entry = event.target.innerHTML;
        
        //if previous evaluation has been done
        if (this.entryHistory.includes("=")) {
          this.entryHistory = String(this.lastEntry);
        }
        
        //decide the value of lastEntry
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
            
            //replace the operator to last entry
            this.lastEntry = entry;
          }
          
            //push the operator
            this.entriesToCalc.push(entry);

        //if lastEntry is 0, an operator or lastentry is a previous sum, replace it
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
          
        //swap places if entry is √
        } else if (entry == "√") {
          this.entryHistory= this.lastEntry += this.entryHistory;
          
        //else add it
        } else {
          this.entryHistory += entry;
        }

      },
      clearEntries: function() {
        this.entryHistory = "0";
        this.lastEntry = 0;
        this.entriesToCalc = [];
        this.rootDisabled = false;
        this.lastEntryIsSum = false;
      },
      
      calculateEntries: function() {
        this.entriesToCalc.push(Number(this.lastEntry));
    
        let result = this.evaluate(this.entriesToCalc);
        
        //if the result is less than 0 disable square root
        if (result < 0) {
          this.rootDisabled = true;
        } else {
          this.rootDisabled = false;
        }
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
          '*': (x, y) => x * y,
        }
        
        //if array only contains 1 item
        if (arr.length == 1) {
          return arr[0];
          
        } else if (arr[1] == '√') {
         result += Math.sqrt(arr[0]);
        } else {
          result += ops[arr[1]](arr[0], arr[2]);
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
      },
      
      square2: function() {
        this.lastEntry = this.lastEntry * this.lastEntry;
        this.entryHistory += "^2";
      
      },
    } //methods
  }); //vm
}); //window.load