
var dataset=[1,2,3,4];
d3.select("body").selectAll("p")
	.data(dataset)
	.enter()
	.append("p")
	.text(function(d){return d;})

// because ir refers the CORS problem, the data can only load from the server side.
// not from the local domain. CHROME  
//but it can work on the firefox. So if you want to work on chrome, you should solve the problem of CORS problem 

//test 1. loading data from JSON file 
d3.json('people.json',   //it still doesn't work
	//this is the "callback";this gets called when the data is loaded.
	//simply put, this is where we *do* something with the data
	function(error,data){
		//first we check the dta loaded correctly -if it didn't, let's 
		//print the error so we can debug it, and then exit 
		if(error){
			console.log("error:");
			console.log(error);
			return;
		}
		//for now, we're just going to print the data to the console;
		//remeber back to last week for how we see it
		console.log(data)
	}
	);

//it seems syntax error. 
//after i fixed it by adding the comma between the {}, it can be done successfully.

//test 2. this is going to load the CSV file 

d3.csv("people.csv",
    //Then, we can "clean up" the data before we use it
    function(data) {
        return {
            //If we're not interested in the id field, we don't have to store it,
            //but we can store the name
            name: data["name"],
            //Maybe we don't care about the code for each colour? Here, we remove the last part of the string,
            //and only keep the bit we're interested in
            colour: data["favourite colour"].split(" ")[0],
            //Here we use the "+" symbol to make this a number, not a string
            //This means, for example, we can more easily calculate the average number of pets
            pets: +data["number of pets"]
        };
    },
    //And just like before, this is the "callback" where we do something with the data
    function(error, data) {
        //First check for errors
        if (error){
            console.log("ERROR: ");
            console.log(error);
            return;
        }
        //Again, we're just going to print the data to the console for now
        //Try this out, and see how it's different from the JSON data!
        console.log(data);
    }
);

// 3. going to do the birthrate csv and json to draw bar chart 
d3.csv("birthrates.csv", 
    //For this chart, we're only interested in the values for 2015
    function(data) {
      return {
        country : data["Country Name"],
        birthrate : +data["2015"],
        region: data["Region"]
      };
    },
    //This is the "callback"; this is where we do something with the data
    function(error, data) {
        //If there's an error loading the data, print it out, then stop
        if (error){
            console.log("ERROR: ");
            console.log(error);
            return;
        }
        //I'm going to look at just nine countries, to keep this chart simple.
        //Feel free to change which countries are interesting to you!
        var countriesOfInterest = ["United Kingdom", "Australia", "Brazil", "India", "United States", "France", "Argentina", "Germany", "Japan"];
        var data = data.filter(function(d){return countriesOfInterest.indexOf(d.country) > -1;});
        //Let's print to the console to see what we have so far
        console.log(data);

        var margin = { top: 30, right: 30, bottom: 30, left: 30 };
        var width = 800;
        var height = 300;
        var svg = d3.select('body')
        .append('svg')
        //The total width of our svg is the width of the graph, plus the size of the left and right margins
        .attr('width', width + margin.left + margin.right)
        //The total height of our svg is the height of the graph, plus the size of the top and bottom margins
        .attr('height', height + margin.top + margin.bottom) 
        //We can't see the svg yet - but if you want to check it's worked, you can set the background colour to pink!
        //.style('background-color', 'pink')
        
        //Then, we're going to add a "group", so we can move the whole graph in one go
        //This lets us make room for the margins easily
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

//        data = data.sort(function(a, b){ return b.birthrate - a.birthrate; })   //add this in the nearly end of this tutorial. sort the data 
        var x = d3.scaleBand()
        .domain(data.map(function(d) { return d.country; }))
        .range([0, width])
        .padding(0.1);
        //This tells us the width of each bar that will fit nicely in our chart
        console.log(x.bandwidth());

        //A Linear scale is good for continuous values, such as real numbers (like birthrates)
        var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.birthrate; })])
        .range([height, 0]);

        //This tells us how many pixels tall our bar would be, to represent a data value of "8"
        console.log(y(8));

        svg.selectAll(".bar")
    .data(data)
    .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.country); })
        .attr("y", function(d) { return y(d.birthrate); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.birthrate); })
        .attr("fill", "steelblue");

        //Add the x axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
    //Add the y axis
    svg.append("g")
      .call(d3.axisLeft(y));

      //First we define the colourscheme we're going to use - there are lots to choose from!
    //Check out https://github.com/d3/d3-scale/blob/master/README.md#category-scales
    var colour = d3.scaleOrdinal(d3.schemeCategory10);

    //Then, we select each rectangle and base the fill attribute on the region
    svg.selectAll("rect")
        .attr("fill", function(d, i){ return colour(d.region); });
    }
);

//add this to test