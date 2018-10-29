
// var dataset=[1,2,3,4];
// d3.select("body").selectAll("p")
// 	.data(dataset)
// 	.enter()
// 	.append("p")
// 	.text(function(d){return d;})

// because ir refers the CORS problem, the data can only load from the server side.
// not from the local domain. CHROME  
//but it can work on the firefox. So if you want to work on chrome, you should solve the problem of CORS problem 

//1. loading data from JSON file 
var json={}
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

// //2. this is going to load the CSV file 

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