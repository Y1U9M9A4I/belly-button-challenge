// fx to initialize dash
function init() {
  // Read the samples.json file using D3
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
      // Extract data from the JSON file
      var samples = data.samples;
      var metadata = data.metadata;

      // Create dropdown menu options
      var dropdown = d3.select("#selDataset");
      samples.forEach(sample => {
          dropdown.append("option").text(sample.id).property("value", sample.id);
      });

      // Initialize the dashboard with the first sample
      var initialSample = samples[0];
      updateCharts(initialSample, metadata[0]);
  }).catch(error => {
      console.log("Error loading the data: " + error);
  });
}

// Function to update the charts based on the selected sample
function updateCharts(sample, metadata) {
  // Create the horizontal bar chart
  var barData = [{
      y: sample.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      x: sample.sample_values.slice(0, 10).reverse(),
      text: sample.otu_labels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h"
  }];

  var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      xaxis: { title: "Number of Bacteria" },
  };

  Plotly.newPlot("bar", barData, barLayout);

  // Create the bubble chart
  var bubData = [{
      x: sample.otu_ids,
      y: sample.sample_values,
      text: sample.otu_labels,
      mode: "markers",
      marker: {
          size: sample.sample_values,
          color: sample.otu_ids,
          colorscale: "Earth"
      }
  }];

  var bubLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Number of Bacteria" }
  };

  Plotly.newPlot("bubble", bubData, bubLayout);

  // Display the sample metadata
  var metadataPanel = d3.select("#sample-metadata");
  metadataPanel.html("");
  Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
  });
}

// Event listener for dropdown change
function optionChanged(selectedSample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
      var samples = data.samples;
      var metadata = data.metadata;
      var selectedSampleData = samples.find(sample => sample.id === selectedSample);
      var selectedMetadata = metadata.find(item => item.id === parseInt(selectedSample));

      updateCharts(selectedSampleData, selectedMetadata);
  });
}

// Initialize the dashboard
init();