// from data.js
var tableData = dataSet;
console.log(tableData);

var tbody = d3.select("tbody");
console.log(dataSet);

dataSet.forEach(function(crimesData){
    console.log(crimesData);
    var row = tbody.append("tr");
    Object.entries(crimesData).forEach(function([key,value]){
        console.log(key,value);
        var cell = tbody.append("td");
        cell.text(value);
    });
});

var button = d3.select("#filter-btn");

//this is for the filters so fix

button.on("click", function(event){
    d3.event.preventDefault();
    tbody.html("");
    var inputElement = d3.select("#year").property("value");
    var cityInput=d3.select("#state_abbr").property("value");

    var filterData=tableData;
    if (inputElement){
        filterData = filterData.filter(row => row.year === inputElement); 
    }
    if (cityInput){
        filterData = filterData.filter(row => row.state_abbr === cityInput);       
    }

    //end fix filter data

    filterData.forEach(function(data){
        var row=tbody.append("tr");
        Object.entries(data).forEach(function([key,value]){
        var cell=tbody.append("td");
        cell.text(value);
            });
        });
    });