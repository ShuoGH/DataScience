//this is for the lab 5 more charts in week5 

d3.csv("birthrates.csv",

  function(error, data) {
    //If there's an error loading the data, print it out, then stop
    if (error){
      console.log("ERROR:");
      console.log(error);
      return;
    }

    //We're going to pre-process the data here
    //For now, we want to look at just one country. I'm picking the United Kingdom, but you can
    //pick whichever country you want
  var countryOfInterest = "United Kingdom";

  //Then, we're creating an empty array to hold our processed data
  var processedData = [];

  //For every country in the data:
  data.forEach(function(d){

    //Check if it's the country we're interested in:
    if (countryOfInterest == d["Country Name"]){

      //To get all of the years, we could write a for-loop, like this:
      //for(year = 1960; year < 2016; year++){}

      //But instead, let's use the column headings

      //data.columns gets the names of all the columns, and .slice(5) removes the first five headings
      //(Obviously, this would be different for different files, so be careful!)
      var years = data.columns.slice(5);
      years.forEach(function(year){

          //For each year, create a new dataPoint, store the year and associated birthrate...
          var dataPoint = {}
          dataPoint.year = new Date(+year, 0 , 1);
          dataPoint.birthrate = +d[year];

          //...then store it in the array of processedData
          processedData.push(dataPoint);								//*push
      });
    }
  });

  //Lastly, just for consistency, we rename processedData to data
  data = processedData;

  //Let's check it worked:
  console.log("Our data contains:");
  console.log(data);		//your data is outputed here 
  //Now we'll set up the SVG;
	//if you're unsure how this works, refer back to the last lab
	var margin = { top: 100, right: 100, bottom: 100, left: 100 };
	var width = 800;
	var height = 300;

	var svg = d3.select('body')
	  .append('svg')
	  .attr('width', width + margin.left + margin.right)
	  .attr('height', height + margin.top + margin.bottom) 
	  .append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

	  
	//Now we'll set up the scales;
	//if you're unsure how this works, refer back to the last lab
								//indeed i forget how it works
	var x = d3.scaleTime()
	  .domain(d3.extent(data, function(d) { return d.year }))
	  .range([0, width]);

	var y = d3.scaleLinear()
	  .domain(d3.extent(data, function(d) { return d.birthrate; }))
	  .range([height, 0]);

	  //First we define how the data affects the line's shape
	var line = d3.line()
	  .x(function(d) { return x(d.year); })
	  .y(function(d) { return y(d.birthrate); });

	//Then, we draw the line on the svg, using the data to define its shape
	svg.append("path")
	  .datum(data)
	  .attr("fill", "none")
	  .attr("stroke", "steelblue")
	  .attr("stroke-width", 2)
	  .attr("d", line);

	//Add the axis;
	//if you're unsure how this works, refer back to the last lab
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x))

	  //Append a label
	  .append("text")
	  .attr("fill", "#000")
	  .attr("y", 40)
	  .attr("x", width/2)
	  .attr("text-anchor", "middle")
	  .text("Year");

	svg.append("g")
	  .call(d3.axisLeft(y))

	  //Append a label
	  .append("text")
	  .attr("fill", "#000")
	  .attr("y", -40)
	  .attr("x", -height/2)
	  .attr("transform", "rotate(-90)")
	  .attr("text-anchor", "middle")
	  .text("Average Birthrate (/1000 people)");

	//**********exercise: add the title 
	svg.append("text")
	    .attr("x", (width / 2))             
	    .attr("y", 0 - (margin.top / 2))
	    .attr("text-anchor", "middle")  
	    .style("font-size", "32px") 
	    .text("The birthrate in the uk");


    //The rest of our code will go HERE
  }
);

//***************************************************
//this is a copy of the code above 
// d3.csv("birthrates.csv",

