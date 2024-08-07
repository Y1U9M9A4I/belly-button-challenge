// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field

    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number

    let sampleMD = metadata.filter(result => result.id == sample)[0];


    // Use d3 to select the panel with id of `#sample-metadata`

    let pan = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata

    pan.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.

    Object.entries(sampleMD).forEach(([key, value]) => {
      pan.append("h6").text(`${key.toUpperCase()}: ${value}`);
    })
  });
}

// function to build both charts
function buildBubblePlot(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

  let samples = data.samples;

    // Filter the samples for the object with the desired sample number

  let sampledata = samples.filter(sampleObj => sampleObj.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values

  let otuids = sampledata.otu_ids; 
  let otulabels = sampledata.otu_labels;
  let sampvals = sampledata.sample_values;

    // Build a Bubble Chart
  
  let bubdata = [{
    x: otuids,
    y: sampvals,
    text: otulabels,
    mode: 'markers',
    marker: {
      size: sampvals,
      color: otuids,
      colorscale: 'Earth'
    }
  }];

  let bublayout = {
    title: 'Bacteria Cultures Per Sample',
    xaxis: { title: 'OTU ID'},
    yaxis: { title: 'Number of Bacteria'}
  };

    // Render the Bubble Chart
  Plotly.newPlot('bubble', bubdata, bublayout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks


    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately


    // Render the Bar Chart

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
