import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const LocationDropdown = ({ onSelect }) => {
  const [address, setAddress] = useState(''); // Initialize the address state

  const handleSelect = (selectedAddress) => {
    setAddress(selectedAddress); // Update the address state
    geocodeByAddress(selectedAddress)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        // Handle the selected location here
        onSelect({ lat, lng, address: selectedAddress });
      })
      .catch((error) => console.error('Error', error));
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps }) => (
        <div>
          <input {...getInputProps()} />
          <div>
            {suggestions.map((suggestion) => (
              <div {...getSuggestionItemProps(suggestion)}>
                {suggestion.description}
              </div>
            ))}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationDropdown;
