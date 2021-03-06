window.onload = function() {

  function returnYear (theYear) {
    return theYear.substring(0, 4);
  }

  function returnMonth (theMonth) {
    return theMonth.substring(5, 7);
  }

  function returnDay (theDay) {
    return theDay.substring(8, 10);
  }

  //this returns true if the inserted year is a leap year
  function isLeapYear(yearToCheck) {
     //To check if something is evenly divisible
    function isInteger (numberToCheck) {
      return numberToCheck % 1 === 0;
    }
    
    //If the year can be evenly divided by 4 it is a leap year.
    var trueOrFalse = yearToCheck;
    if (yearToCheck % 4 === 0){
      trueOrFalse = true;
    }
    //However, if the year can be evenly divided by 100, it is NOT a leap year,
    var check100 = isInteger(yearToCheck / 100);
    if (check100 === true){
      trueOrFalse = false;
    }
    //unless, the year is also evenly divisible by 400. Then it is a leap year.
    var check400 = isInteger(yearToCheck / 400);
    if (check400 === true){
      trueOrFalse = true;
    }
    
    if(trueOrFalse !== true){
      return false;
    } 
    else {
    return trueOrFalse;
    }
  }

  //converting a set date in format "xxxx-xx-xx" to number of days since year 1AD.
  function convertToTotalDays (dateToConvert) {
    
    //<------------------Year calculation---------------------->
    //store year into tempYear and convert it to number
    var tempYear = Number(returnYear(dateToConvert));
    var convertedYears = 0;
    var iteratedYear = 1;
      //A loop which counts the days for every year since year 1. 
    while (iteratedYear < tempYear) {
      //check if the iterated year is a leap year then add 366
      if (isLeapYear(iteratedYear)) {
        convertedYears += 366;
      }
      //if not add 365
      else {
        convertedYears += 365;
      }
      iteratedYear++;
    }

    //<------------------Month calculation---------------------->
    //store months into tempMonth and convert it to number, subtract 1 to not count the month of the date entered 
    var tempMonth = Number(returnMonth(dateToConvert))-1;
    var convertedMonths = 0;
    var iteratedMonth = 1;
    //a loop which adds the number of days for each month iterated
    while (iteratedMonth <= tempMonth){
      //adding January first
      if (iteratedMonth == 1) {
      convertedMonths+=31;  
      }
      //special case february, accounting for leap year.
      else if (iteratedMonth == 2 && isLeapYear(tempYear)) {
        convertedMonths += 29;
      } 
      else if (iteratedMonth == 2 && !isLeapYear(tempYear)) {
        convertedMonths += 28;
      } 
      //March to July, even months have 30 days and the odd months have 31 days
      else if (iteratedMonth > 2 && iteratedMonth <8) {
        if (iteratedMonth % 2 === 0) {
          convertedMonths += 30;
        } 
        else {
          convertedMonths += 31;
        }
      } 
      //August to December, even months have 31 days and the odd months have 30 days
      else {
        if(iteratedMonth % 2 === 0) {
          convertedMonths += 31;
        } 
        else {
          convertedMonths += 30;
        }
      }
      iteratedMonth++;
      
    }
    //<------------------Day calculation---------------------->
    //convert days into number
    var convertedDays = Number(returnDay(dateToConvert));
    
    //<------------------Final calculation---------------------->
    //finally return the sum of converted years, months and days
    return convertedYears + convertedDays + convertedMonths;
  }

  /*a function to calculate the difference in days between two set dates in format
  "xxxx-xx-xx", to calculate years lower than 1000, simply write the year with zeros
  (for example: the year 13 = "0013-xx-xx")*/
  function daysBetween (firstDate, secondDate) {
    var calculatedTotalDays;
    if (convertToTotalDays(firstDate) > convertToTotalDays(secondDate)) {
    calculatedTotalDays = convertToTotalDays(firstDate)  - convertToTotalDays(secondDate);
    }
    else {
    calculatedTotalDays = convertToTotalDays(secondDate) - convertToTotalDays(firstDate);
    }
    if (calculatedTotalDays == 1){
      document.getElementById("output").innerHTML = "The number of days between " + firstDate + " and " + secondDate + " is " + calculatedTotalDays + " day!";
    }
    else{
      document.getElementById("output").innerHTML = "The number of days between " + firstDate + " and " + secondDate + " is " + calculatedTotalDays + " days!";
    }
    return calculatedTotalDays;
   }
   daysBetween(prompt("Input first date xxxx-xx-xx"), prompt("Input second date xxxx-xx-xx"));

}