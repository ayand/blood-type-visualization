var typeMatchups = [
    { "donor": "O+", "recipient": "O+", "canTransfer": true },
    { "donor": "O+", "recipient": "A+", "canTransfer": true },
    { "donor": "O+", "recipient": "B+", "canTransfer": true },
    { "donor": "O+", "recipient": "AB+", "canTransfer": true },
    { "donor": "O+", "recipient": "O-", "canTransfer": false },
    { "donor": "O+", "recipient": "A-", "canTransfer": false },
    { "donor": "O+", "recipient": "B-", "canTransfer": false },
    { "donor": "O+", "recipient": "AB-", "canTransfer": false },
    { "donor": "O-", "recipient": "O+", "canTransfer": true },
    { "donor": "O-", "recipient": "A+", "canTransfer": true },
    { "donor": "O-", "recipient": "B+", "canTransfer": true },
    { "donor": "O-", "recipient": "AB+", "canTransfer": true },
    { "donor": "O-", "recipient": "O-", "canTransfer": true },
    { "donor": "O-", "recipient": "A-", "canTransfer": true },
    { "donor": "O-", "recipient": "B-", "canTransfer": true },
    { "donor": "O-", "recipient": "AB-", "canTransfer": true },
    { "donor": "A+", "recipient": "A+", "canTransfer": true },
    { "donor": "A+", "recipient": "AB+", "canTransfer": true },
    { "donor": "A+", "recipient": "A-", "canTransfer": false },
    { "donor": "A+", "recipient": "AB-", "canTransfer": false },
    { "donor": "A+", "recipient": "B+", "canTransfer": false },
    { "donor": "A+", "recipient": "B-", "canTransfer": false },
    { "donor": "A+", "recipient": "O+", "canTransfer": false },
    { "donor": "A+", "recipient": "O-", "canTransfer": false },
    { "donor": "A-", "recipient": "A+", "canTransfer": true },
    { "donor": "A-", "recipient": "A-", "canTransfer": true },
    { "donor": "A-", "recipient": "AB+", "canTransfer": true },
    { "donor": "A-", "recipient": "AB-", "canTransfer": true },
    { "donor": "A-", "recipient": "B+", "canTransfer": false },
    { "donor": "A-", "recipient": "B-", "canTransfer": false },
    { "donor": "A-", "recipient": "O+", "canTransfer": false },
    { "donor": "A-", "recipient": "O-", "canTransfer": false },
    { "donor": "B+", "recipient": "A+", "canTransfer": false },
    { "donor": "B+", "recipient": "A-", "canTransfer": false },
    { "donor": "B+", "recipient": "AB+", "canTransfer": true },
    { "donor": "B+", "recipient": "AB-", "canTransfer": false },
    { "donor": "B+", "recipient": "B+", "canTransfer": true },
    { "donor": "B+", "recipient": "B-", "canTransfer": false },
    { "donor": "B+", "recipient": "O+", "canTransfer": false },
    { "donor": "B+", "recipient": "O-", "canTransfer": false },
    { "donor": "B-", "recipient": "O+", "canTransfer": false },
    { "donor": "B-", "recipient": "A+", "canTransfer": false },
    { "donor": "B-", "recipient": "B+", "canTransfer": true },
    { "donor": "B-", "recipient": "AB+", "canTransfer": true },
    { "donor": "B-", "recipient": "O-", "canTransfer": false },
    { "donor": "B-", "recipient": "A-", "canTransfer": false },
    { "donor": "B-", "recipient": "B-", "canTransfer": true },
    { "donor": "B-", "recipient": "AB-", "canTransfer": true },
    { "donor": "AB+", "recipient": "O+", "canTransfer": false },
    { "donor": "AB+", "recipient": "A+", "canTransfer": false },
    { "donor": "AB+", "recipient": "B+", "canTransfer": false },
    { "donor": "AB+", "recipient": "AB+", "canTransfer": true },
    { "donor": "AB+", "recipient": "O-", "canTransfer": false },
    { "donor": "AB+", "recipient": "A-", "canTransfer": false },
    { "donor": "AB+", "recipient": "B-", "canTransfer": false },
    { "donor": "AB+", "recipient": "AB-", "canTransfer": false },
    { "donor": "AB-", "recipient": "O+", "canTransfer": false },
    { "donor": "AB-", "recipient": "A+", "canTransfer": false },
    { "donor": "AB-", "recipient": "B+", "canTransfer": false },
    { "donor": "AB-", "recipient": "AB+", "canTransfer": true },
    { "donor": "AB-", "recipient": "O-", "canTransfer": false },
    { "donor": "AB-", "recipient": "A-", "canTransfer": false },
    { "donor": "AB-", "recipient": "B-", "canTransfer": false },
    { "donor": "AB-", "recipient": "AB-", "canTransfer": true },
]

var bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

var width = 450;
var padding = 50;

var x = d3.scaleBand()
    .range([padding, width - padding])
    .domain(bloodTypes)

var y = d3.scaleBand().range([width - padding, padding])
    .range([width - padding, padding])
    .domain(bloodTypes)

var canvas = d3.select(".donorChart")
        .append("svg")
        .attr("width", width)
        .attr("height", width)

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

var cells = canvas.selectAll(".cell")
    .data(typeMatchups)

cells.enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d) {
        return x(d.donor);
    })
    .attr("y", function(d) {
        return y(d.recipient);
    })
    .attr("width", x.bandwidth())
    .attr("height", y.bandwidth())
    .attr("fill", function(d) {
        return d.canTransfer ? "#64EC7F": "#990000"
    })
    .attr("stroke", "black");

canvas.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, " +  (width - padding) + ")")
    .call(xAxis);

canvas.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + padding + ")")
    .call(yAxis);

canvas.append("text")
    .attr("transform", "translate(" + (width/2) + ", " + (width - 10) + ")")
    .style("text-anchor", "middle")
    .text("Donor")

canvas.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", 0 - (width / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Recipient");
