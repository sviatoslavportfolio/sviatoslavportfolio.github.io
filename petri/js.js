/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var json;
document.querySelector(".start").onclick = function () {
    makeJson();
}

function makeJson() {
    json = JSON.parse("{ " + document.querySelector(".nodesText").value + document.querySelector(".edgesText").value + " }");
    start();
    err();
}

function err() {
    var ed = [];
    var no = [];
    for (i = 0; i < json.edges.length; i++) {
        ed.push(json.edges[i].source.id);
        ed.push(json.edges[i].target.id);
    }
    for (i = 0; i < json.nodes.length; i++) {
        no.push(json.nodes[i].id);
    }
    console.log(ed);
    console.log(no);

    var dif = сomparison(ed, no);
    if (dif.length > 0) {
        alert("Изолированая вершина(ы) = " + dif);
    }
};


function сomparison(a1, a2) {
    var a = [],
        diff = [];
    for (var i = 0; i < a1.length; i++)
        a[a1[i]] = true;
    for (var i = 0; i < a2.length; i++)
        if (a[a2[i]]) delete a[a2[i]];
        else a[a2[i]] = true;
    for (var k in a)
        diff.push(k);
    return diff
};

function start() {
    const $d3 = d3;
    const $jq = $; // jquery

    const width = $jq("#rhs").width();
    const height = $jq("#rhs").height();
    const color = d3.schemeCategory20;




    const force = d3.layout.force()
        .charge(-250)
        .linkDistance(45)
        .size([width, height]);

    // start this, because it destructively turns those references into live objects!
    force
        .nodes(json.nodes)
        .links(json.edges)
        .start();



    const AND = (a, b) => a && b;
    const all = xs => xs.length && xs.reduce(AND, true);

    const incoming = n => Array.from(json.edges).filter((e) => e.target === n);
    const outgoing = n => Array.from(json.edges).filter((e) => e.source === n);
    const active = n => all((Array.from(incoming(n)).map((e) => e.source.count > 0)));

    const holds = () => Array.from(json.nodes).filter((n) => n.group === 0);
    const tasks = () => Array.from(json.nodes).filter((n) => n.group === 1);
    const alls = () => Array.from(json.nodes);

    const radius = 15;

    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    const links = svg.selectAll("line.link")
        .data(json.edges)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", "#000")
        .style("stroke-width", 2);


    const circs = svg.selectAll("circle.node")
        .data(holds)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", radius)
        .style("fill", "#fff")
        .style("stroke", '#000')
        .style("stroke-width", '2')
        .call(force.drag);


    const box_color = "grey";



    var rects = svg.selectAll("rect.node")
        .data(tasks)
        .enter().append("rect")
        .attr("class", "node")
        .attr("width", radius * 2)
        .attr("height", radius * 2)
        .style("stroke", '#000')
        .style("stroke-width", '2')
        .style("fill", box_color)
        .call(force.drag);

    const texts = svg.selectAll("text")
        .data(alls)
        .enter().append("text")
        .text(function (d) {
            return d.count;
        })
        .call(force.drag);

    const node = svg.selectAll(".node");
    node.append("title")
        .text(d => d.name);


    force.on("tick", function () {
        texts
            .attr("x", d => d.x - 5)
            .attr("y", d => d.y + 5);
        links
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);
        circs
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        return rects
            .attr("x", d => d.x - radius)
            .attr("y", d => d.y - radius);
    });


};
