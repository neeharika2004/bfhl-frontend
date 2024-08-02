import React, { useState } from 'react';
import './App.css';
import Select from 'react-select';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState([]);

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous error
    try {
      const parsedInput = JSON.parse(jsonInput);
      const apiResponse = await fetch('https://bfhl-backend-aoct.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput),
      });

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! status: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  const handleFilterChange = (selectedOptions) => {
    setFilter(selectedOptions.map(option => option.value));
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = [
      { value: 'numbers', label: 'Numbers' },
      { value: 'alphabets', label: 'Alphabets' },
      { value: 'highest_alphabet', label: 'Highest Alphabet' }
    ];

    const filteredResponse = {};
    filter.forEach(key => {
      filteredResponse[key] = response[key];
    });

    return (
      <div>
        <h2>Response:</h2>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>AP21110011417</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            id="jsonInput"
            name="jsonInput"
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Enter JSON data"
            rows="10"
            cols="50"
          />
          <button type="submit">Submit</button>
        </form>
        {error && <div className="error">{error}</div>}
        <Select
          isMulti
          options={[
            { value: 'numbers', label: 'Numbers' },
            { value: 'alphabets', label: 'Alphabets' },
            { value: 'highest_alphabet', label: 'Highest Alphabet' }
          ]}
          onChange={handleFilterChange}
          placeholder="Select filters"
        />
        {renderResponse()}
      </header>
    </div>
  );
}

export default App;
