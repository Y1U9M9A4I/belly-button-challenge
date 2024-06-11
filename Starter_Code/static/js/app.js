// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((dataset) => {

    // get the metadata field
    let metadata = dataset.metadata;

    // Filter the metadata for the object with the desired sample number
    let samplelist = metadata.filter(samp => samp.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let spanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata

    spanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (val in samp){
      spanel.append
    } 
  });
}

// function to build both charts
//function buildCharts(sample) {
//  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

    let samples = dataset.samples;

    // Filter the samples for the object with the desired sample number

    let samplelist = samples.filter(samp => samp.id == sample); 
    let samp = samplelist[0]; 

    // Get the otu_ids, otu_labels, and sample_values

    let otu_ids = samp.otu_ids
    let otu_labels = samp.otu_labels
    let sample_values = samp.sample_values

    // Build a Bubble Chart

    function buildBubblePlot (sample) {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((dataset) => {
    let samples = dataset.samples}


    // Render the Bubble Chart


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    function buildBarPlot (sample) {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((dataset) => {
      let samples = dataset.samples}


    // Render the Bar Chart


// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field

    let sampname = dataset.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options

    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      let sampname = dataset.names;
      });
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.

    


    // Get the first sample from the list
      let first = sampname[0];

    // Build charts and metadata panel with the first sample
      
    buildBarPlot(first);
    buildBubblePlot(first);
    buildMetadata(first);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
