var bloodPercentages = [
  { "type": "O+", "percentage": 37 },
  { "type": "O-", "percentage": 6 },
  { "type": "A+", "percentage": 34 },
  { "type": "A-", "percentage": 6 },
  { "type": "B+", "percentage": 10 },
  { "type": "B-", "percentage": 2 },
  { "type": "AB+", "percentage": 4 },
  { "type": "AB-", "percentage": 1 },
]

colorMap = {
    "O+": "#FF7F00",
    "A+": "#FDBF6F",
    "B+": "#E31A1C",
    "O-": "#FB9A99",
    "A-": "#33A02C",
    "AB+": "#B2DF8A",
    "B-": "#1F89B4",
    "AB-": "#A6CEE3"
}

bloodPercentages.sort(function(a, b) {
    return b.percentage - a.percentage;
})

var width = 450

var canvas = d3.select(".mainVis")
        .append("svg")
        .attr("width", width)
        .attr("height", width)

canvas.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", width)
    .attr("fill", "white")

var bloodPie = d3.pie()
    .value(function(d) {
        console.log(d.percentage);
        return d.percentage;
    })

var arc = d3.arc()
    .outerRadius(((width/2)))
    .innerRadius(((width/2) - 50))

var arcs = canvas.selectAll("g")
    .data(bloodPie(bloodPercentages))
    .enter()
    .append("g")
    .attr("transform", "translate(" + (width / 2) + ", " + (width / 2) + ")");

selectedType = null;
div1 = document.getElementById("generalStats");
div2 = document.getElementById("ethnicDistributions");

div2.style.display = 'none';

var showEthnicStats = function() {
    console.log('button 1');
    div1.style.display = 'none';
    div2.style.display = 'block';
    selectedType = null;

    d3.selectAll(".bloodSlice").transition().duration(1000).style("opacity", 1);
    d3.selectAll(".cell").transition().duration(1000).style("opacity", 1);
}

var showGeneralStats = function() {
    console.log('button 2');
    div1.style.display = 'block';
    div2.style.display = 'none';
}

var bloodSlice = arcs.append("path")
    .attr("class", "bloodSlice")
    .attr("fill", function(d) {
        return colorMap[d.data.type];
    })
    .attr("d", arc)
    .style("cursor", "pointer");


arcs.append("text")
    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
    .attr("dy", ".30em")
    .text(function(d) { return d.data.percentage + "%"; })
    .style("font-size", 8);

console.log("implementing clicks");
bloodSlice.on("click", function(clickedSlice) {
    if (selectedType != clickedSlice.data.type) {
        selectedType = clickedSlice.data.type;
        bloodSlice.transition().duration(1000).style("opacity", function(d) {
            return (clickedSlice.data.type === d.data.type) ? 1 : 0.2;
        })
        console.log("trying to dim");
        d3.selectAll(".cell").transition().duration(1000).style("opacity", function(d) {
                console.log("Dimming")
                if (clickedSlice.data.type === d.donor || clickedSlice.data.type === d.recipient) {
                    //console.log("Dimming");
                    return 1;
                } else {
                    return 0.2;
                }
            })

        d3.selectAll(".legendItemRect").transition().duration(1000).style("opacity", function(rect) {
            console.log("Rectangle dimming!");
            return (rect.type === clickedSlice.data.type) ? 1 : 0.2;
        })
    } else {
        selectedType = null;
        bloodSlice.style("opacity", 1);
        d3.selectAll(".cell").transition().duration(1000).style("opacity", 1);
        d3.selectAll(".legendItemRect").transition().duration(1000).style("opacity", 1);
    }
});
