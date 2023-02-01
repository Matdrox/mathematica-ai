// Create a react component that inputs a textarea message then performs a fetch request to localhost:5000, gets back a response as a data.message and displays that message in a box below
import React, { useState } from 'react';
var Latex = require('react-latex');

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
      });
  };

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='flex-col justify-center my-12 w-full text-white'>
        <h1 className='text-5xl text-center'>Mathematica AI</h1>
        <h2 className='text-xl text-center'>AI Math Helper</h2>
        <form className='flex justify-center my-4' onSubmit={handleSubmit}>
          <textarea
            className='h-12 w-1/2 resize-none rounded-l-md p-3 outline-0 text-black'
            required
            placeholder='Enter your math problem'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className='h-12 rounded-r-md px-4 py-2 bg-teal-800 font-bold'
            type='submit'
          >
            Solve
          </button>
        </form>

        <div className='flex justify-center'>
          <div className='flex-col w-2/3 h-96 p-3 rounded-md bg-white text-black'>
            <p className='w-full'>Solution:</p>
            <Latex>{response}</Latex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