//   function(error, data) {
//     //If there's an error loading the data, print it out, then stop
//     if (error){
//       console.log("ERROR:");
//       console.log(error);
//       return;
//     }
d3.queue()
.defer(d3.csv, "birthrates.csv")
.defer(d3.csv, "deathrates.csv")
.await(function(error, birthrates, deathrates) {
	if (error) {
	    console.log(error);
	    return;
	}
	    //Other code goes HERE

	var data = [];
	var countryOfInterest = "United Kingdom";

	//Get the year, the same way as in Part 1
	birthrates.columns.slice(5).forEach(function(year){
	  dataPoint = {};
	  dataPoint.year = new Date(+year, 0 , 0);

	  //Get the birthrate from the country we care about
	  //(Yes, this is inefficient, but it's clear!)
	  birthrates.forEach(function(d){
	    if (countryOfInterest == d["Country Name"]){
	      dataPoint.birthrate = +d[year];
	    }
	  });

	  //Get the deathrate from the country we care about - note how this pulls from the other file
	  deathrates.forEach(function(d){
	    if (countryOfInterest == d["Country Name"]){
	      dataPoint.deathrate = +d[year];
	    }
	  });
	  data.push(dataPoint);
	});


  //Let's check it worked:
  console.log("Our data contains:");
  console.log(data);		//your data is outputed here 
  //Now we'll set up the SVG;
	//if you're unsure how this works, refer back to the last lab
	var margin = { top: 100, right: 100, bottom: 100, left: 100 };
	var width = 800;
	var height = 300;

	var svg = d3.select('body')
	  .append('svg')
	  .attr('width', width + margin.left + margin.right)
	  .attr('height', height + margin.top + margin.bottom) 
	  .append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

	  
	//Now we'll set up the scales;
	//if you're unsure how this works, refer back to the last lab
								//indeed i forget how it works
	var x = d3.scaleTime()
	  .domain(d3.extent(data, function(d) { return d.year }))
	  .range([0, width]);

	var combinedValues = data.map(function(d) { return d.birthrate; })
	  .concat(data.map(function(d) { return d.deathrate; }));

	var y = d3.scaleLinear()
	//.domain(d3.extent(data, function(d) { return d.birthrate; }))
	.domain(d3.extent(combinedValues))
	.range([height, 0]);

	  //First we define how the data affects the line's shape
	var birthsLine = d3.line()
	  .x(function(d) { return x(d.year); })
	  .y(function(d) { return y(d.birthrate); });

	svg.append("path")
	  .datum(data)
	  .attr("fill", "none")
	  .attr("stroke", "steelblue")
	  .attr("stroke-width", 2)
	  .attr("d", birthsLine)


	//Now to define the line!
	var deathsLine = d3.line()
	  .x(function(d) { return x(d.year); })
	  .y(function(d) { return y(d.deathrate); });

	svg.append("path")
	  .datum(data)
	  .attr("fill", "none")
	  .attr("stroke", "firebrick")
	  .attr("stroke-width", 2)
	  .attr("d", deathsLine);

	//Add the axis;
	//if you're unsure how this works, refer back to the last lab
	svg.append("g")
	  .attr("transform", "translate(0," + height + ")")
	  .call(d3.axisBottom(x))

	  //Append a label
	  .append("text")
	  .attr("fill", "#000")
	  .attr("y", 40)
	  .attr("x", width/2)
	  .attr("text-anchor", "middle")
	  .text("Year");

	svg.append("g")
	  .call(d3.axisLeft(y))

	  //Append a label
	  .append("text")
	  .attr("fill", "#000")
	  .attr("y", -40)
	  .attr("x", -height/2)
	  .attr("transform", "rotate(-90)")
	  .attr("text-anchor", "middle")
	  .text("Average Birthrate (/1000 people)");

	//**********exercise: add the title 
	svg.append("text")
	    .attr("x", (width / 2))             
	    .attr("y", 0 - (margin.top / 2))
	    .attr("text-anchor", "middle")  
	    .style("font-size", "32px") 
	    .text("The birthrate in the uk");
    //The rest of our code will go HERE
  }
);

//exercise2: didn't finish the second exercise. find a second 

