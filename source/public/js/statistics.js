'use strict';

function InitStatistics(){
var that = {};
var jobs = [];

that.setup = function() {
  var fill = d3.scale.category20();
  var tags = '{ "Tags" : [' +
'{ "Tag":"Java", "Size":"1"},' +
'{ "Tag":"JavaScript", "Size":"0.9"},' +
'{ "Tag":"Praktikum", "Size":"0.8"},' +
'{ "Tag":"Abschlussarbeit", "Size":"0.7"},' +
'{ "Tag":"SQL", "Size":"0.6"},' +
'{ "Tag":"CSS3", "Size":"0.5"},' +
'{ "Tag":"C#", "Size":"0.4"},' +
'{ "Tag":"Automotive", "Size":"0.3"},' +
'{ "Tag":"Python", "Size":"0.2"},' +
'{ "Tag":"C++", "Size":"0.1"} ]}';
  var tagobject = JSON.parse(tags);
  var tags = tagobject.Tags.Tag;

  d3.layout.cloud().size([700, 650])
      .words([
  	  tagobject.Tags[0].Tag,  tagobject.Tags[1].Tag,  tagobject.Tags[2].Tag,  tagobject.Tags[3].Tag,  tagobject.Tags[4].Tag, tagobject.Tags[5].Tag, tagobject.Tags[6].Tag,  tagobject.Tags[7].Tag,  tagobject.Tags[8].Tag,  tagobject.Tags[9].Tag].map(function(d, i) {
        return {text: d, size: 15 + 100 * tagobject.Tags[i].Size};
      }))
      .rotate(function() { return ~~(Math.random() * 2) * 360; })
      .font("Impact")
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();

  function draw(words) {
    d3.select("article#tagcloud").append("svg")
        .attr("width", 1500)
        .attr("height", 1200)
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
 
 function onJobs(resp){
 		if (resp.message === undefined) {
			console.log(resp.message);
			console.log(resp);
			jobs = JSON.parse(resp);
			console.log(resp.length);
			}}
			
 that.updateTags = function () {
		http('get', '/api/alljobs', {}, onJobs);
	};
	
  return that;

}
window.addEventListener('load', function() {
	InitStatistics().setup();
	InitStatistics().updateTags();
});