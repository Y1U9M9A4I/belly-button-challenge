// Build the metadata panel

let samples;
function initDash() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    samples = data.samples;
    
    initDropdown(samples);
    const firstsamp = samples[0];

    buildCharts(firstsamp);
    buildMetadata(firstsamp);

    d3.select('#selDataset').on('change', dropdownChange);
  }).catch((error) => {
    console.error("Error loading JSON data:", error);
  });
}

// function for run on page load 

function init() {
  let dropdownmenu = d3.select('#selDataset');
  if (samples && Array.isArray(samples) && samples.length > 0) {
    let choice = d3.select('#selDataset');

    samples.forEach(sample => {
      choice.append('option').text(sample.id).property('value', sample.id);
    });

    let firstsamp = samples [0];
    buildCharts(firstsamp);
    buildMetadata(firstsamp);
  } else {
    console.error("Invalid or empty samples data");
  }
}

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

// function to build bubble chart
function buildBubblePlot(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

  const samples = data.samples;

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

  });
};

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
initDash()

// function to build bar plot
function buildBarPlot(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

  let samples = data.samples;

    // Filter the samples for the object with the desired sample number

  let sampledata = samples.filter(sampleObj => sampleObj.id === sample)[0];

    // Get the otu_ids, otu_labels, and sample_values

  let otuids = sampledata.otu_ids.slice(0,10).reverse(); 
  let otulabels = sampledata.otu_labels.slice(0,10).reverse();
  let sampvals = sampledata.sample_values.slice(0,10).reverse();

    // Build a Bar Plot
  
  let bardata = [{
    x: sampvals,
    y: otuids.map(otuID => `OTU ${otuID}`),
    text: otulabels,
    type: 'bar',
    orientation: 'h'
  }];

  let barlayout = {
    title: 'Top 10 Bacteria Cultures Found',
    xaxis: { title: 'Number of Bacteria'},
    yaxis: { title: 'OTU ID'}
  };
    // Render the Bar Plot
  Plotly.newPlot('bar', bardata, barlayout);
}).catch(error => console.log(error));
}
initDropdown();

function dropdownChange() {
  let selectedSample = d3.select('#selDataset').property('value');
  buildBarPlot(selectedSample);
}
// Function to run on page load

// Initialize the dashboard
init();