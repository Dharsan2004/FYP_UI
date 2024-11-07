import React from 'react';

export const sendMsgToAI = async (msg) => {
  try {
    // Fetch the scientific name and description from the custom API
   const apiResponse = await fetch(`http://localhost:5000/api/scientific-name?query=${encodeURIComponent(msg)}`);
  // const apiResponse = await fetch(`https://fyp-backend-cg3s.onrender.com/api/scientific-name?query=${encodeURIComponent(msg)}`);
    const apiData = await apiResponse.json();

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
    const imageResponse = await fetch(`http://localhost:5000/api/images?query=${encodeURIComponent(msg)}`);

  //  const imageResponse = await fetch(`https://fyp-backend-cg3s.onrender.com/api/images?query=${encodeURIComponent(msg)}`);
    const imageData = await imageResponse.json();
    const imageUrl = imageData.imageUrl;

    // Return JSX including the image and herb details
    return (
      <div>
        <h3>Herb Details</h3>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '5px' }}>Property</th>
              <th style={{ border: '1px solid black', padding: '5px' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {hasall && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Image</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>
                  {imageUrl ? (
                    <img src={imageUrl} alt={msg} style={{ width: '300px', height: 'auto' }} />
                  ) : (
                    <p>No image available</p>
                  )}
                </td>
              </tr>
            )}
            {intents.includes("Scientific Name") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Scientific Name</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb['Scientific Name']}</td>
              </tr>
            )}
            {intents.includes("Genus") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Genus</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb.Genus}</td>
              </tr>
            )}
            {intents.includes("Species") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Species</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb.Species}</td>
              </tr>
            )}
            {intents.includes("Family") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Family</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb.Family}</td>
              </tr>
            )}
            {intents.includes("Phytochemicals") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Phytochemicals</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb.Phytochemicals.join(', ')}</td>
              </tr>
            )}
            {intents.includes("Ailments Cured") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Ailments Cured</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb['Ailments cured'].join(', ')}</td>
              </tr>
            )}
            {intents.includes("Plant Parts and Method of Use") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Plant Parts and Method of Use</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb['Plant parts and method of its use']}</td>
              </tr>
            )}
            {intents.includes("Vernacular Name") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Vernacular Names</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb['Vernacular name'].join(', ')}</td>
              </tr>
            )}
            {intents.includes("Statewise Availability") && (
              <tr>
                <td style={{ border: '1px solid black', padding: '5px' }}>Statewise Availability</td>
                <td style={{ border: '1px solid black', padding: '5px' }}>{herb['Statewise availability'].join(', ')}</td>
              </tr>
            )}
          </tbody>
        </table>
    
        {/* Display the description below the table in a paragraph */}
        <h3>Description</h3>
        <p style={{ whiteSpace: 'pre-line', marginTop: '10px' }}>{description}</p>
      </div>
    );
    
  } catch (error) {
    console.log(error);
    return <p>Error fetching herb data.</p>;
  }
};