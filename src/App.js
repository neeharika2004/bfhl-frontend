import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const options = [
  { value: 'numbers', label: 'Numbers' },
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'highest_alphabet', label: 'Highest Alphabet' }
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://your-app-name.herokuapp.com/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonInput,
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredResponse = response ? {
    numbers: selectedOptions.some(option => option.value === 'numbers') ? response.numbers : [],
    alphabets: selectedOptions.some(option => option.value === 'alphabets') ? response.alphabets : [],
    highest_alphabet: selectedOptions.some(option => option.value === 'highest_alphabet') ? response.highest_alphabet : []
  } : null;

  return (
    <div className="App">
      <header className="App-header">
        <h1>{response?.roll_number}</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON'
            rows={10}
            cols={50}
          />
          <button type="submit">Submit</button>
        </form>
        {response && (
          <>
            <Select
              isMulti
              options={options}
              onChange={setSelectedOptions}
            />
            <div>
              <h2>Filtered Response</h2>
              {filteredResponse.numbers.length > 0 && (
                <p>Numbers: {filteredResponse.numbers.join(',')}</p>
              )}
              {filteredResponse.alphabets.length > 0 && (
                <p>Alphabets: {filteredResponse.alphabets.join(',')}</p>
              )}
              {filteredResponse.highest_alphabet.length > 0 && (
                <p>Highest Alphabet: {filteredResponse.highest_alphabet.join(',')}</p>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
}

export default App;
