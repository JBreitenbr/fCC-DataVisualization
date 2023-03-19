let canvas=d3.select("#canvas");
let w=+d3.select("#canvas").style("width").slice(0,-2);

let h=+d3.select("#canvas").style("height").slice(0,-2); 
const treemap = (data) => d3.treemap()
                .size([w, (35/39)*h])
                /*.paddingInner(1)*/
                (d3.hierarchy(data)
                    .sum(d => d.value)
                    .sort((a,b) => b.value - a.value)
                )
            
            let root = treemap(movieData);

            let tile = canvas.selectAll('g')
            .data(root.leaves())
            .join('g')
                .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

let toolTip=d3.select("#tooltip");

let mouseover = (d,i)=>{
    toolTip.style("visibility","visible").html("$" + i.value+"<br>Category: "+i.data.category+"<br>Title: "+i.data.name+"<br>").attr("data-value",i.value).style("font","12px arial").style("color","darkblue").style("background-color","papayawhip").style("border","1px solid darkred").style("left",i.x1-50+"px").style("top",i.y0+20+"px");
}
let colorSet=["#66c2a5","#7dc0ff","#ff9987","#a6d854","#d6b6d6","#e5c494","#8da0cb"];
let categories=["Comedy","Action","Drama","Family","Animation","Adventure","Biography"];

function colCat(d){
for(let i=0; i<7;i++){
if(d.data.category == categories[i]) {
    return colorSet[i];
}
 }
  }
tile.append('rect')
            .attr('width', d => d.x1 - d.x0)
            .attr('height', d => d.y1 - d.y0)
            .attr('class', 'tile')
            .attr('data-name', d => d.data.name)
            .attr('data-category', d => d.data.category)
            .attr('data-value',d => d.data.value).attr("fill",(d)=>colCat(d)).on("mouseover",mouseover).on("mouseleave",()=>{return toolTip.style("visibility","hidden")});

tile.append('text').attr('x', 1)
            .attr('y', (8/780)*h)
            .style('font',`${(5.5/365)*w}px arial`)
            .text((d) => d.data.name.length/(d.x1-d.x0)>(0.37*365)/w?d.data.name.substring(0,(d.x1-d.x0)*(0.33*(365/w)))+"...":d.data.name).style("fill","#333");


let legbox = canvas.append('g').attr("id","legend");

legbox.append("rect").attr("x",(60/365)*w).attr("y",(710/780)*h).attr("width",(250/365)*w).attr("height",(55/780)*h).attr("fill","#ffffc9").attr("stroke","#00008d");


for(let i=0; i<4; i++){
  legbox.append("rect").attr("x",(65/365)*w+i*(60/365)*w).attr("y",(715/780)*h).attr("width",(15/365)*w).attr("height",(15/780)*h).attr("fill",colorSet[i]).attr("class","legend-item");

legbox.append("text").text(categories[i]).style("text-anchor", "end")
    .attr("x",(120/365)*w+i*(58/365)*w)
    .attr("y", (725/780)*h).style("font",`${(10/365)*w}px arial`);
  }
for(let i=4; i<7; i++){      legbox.append("rect").attr("x",(80/365)*w+(i-4)*(70/365)*w).attr("y",(742/780)*h).attr("width",(15/365)*w).attr("height",(15/780)*h).attr("fill",colorSet[i]).attr("class","legend-item");

legbox.append("text").text(categories[i]).style("text-anchor", "end")
    .attr("x",(145/365)*w+(i-4)*(70/365)*w)
    .attr("y", (752/780)*h).style("font",`${(10/365)*w}px arial`);      }   
