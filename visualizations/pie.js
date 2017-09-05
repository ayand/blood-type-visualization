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

var colorMap = {
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

var canvas = d3.select(".mainVis")
        .append("svg")
        .attr("width", 450)
        .attr("height", 450)


canvas.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 450)
    .attr("height", 450)
    .attr("fill", "white")

var bloodPie = d3.pie()
    .value(function(d) {
        console.log(d.percentage);
        return d.percentage;
    })

var arc = d3.arc()
    .outerRadius(225)
    .innerRadius(175)

var arcs = canvas.selectAll("g")
    .data(bloodPie(bloodPercentages))
    .enter()
    .append("g")
    .attr("transform", "translate(225, 225)");

var selectedType = null;

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
        bloodSlice.style("opacity", function(d) {
            return (clickedSlice.data.type === d.data.type) ? 1 : 0.2;
        })
        console.log("trying to dim");
        d3.selectAll(".cell").style("opacity", function(d) {
                console.log("Dimming")
                if (clickedSlice.data.type === d.donor || clickedSlice.data.type === d.recipient) {
                    //console.log("Dimming");
                    return 1;
                } else {
                    return 0.2;
                }
            })
    } else {
        selectedType = null;
        bloodSlice.style("opacity", 1);
        d3.selectAll(".cell").style("opacity", 1);
    }
});
