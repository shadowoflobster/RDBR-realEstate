import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import './Listings.css';

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_TOKEN = process.env.REACT_APP_API_TOKEN;

  useEffect(() => {
    const fetchRealEstates = async () => {
      try {
        const response = await fetch('https://api.real-estate-manager.redberryinternship.ge/api/real-estates', {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
  
        const data = await response.json();
        console.log('Fetched listings:', data); // Log the fetched data
        setListings(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRealEstates();
  }, [API_TOKEN]);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="listingsDiv">
      {listings.length > 0 ? (
        listings.map((listing) => (
          <Card
  key={listing.id}
  cardImage={listing.image}  // Ensure the correct image property from the API is used
  cardPrice={listing.price}
  cardAddress={listing.address}
  cardBedrooms={listing.bedrooms}
  cardArea={listing.area}
  cardZip={listing.zip_code}
/>
        ))
      ) : (
        <p>No listings available.</p>
      )}
    </div>
  );
}

export default Listings;
