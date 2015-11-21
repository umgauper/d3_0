'use strict';

  d3.csv('app/data/Ozone_ppm_1990-2014.csv', function(error, dataset) { //data loading fine...
    if (error) {
      console.log(error)
    }
    var data = [];
    var obj = dataset[0];

    for (var prop in obj) {
      console.log(prop);
      if (obj.hasOwnProperty(prop)) {
        data.push(+obj[prop])
        }
      }
      data = data.splice(2);
      data.splice(25);

    //line 18 to line 89 is code modified from d3 tutorial code at http://www.janwillemtulp.com/2011/04/01/tutorial-line-chart-in-d3/
    var w = 800,
      h = 375,
      margin = 50,
      year = 1990,
      y = d3.scale.linear().domain([0, d3.max(data)]).range([margin, h - margin]),
      x = d3.scale.linear().domain([0, data.length]).range([margin, w - margin]);

    var vis = d3.select('.chart')
      .append('svg:svg')
      .attr('width', w)
      .attr('height', h);

    var g = vis.append('svg:g')
      .attr('transform', 'translate(0, 375)');

    var line = d3.svg.line()
      .x(function (d, i) {
        return x(i)
      })
      .y(function (d) {
        return -1 * y(d)
      });

    g.append('svg:path').attr('d', line(data));

    g.append('svg:line') //x-axis
      .attr('x1', x(0))
      .attr('y1', -1 * y(0))
      .attr('x2', x(w))
      .attr('y2', -1 * y(0));

    g.append('svg:line') //y-axis
      .attr('x1', x(0))
      .attr('y1', -1 * y(0))
      .attr('x2', x(0))
      .attr('y2', -1 * y(d3.max(data)));

    g.append('svg:text')
      .text('(ppm)')
      .attr('x', 0)
      .attr('y', margin - 80);

    g.selectAll('.xLabel')
      .data(x.ticks(24))
      .enter().append('svg:text')
      .attr('class', 'xLabel')
      .text(function (d, i) {
        return i + 1990
      })
      .attr('x', function (d, i) { //TODO: fix formula, labels are off
        return -25 + 10 * i
      })
      .attr('y', function (d) {
        return -1 * x(d)
      })
      .attr('transform', 'rotate(70 0 0)');

    g.selectAll('.yLabel')
      .data(y.ticks(16))
      .enter().append('svg:text')
      .attr('class', 'yLabel')
      .text(String)
      .attr('x', 0)
      .attr('y', function (d) {
        return -1 * y(d)
      })
      .attr('text-anchor', 'right')
      .attr('dy', 4);

    g.selectAll('xTicks')
      .data(x.ticks(24))
      .enter().append('svg:line')
      .attr('class', 'xTicks')
      .attr('y1', function (d) {
        return -1 * y(0) + 10
      })
      .attr('x1', function (d) {
        return -25 + 10 * i
      })
      .attr('y2', function (d) {
        return -1 * y(0) -10
      })
      .attr('x2', function (d) {
        return -25 + 10 * i
      });

    g.selectAll('yTicks')
      .data(y.ticks(16))
      .enter().append('svg:line')
      .attr('class', 'yTicks')
      .attr('y1', function (d) {
        return -1 * y(d)
      })
      .attr('x1', function (d) {
        return x(-0.3)
      })
      .attr('y2', function (d) {
        return -1 * y(d)
      })
      .attr('x2', function (d) {
        return x(0)
      });
});
//end janwillemtulp.com code

d3.csv('app/data/greenhouse_gases.csv', function(error, dataset) {

  var data = dataset,
      year = 2008,
      w = 750,
      h = 200,
      margin = 20,
      y = d3.scale.linear().domain([0, 4754757]).range([margin, h - margin]),
      x = d3.scale.linear().domain([0, data.length]).range([margin, w - margin]);

  var vis = d3.select('.chart2')
    .append('svg:svg')
    .attr('width', w)
    .attr('height', h);

  vis.selectAll('rect')
    .data(data)
    .enter().append('rect')
    .attr('x', 100)
    .attr('y', function(d, i) { return i * 31})
    .attr('width', function(d) { return Math.round(d['Greenhouse Gas'])/10000})
    .attr('height', 20);

  vis.selectAll('.yLabel')
    .data(y.ticks(5))
      .enter().append('svg:text')
      .attr('class', 'yLabel')
      .text(function() { return year++})
      .attr('x', 50)
      .attr('y', function (d, i) {
        return  i*30 + 12
      })
      .attr('text-anchor', 'right')
      .attr('dy', 4);

  vis.append('svg:line')
    .attr('class', 'xAxis')
    .attr('x1', 50)
    .attr('x2', 600)
    .attr('y1', h - 30)
    .attr('y2', h - 30);

  vis.selectAll('.xTicks')
    .data(x.ticks(2))
    .enter().append('svg:line')
    .attr('class', 'xTicks')
    .attr('x1', function(d, i) { return i * 200 + 100})
    .attr('x2', function(d, i) { return i * 200 + 100})
    .attr('y1', 160)
    .attr('y2', 180);

  vis.selectAll('.xLabels')
    .data(x.ticks(1))
    .enter().append('svg:text')
    .attr('class', '.xLabels')
    .text(function(d, i) { return (i + 1) * 2  + ',000,000 metric tons'})
    .attr('x', function(d, i) { return (i + 1) * 200 + 100})
    .attr('y', 200)
    .attr('text-anchor', 'middle');
});
