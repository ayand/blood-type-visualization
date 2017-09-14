ethnicHeight = 400;
ethnicWidth = 275;
ethnicPadding = 30;

ethnicities = ["Caucasian", "African-American", "Latino-American", "Asian"]

var drawDistribution = function(index, data) {
    console.log("Calling function");
    var canvas = d3.select(".ethnicity" + index)
        .append("svg")
        .attr("height", ethnicHeight)
        .attr("width",ethnicWidth);

    canvas.append("rect")
        .attr("height", ethnicHeight)
        .attr("width", ethnicWidth)
        .attr("x", 0)
        .attr("y", 0)
        .attr("fill", "#AAAAAA");

    data.sort(function(a, b) {
        return b.percentage - a.percentage;
    })

    var bloodTypes = data.map(function(d) {
        return d.blood_type;
    })

    var xScale = d3.scaleLinear().range([ethnicPadding, (ethnicWidth - ethnicPadding)])
        .domain([0, 100]);
    var yScale = d3.scaleBand().range([ethnicPadding, (ethnicHeight - ethnicPadding)])
        .domain(bloodTypes);

    var xAxis = d3.axisTop(xScale);
    var yAxis = d3.axisLeft(yScale);

    var bloodBars = canvas.selectAll(".bloodBar")
        .data(data);

    bloodBars.enter().append("rect")
        .attr("class", "bloodBar")
        .attr("height", yScale.bandwidth())
        .attr("width", function(d) {
            return xScale(d.percentage) - ethnicPadding;
        })
        .attr("x", function(d) {
            return ethnicPadding;
        })
        .attr("y", function(d) {
            return yScale(d.blood_type);
        })
        .attr("fill", function(d) {
            return colorMap[d.blood_type];
        })

    canvas.append("g")
        .attr("class", "xAxis")
        .attr("transform", "translate(0, " + ethnicPadding + ")")
        .call(xAxis)

    canvas.append("g")
        .attr("class", "yAxis")
        .attr("transform", "translate(" + ethnicPadding + ", 0)")
        .call(yAxis)
}

d3.json("data/ethnic_distribution.json", function(data) {
    for (var i = 0; i < 4; i++) {
        var ethnicity = ethnicities[i];
        var filteredData = data.filter(function(d) {
            return d.ethnicity === ethnicity;
        })
        drawDistribution(i, filteredData);
    }
})
