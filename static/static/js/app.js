var tableData = data;
const tableData2 = JSON.parse(JSON.stringify(data));
var filter_btn = d3.select("#filter-btn");
var tbody = d3.select("tbody");
var reset_table = d3.select("#reset_table");

filter_btn.on("click", function() {
    d3.event.preventDefault();
    tbody.selectAll("td").remove();
    
    var datetime = d3.select("#datetime").property("value");
    var city = d3.select("#city").property("value");
    var state = d3.select("#state").property("value");
    var country = d3.select("#country").property("value");
    var shape = d3.select("#shape").property("value");
    var filter = "var filtered_table = tableData";
    
    if(datetime) { filter = filter.concat(".filter(sighting => sighting.datetime === datetime)"); }
    if(city) { filter = filter.concat(".filter(sighting => sighting.city === city)"); }
    if(state) { filter = filter.concat(".filter(sighting => sighting.state === state)"); }
    if(country) { filter = filter.concat(".filter(sighting => sighting.country === country)"); }
    if(shape) { filter = filter.concat(".filter(sighting => sighting.shape === shape)"); }

    console.log(filter);
    eval(filter);

    filtered_table.forEach(function(object_) {
        var row = tbody.append("tr");
        Object.entries(object_).forEach(function([key, value]) {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});

function populate() {
    tableData2.forEach(function(object_) {
        var row = tbody.append("tr");
        Object.entries(object_).forEach(function([key, value]) {
            var cell = row.append("td");
            cell.text(value);        
        });
    });
}

populate();

reset_table.on("click", function() {
    d3.event.preventDefault();
    tbody.selectAll("td").remove();
    populate();
});

