

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://us-central1-hydra-express.cloudfunctions.net/app/home/products/all');
        console.log('API Response:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Display the fetched data */}
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default MyComponent;
