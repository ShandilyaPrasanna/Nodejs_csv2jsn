var sales=[];
d3.json("Censusedu.json", function(error, data){
    if(error){
    console.log("Error");
    }
    data.forEach(function(d){
        d.totalPop= d.totalPop;
        d.eduCateg=d.eduCateg;
//        console.log(d.population);
    });
    data.sort(function(a,b){
    return b.totalPop- a.totalPop;
  });
  //  console.log(data);
    for(i=0;i < data.length;i++)
    {
      sales[i]=data[i];
    }
    for(i=0;i<sales.length;i++)
    {
    console.log("sales data="+sales[i].eduCateg+" "+sales[i].totalPop);
    }

    //Defining the D3 margin
    var margin={ top:60, right:30, bottom: 100, left:100},
        width=960 - margin.right-margin.left,
        height=500- margin.top-margin.bottom;
    //define svg
    var svg_pie=d3.select('.pie')
            .append('svg')
            .attr({
            "width": width + margin.right + margin.left,
            "height": height + margin.top + margin.bottom
            })
            .attr("width", width)
            .attr("height", height)
            .append('g')
                .attr("transform", "translate(" + margin.left + ',' + margin.right + ')');
//ser up the anles of the pie chart using the pie layout
var pie = d3.layout.pie()
			.value(function (d){
      //  console.log("count"+d.population);
        return d.totalPop;
      })

//connect  our data to the slices
var slices =pie(sales);



//size of the pie chart
var arc=d3.svg.arc()
		.innerRadius(0)
		.outerRadius(100);


//another helper that returns a color based on an ID,catego
var color =d3.scale.category10();
var svgPie =d3.select('svg.pie');
var g= svgPie.append('g')
		.attr('transform','translate(700,150)')
    .append('g')



g.selectAll('path.slice')
	.data(slices)
	.enter()
	.append('path')
	.attr('class','slice')
	.attr('d',arc)
	.attr('fill',function(d){
	return color(d.data.eduCateg);
});

//building a legend
svgPie.append('g')
	.attr('class','legend')
  .attr('transform','translate(50,50)')
  .selectAll('text')
	.data(slices)
	.enter()
	.append('text')
	.text(function (d){return '- '+ d.data.eduCateg + ' ('+ d.data.totalPop+')'})
	.attr('fill' , function(d){return color(d.data.eduCateg);})
.attr('y',function(d,i){return 20*(i+1);})
});
