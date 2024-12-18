import React from 'react';

export const sendMsgToAI = async (msg) => {
  try {


    const spinnerContainer = document.createElement('div');
spinnerContainer.style = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  z-index: 9999;
`;

// Create the spinner element
const spinner = document.createElement('div');
spinner.textContent = 'Thinking🤔...';
spinner.style = `
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: white; /* White text for visibility */
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.8); /* Slightly opaque background for text */
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

// Append the spinner to the container
spinnerContainer.appendChild(spinner);

// Append the container to the document body
document.body.appendChild(spinnerContainer);


    const apiResponse = await fetch(`http://localhost:5000/api/scientific-name?query=${encodeURIComponent(msg)}`);
    const apiData = await apiResponse.json();


    document.body.removeChild(spinnerContainer);

    // Extract scientific name and description from API response
    const scientificName = apiData.scientificName;
    const intents = apiData.intents
    const description = apiData.detailedAnswer;
    const hasall = apiData.hasAllIntents;

    // Fetch the herb data from the local JSON file
    const response = await fetch('/herb_data.json');
    const data = await response.json();

    // Check if the herb exists in the JSON data using the scientific name
    const herb = data[scientificName];

    // Fetch the image from the custom API
    const imageResponse = await fetch(`http://localhost:5000/api/Gimages?query=${encodeURIComponent(msg)}`);
    const imageData = await imageResponse.json();
    const imageUrl = imageData.imageUrl;

     // Remove the loading spinner
   

    // Return JSX with minimalist format
    return (
      <div style={{ fontFamily: 'Arial, sans-serif' }}>
        <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '5px', marginBottom: '10px' }}>Herb Details</h2>
        
        {hasall && intents.includes("Scientific Name") && (
          <div style={{ marginBottom: '10px' }}>
            {imageUrl ? (
              <div>
                <img 
                  src={imageUrl} 
                  alt={msg} 
                  style={{ 
                    width: '250px', 
                    height: '250px', 
                    objectFit: 'cover', 
                    borderRadius: '4px'
                  }} 
                />
              </div>
            ) : (
              <p>No image available</p>
            )}
          </div>
        )}

        {intents.includes("Scientific Name") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Scientific Name</h3>
            <p style={{ paddingLeft: '10px' }}>{herb['Scientific Name']}</p>
          </div>
        )}

        {intents.includes("Genus") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Genus</h3>
            <p style={{ paddingLeft: '10px' }}>{herb.Genus}</p>
          </div>
        )}

        {intents.includes("Species") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Species</h3>
            <p style={{ paddingLeft: '10px' }}>{herb.Species}</p>
          </div>
        )}

        {intents.includes("Family") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Family</h3>
            <p style={{ paddingLeft: '10px' }}>{herb.Family}</p>
          </div>
        )}

        {intents.includes("Phytochemicals") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Phytochemicals</h3>
            <p style={{ paddingLeft: '10px' }}>{herb.Phytochemicals.join(', ')}</p>
          </div>
        )}

        {intents.includes("Ailments Cured") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Ailments Cured</h3>
            <p style={{ paddingLeft: '10px' }}>{herb['Ailments cured'].join(', ')}</p>
          </div>
        )}

        {intents.includes("Plant Parts and Method of Use") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Plant Parts and Method of Use</h3>
            <p style={{ paddingLeft: '10px' }}>{herb['Plant parts and method of its use']}</p>
          </div>
        )}

        {intents.includes("Vernacular Name") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Vernacular Names</h3>
            <p style={{ paddingLeft: '10px' }}>{herb['Vernacular name'].join(', ')}</p>
          </div>
        )}

        {intents.includes("Statewise Availability") && (
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '3px' }}>Statewise Availability</h3>
            <p style={{ paddingLeft: '10px' }}>{herb['Statewise availability'].join(', ')}</p>
          </div>
        )}

        <div style={{ marginTop: '10px' }}>
          <h3 style={{ fontWeight: 'bold', borderBottom: '1px solid #333', paddingBottom: '3px', marginBottom: '5px' }}>Description</h3>
          <p style={{ whiteSpace: 'pre-line', lineHeight: '1.5', paddingLeft: '10px' }}>{description}</p>
        </div>
      </div>
    );
    
  } catch (error) {
    console.log(error);
    return <p>Error fetching herb data.</p>;
  }
};