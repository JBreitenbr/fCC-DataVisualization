let dates=values.map((item)=>{return new Date(item[0])});

let toolTip=d3.select("body").append("div").style("visibility","hidden").style("position","absolute").style("background-color","white").attr("id","tooltip");

let mouseover = (d,i)=>{
    /*let pos=d3.pointer(mouseover);*/
    toolTip.style("visibility","visible").html(i[0]+"<br>$" + i[1]).attr("data-date",i[0]).attr("data-gdp",i[1]);}

let w=+d3.select("#canvas").style("width").slice(0,-2);

let h=+d3.select("#canvas").style("height").slice(0,-2); 
let pad=Math.floor(w/8.5);

let xScale=d3.scaleLinear().domain([0,values.length]).range([pad,w-pad]);
let yScale=d3.scaleLinear().domain([0,d3.max(values, (item)=>{return item[1]})]).range([0,h-2*pad]);

let xAxisScale=d3.scaleTime().domain([d3.min(dates),d3.max(dates)]).range([pad,w-pad]);
let yAxisScale=d3.scaleLinear().domain([0,d3.max(values,(item)=>{return item[1]})]).range([h-pad,pad]); 

let xAxis=d3.axisBottom(xAxisScale).ticks(6);
let yAxis=d3.axisLeft(yAxisScale);
let canvas=d3.select('#canvas');

canvas.append('g').style("font",`${w/35}px times`).call(xAxis).attr('id','x-axis').attr('transform','translate(0,'+(h-pad)+')');
canvas.append('g').style("font",`${w/35}px times`).call(yAxis).attr('id','y-axis').attr('transform','translate('+pad+',0)');

canvas.selectAll('rect').data(values).enter().append('rect').attr('class','bar').attr('width', (w-2*pad)/(values.length)).attr('data-date',(item)=>{return item[0]}).attr('data-gdp',(item)=>{return item[1]}).
attr('height',(item)=>{return yScale(item[1])}).attr('x',(item,index)=>{return xScale(index)}).attr('y',(item)=>{ return  h-pad-yScale(item[1])}).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});

canvas.append("text")    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 0.9*w)
    .attr("y", h-6)
    .text("More information: http://www.bea.gov/national/pdf/nipaguid.pdf").style("font-size",w/37);
canvas.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 1.5*pad)
    .attr("x",-pad)
    .attr("dy", "0.75em")
    .attr("transform", "rotate(-90)")
    .text("Gross Domestic Product").style("font-size",w/30);
