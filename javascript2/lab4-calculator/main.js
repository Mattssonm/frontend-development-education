window.addEventListener("load", event => {
  let vm = new Vue({
    el: '#root',
    data: { 
      display: "display",
      entryData: 0,
    },
    methods: {
      addEntry: function(event) {
        if (this.entryData == 0) {
          this.entryData = event.originalTarget.firstChild.nodeValue;
        } else {
          this.entryData += event.originalTarget.firstChild.nodeValue;
        }
      },
      clearEntries: function() {
        this.entryData = 0;
      },
      calculateEntries: function() {
        this.entryData = eval(this.entryData);
      }
    }
  });
});