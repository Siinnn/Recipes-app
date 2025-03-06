import React, { useState } from 'react'; // Importing React and useState hook

// Defining the interface for the SearchBar props
interface SearchBarProps {
  onSearch: (query: string) => void; // Function to handle the search query
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(''); // State to store the search query

  // Function to handle changes in the input field
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value); // Updating the state with the new query value
    onSearch(value); // Calling the onSearch function passed via props
  };

  return (
    <div>
      <input
        type="text"
        value={query} // Setting the value of the input to the state query
        onChange={handleChange} // Handling the input change event
        placeholder="Search by name or ingredient..." // Placeholder text for the search bar
        style={{ padding: '8px', width: '100%', marginBottom: '10px' }} // Inline styling for the input field
      />
    </div>
  );
};

export default SearchBar; // Exporting the SearchBar component
