import React, { useState, useEffect } from "react";
import axios from "axios";

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      // .get("https://trsfinder-backend.onrender.com/Products")
      axios.get('http://localhost:4001/Products')

      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data : ", error);
        if (error.response) {
          console.error("Error Data:", error.response.data);
          console.error("Error Status:", error.response.status);
          console.error("Error Headers:", error.response.headers);
        } else if (error.request) {
          console.error("Error Request:", error.request);
        } else {
          console.error("Error Message:", error.message);
        }
        console.error("Error Config:", error.config);



      });
  }, []);

  return <div>{data ? <p>Data loaded</p> : <p>Loading data...</p>}</div>;
}

export default DataFetcher;
