const timeParse = d3.utcParse('%M:%S');
let times=values.map((item)=> timeParse(item["Time"]));

let years=values.map((item) =>parseInt(item["Year"]));
let w=+d3.select("#canvas").style("width").slice(0,-2);

let h=+d3.select("#canvas").style("height").slice(0,-2); 
console.log(h);
console.log(w);
let pad=Math.floor(w/7)
let color1="orange";
let color2="darkgreen";

for(let i=0; i<35; i++){
    values[i]["dopeC"]=color2;
    if((values[i]["Doping"]).length){
      values[i]["dopeC"]=color1;
    }
}

d3.select("h3").style("font",`${h/24}px oxygen`).style("padding-top",`${h/18}px`);
d3.select("h5").style("font",`${h/36}px oxygen`);
let xScale=d3.scaleLinear().domain([d3.min(years)-1,d3.max(years)+1]).range([pad,w-pad]);

let yScale=d3.scaleTime().domain([timeParse("36:40"),timeParse("40:00")]).range([0,h-2*pad]);

let xAxisScale=d3.scaleLinear().domain([d3.min(years)-1,d3.max(years)+1]).range([pad,w-pad]);


let yAxisScale=d3.scaleTime().domain([timeParse("36:40"),timeParse("40:00")]).range([h-pad,pad]);

const timeFormat = d3.utcFormat('%M:%S');
let xAxis=d3.axisBottom(xAxisScale).tickFormat(d3.format('d'));
let
yAxis=d3.axisLeft(yAxisScale).tickFormat(timeFormat);
let canvas=d3.select('#canvas');
canvas.append('g').call(xAxis).attr('id','x-axis').attr('transform',`translate(0,${h-pad})`).selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)").style("font",`${h/48}px arial`);

canvas.append('g').call(yAxis).attr('id','y-axis').attr('transform',`translate(${pad},0)`).style("font",`${h/48}px arial`);

let legbox=canvas.append('g').attr("id","legend");

legbox.append('rect').attr("x",3/7*w).attr("y",0.8*h).attr("width",33/7*w).attr("height",0.1*h).attr("fill","transparent");

legbox.append('rect').attr("x",(w-pad)/2+w/16).attr("y",0.8*h).attr("width",w/30).attr("height",w/30).attr("fill","orange");

legbox.append("text").text("doping allegations").style("text-anchor", "end")
    .attr("x",w-pad)
    .attr("y", 0.8*h+w/30).style("font",`${w/30}px arial`);

legbox.append('rect').attr("x",(w-pad)/2+w/16).attr("y",0.83*h).attr("width",w/30).attr("height",w/30).attr("fill","darkgreen");

legbox.append("text").text("no doping allegations").style("text-anchor", "end")
    .attr("x",w-pad)
    .attr("y", 0.83*h+w/30).style("font",`${w/30}px arial`);

canvas.append("text").text("Time in Minutes").style("text-anchor","end"). attr("x",-h/10).attr("y",`${w/30}`).attr("transform","rotate(-90)").style("font",`${1/36*w}px arial`);

let toolTip=d3.select("#tooltip");

let mouseover = (d,i)=>{
    toolTip.style("visibility","visible").html("Name: "+i["Name"]+"<br>" + "Time: "+i["Time"]+"<br>"+"Year: "+i["Year"]+"<br>"+"Nationality: "+i["Nationality"]+"<br>").attr("data-year",i["Year"]).attr("data-time",i["Time"]).style("font",`${w/44}px arial`).style("color","darkblue").style("border","1px solid darkblue").style("background-color", "papayawhip").style("left",xScale(i["Year"])+"px").style("top",(h+10-pad-yScale(timeParse(i["Time"])))+"px");

}
canvas.selectAll('circle')
      .data(values)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', `${w/48}`)
      .attr('cx', (item) =>xScale(item["Year"]))
      .attr('cy', (item)=>
        h-pad-yScale(timeParse(item["Time"]))
      ).attr('fill',(item)=>item["dopeC"]).attr("data-xvalue",(item)=>item["Year"]).attr("data-yvalue",(item)=>timeParse(item["Time"])).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});
  

