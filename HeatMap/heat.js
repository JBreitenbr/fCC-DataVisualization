let canvas=d3.select("#canvas");

let colorPal=["#4575b4","#74add1","#abd9e9","#e0f3f8","#ffffbf","#fdae61","#f46d43","#a50026","#8b0000"];
let mapMonths=(d)=>{
  if(d==1){
    return "January";
  }
  if(d==2){
    return "February";
  }
  if(d==3){
    return "March";
  }
  if(d==4){
    return "April";
  }
  if(d==5){
    return "May";
  }
  if(d==6){
    return "June";
  }
  if(d==7){
    return "July";
  }
  if(d==8){
    return "August";
  }
  if(d==9){
    return "September";
  }
  if(d==10){
    return "October";
  }
  if(d==11){
    return "November";
  }
  if(d==12){
    return "December";
  }
}
let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
function colorAttr(v){
for(let i=1; i<10; i++){
  if(v < (2 + i*(11/9))){
    return i-1;
  }
}
}
let w=+d3.select("#canvas").style("width").slice(0,-2);

let h=+d3.select("#canvas").style("height").slice(0,-2); 
console.log(h);
console.log(w);
let pad=(6/35)*w;

let xScale=d3.scaleLinear().domain([1753,2016]).range([pad,(34/35)*w]);

let yScale = d3.scaleBand().domain(months).range([pad,h-70-pad]).padding(0);
let legbox=canvas.append('g').attr("id","legend");
legbox.append('rect').attr("x",(2/7)*w).attr("y",(50/57)*h).attr("width",(19/35)*w).attr("height",w/5).attr("fill","#f2f2f2").attr("id","legend");
let legendScale=d3.scaleLinear().domain([2,13]).range([(11/35)*w,0.8*w]);
for(let i=0; i<9; i++){
legbox.append('rect').attr("x",(11/35)*w+0.054*w*i).attr("y",0.9*h).attr("width",0.054*w).attr("height",0.05*h).attr("fill",colorPal[i]);}
let xAxis=d3.axisBottom(xScale).tickFormat(d3.format('d'));
let
yAxis=d3.axisLeft(yScale);
let legendAxis=d3.axisBottom(legendScale).ticks(9);
let toolTip=d3.select("#tooltip");

let mouseover = (d,i)=>{
    toolTip.style("visibility","visible").html("Year: "+i[0]+"<br>" + "Month: "+mapMonths(i[1])+"<br>"+"Temperature: "+`${(i[2]+8.66).toFixed(2)}`+"℃<br>").attr("data-year",i[0]).style("font","12px arial").style("color","darkblue").style("border","1px solid darkred").style("background-color", "papayawhip").style("left",xScale(1850)+"px").style("top",`${(20/57)*h}px`);
}
canvas.append('g').call(xAxis).attr('id','x-axis').attr('transform',"translate(0,"+(h-pad-70)+")").selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)").style("font",`${Math.min((11/350)*w,16)}px arial`);

canvas.append('g').call(yAxis).attr('id','y-axis').attr('transform',"translate("+pad+",0)").style("font",`${(1/57)*h}px arial`);
canvas.append('g').call(legendAxis).attr("transform","translate(0,"+(54.2/57)*h+")").style("font",`${(1/70)*h}px arial`);
canvas.append('text').attr("x",(4/35)*w).attr("y",(3/95)*h).text("Monthly Global Land Surface Temperature").attr("id","title").style("font",`${(16/570)*h}px arial`).attr("fill","darkblue");
canvas.append('text').attr("x",(9/35)*w).attr("y",(7/95)*h).text("1753 - 2015: base temperature 8.66℃").attr("id","description").style("font",`${(12/570)*h}px arial`).attr("fill","darkblue");
  canvas.selectAll('rect')
      .data(arr)
      .enter()
      .append('rect')
      .attr('class', 'cell')
      .attr('data-month',(item)=>item[1]-1).attr('data-year',(item)=>item[0]).attr('data-temp',(item)=>item[2]+8.66).attr('height',(h-2*pad-70)/12).attr('y',(item)=>yScale(mapMonths(item[1]))).attr('width',(w-2*pad)/263).attr("x",(item)=>xScale(item[0])).attr('fill',(item)=>colorPal[colorAttr(item[2]+8.66)]).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});

