import React, { useState } from "react";
import axios from "axios";

function Autocomplete() {
  const [query, setQuery] = useState("");



  
  const [predictions, setPredictions] = useState([]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);

    axios
      .get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
        params: {
          input: event.target.value, // Your input
          key: "AIzaSyAnQKOhhSxTuxexCIen54OvE8c0ItuhPkQY",
        },
      })
      .then((response) => {
        // Handle the response data here
        console.log(response.data, setPredictions);
        setPredictions(response.data.predictions);
      })
      .catch((error) => {
        // Handle errors here
        console.log(error);
      });
    // // Make a request to the Google Places Autocomplete API

    //     axios
    //       .get(
    //         `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${event.target.value}&key=AIzaSyAnQKOhhSxTuxexCIen54OvE8c0ItuhPkQY`
    //       )
    //       .then((response) => {
    //         setPredictions(response.data.predictions);
    //         console.log(response);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a location"
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {predictions.map((prediction) => (
          <li key={prediction.id}>{prediction.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default Autocomplete;
