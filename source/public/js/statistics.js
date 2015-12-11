'use strict';

function InitStatistics(){
var that = {};

that.setup = function() {
  var fill = d3.scale.category20();
  var tags = '{ "Tags" : [' +
'{ "Tag":"Java"},' +
'{ "Tag":"JavaScript"},' +
'{ "Tag":"Praktikum"},' +
'{ "Tag":"Abschlussarbeit"},' +
'{ "Tag":"SQL"},' +
'{ "Tag":"CSS3"},' +
'{ "Tag":"C#"},' +
'{ "Tag":"Automotive"},' +
'{ "Tag":"Python"},' +
'{ "Tag":"C++"} ]}';
  var tagobject = JSON.parse(tags);

  d3.layout.cloud().size([500, 500])
      .words([
  	  tagobject.Tags[0].Tag,  tagobject.Tags[1].Tag,  tagobject.Tags[2].Tag,  tagobject.Tags[3].Tag,  tagobject.Tags[4].Tag,  tagobject.Tags[5].Tag,  tagobject.Tags[5].Tag, tagobject.Tags[6].Tag,  tagobject.Tags[7].Tag,  tagobject.Tags[8].Tag,  tagobject.Tags[9].Tag].map(function(d) {
        return {text: d, size: 15 + Math.random() * 100};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 360; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("article#tagcloud").append("svg")
        .attr("width", 1500)
        .attr("height", 1000)
      .append("g")
        .attr("transform", "translate(600,300)")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Impact")
        .style("fill", function(d, i) { return fill(i); })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }};
  
  return that;

}
window.addEventListener('load', function() {
	InitStatistics().setup();
});