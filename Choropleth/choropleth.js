// dataset provided by freecodecamp
let cntURL="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
// alternate dataset which makes it easier to create a responsive choropleth
let cntURL2="https://raw.githubusercontent.com/gist/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/us.json";
let eduURL="https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
let toolTip=d3.select("#tooltip");

let colorSet=["#eff3ff","#c6dbef","#9ecae1","#6baed6","#3182bd","#08519c"];
let grades=["<12","<15","<21","<26","<34",">34"];
let canvas = d3.select("#canvas");
let w=+d3.select("#canvas").style("width").slice(0,-2);

let h=+d3.select("#canvas").style("height").slice(0,-2); 

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
// The following array contains the ids of cntURL2, which do not have a corresponding fips in the eduURL dataset
let excl = [46113, 51515, 2280, 2232, 2270, 2201, 72125, 72003, 72097, 72065, 72055, 72083, 72025, 72045, 72133, 72121, 72027, 72033, 72001, 72111, 72047, 72091, 72013, 72145, 72031, 72061, 72129, 72075, 72063, 72073, 72143, 72011, 72081, 72015, 72079, 72009, 72099, 72023, 72109, 72101, 72117, 72005, 72059, 72021, 72141, 72041, 72123, 72131, 72035, 72135, 72115, 72054, 72105, 72017, 72127, 72139, 72057, 72153, 72043, 72149, 72039, 72113, 72107, 72067, 72071, 72007, 72019, 72093, 72151, 72137, 78030, 72089, 72087, 72095, 72119, 72103, 72085, 72029, 72053, 72077, 72037, 72069, 72147, 78010, 72051];
function drawData() {
  let albers = d3.geoAlbersUsa().fitSize([w,h],cntData2);
  let geoPath=d3.geoPath().projection(albers);
;
  canvas.append('g')
    .attr('class', 'counties')
    .selectAll('path')
    .data(cntData)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr("fill",(cntItem) => {
      let id = cntItem["id"];
      if(!isInArray(+id, excl)){
      let cnt = eduData.find((item)=>{
        return item['fips']===id});
     
      let perc=cnt.bachelorsOrHigher;
      
     if(perc<12){
        return colorSet[0];
      }
      else if(perc<15){
        return colorSet[1];
      }
      else if(perc<21){
        return colorSet[2];
      }
      else if(perc<26){
        return colorSet[3];
      }
      else if(perc<34){
        return colorSet[4];
      }
      else{return colorSet[5];}}
    return "#f0f0f0";})
    .attr('data-fips',(cntItem)=>{
      return cntItem.id;
    })
    .attr('data-education',
         (cntItem) => {
      let id = cntItem["id"];
      if(!isInArray(+id, excl)){
      let cnt = eduData.find((item)=>{
        return item['fips']===id});
     
      
      let perc=cnt.bachelorsOrHigher;
        return perc;}}
      )
    .attr('d',geoPath).on('mouseover', (cntItem)=>{toolTip.transition().style("visibility","visible").style("background-color","papayawhip").style("font","10px arial");
  let id=cntItem["id"];
if(!isInArray(+id, excl)){
      let cnt = eduData.find((item)=>{
        return item['fips']===id});
  toolTip.text(cnt["fips"]+"-"+cnt["area_name"]+","+cnt["state"]
    +":"+cnt["bachelorsOrHigher"]+"%")
toolTip.attr("data-education",cnt["bachelorsOrHigher"]);
}}).on("mouseout",(cntItem)=>{toolTip.transition().style("visibility","hidden");});
}

d3.json(cntURL2).then(
  (data,error) => {
    if(error){
      console.log(error);
    }
    else {
     cntData=topojson.feature(data,data.objects.counties)["features"];
  cntData2=topojson.feature(data,data.objects.counties);

      d3.json(eduURL).then(
        (data,error) => {
          if(error){
            console.log(error);
            }
            else{
              eduData=data;            
              drawData();
              }
        }
      )
    }
  }
);

let legbox = canvas.append('g').attr("id","legend");

legbox.append("rect").attr("x",(200/365)*w).attr("y",0.04*h).attr("width",(150/365)*w).attr("height",(55/780)*h).attr("fill","#ffffe0").attr("stroke","#00008d");


for(let i=0; i<6; i++){
  legbox.append("rect").attr("x",(208/365)*w+i*(25/365)*w).attr("y",0.05*h).attr("width",(10/365)*w).attr("height",(15/780)*h).attr("fill",colorSet[i]).attr("class","legend-item");
  legbox.append("text").text(grades[i]).style("text-anchor", "end")
    .attr("x",(220/365)*w+i*(25/365)*w)
    .attr("y", 0.1*h).style("font",`${(10/365)*w}px arial`);
}
