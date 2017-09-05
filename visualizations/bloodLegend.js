var legendCanvas = d3.select(".bloodLegend")
    .append("svg")
    .attr("width", 525)
    .attr("height", 60)

legendCanvas.append("rect")
    .attr("width", 525)
    .attr("height", 60)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("rx", 5)
    .attr("ry", 5)

var legendItem = legendCanvas.selectAll(".legendItem")
    .data(bloodPercentages)
    .enter().append("g")
    .attr("class", "legendItem")
    .attr("transform", function(d, i) {
        var x = ((i % 8) * 64);
        return "translate(" + x + "," + 0 + ")"
    })

legendItem.append("rect")
    .attr("x", 5)
    .attr("y", 10)
    .attr("width", 25)
    .attr("height", 25)
    .attr("fill", function(d) {
        return colorMap[d.type]
    })
    .on("mouseover", function(d) {
        d3.selectAll(".bloodSlice")
            .transition()
            .duration(1000)
            .style("opacity", function(slice) {
                return (d.type === slice.data.type) ? 1 : 0.2;
            })
    })
    .on("mouseout", function(d) {
        d3.selectAll(".bloodSlice")
            .transition()
            .duration(1000)
            .style("opacity", 1);
    })

legendItem.append("text")
    .attr("x", 35)
    .attr("y", 26)
    .text(function(d) {
        return d.type;
    })
    .attr("class", "itemLabel")
    .style("font-size", 15);
