import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import Footer from '../Navbar-and-Footer/Footer';
import Loader from '../Loader/Loader';
import { locationFetch } from '../../Slices/Products/LocationSlice';

const Location = () => {
  const scanLocation = useLocation();
  const queryParams = new URLSearchParams(scanLocation.search);
  const location_unique_id = queryParams.get('location_unique_id');
  console.log(location_unique_id);

  const dispatch = useDispatch();
  const { items: details, status, error } = useSelector((state) => state.locations);
  console.log(details.rows);

  useEffect(() => {
    if (location_unique_id) {
      dispatch(locationFetch({ location_unique_id }));
    }
  }, [dispatch, location_unique_id]);

  if (!location_unique_id) {
    // Render a loading state or handle the absence of location_unique_id
    return <div>Loading...</div>;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {details.rows && details.rows.length > 0 ? (
        <div>
          {details.rows.map((row) => (
            <div key={row.unique_id}>
              <p>{row.name}</p>
              <p>{row.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>No items found.</div>
      )}
      <Footer />
    </div>
  );
};

export default Location;
