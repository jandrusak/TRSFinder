import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataFetcher() {
    const [data, setData] = useState(null);

    useEffect(() => {
      axios.get('https://trsfinder-backend.onrender.com/Products')
        .then(response => {
          setData(response.data);
        })  
        .catch(error => {
          console.error('Error fetching data : ', error);
        });
      }, []);
  
  return (
    <div>
    {data ? <p>Data loaded</p> : <p>Loading data...</p>}
    </div>
  );
}

export default DataFetcher;