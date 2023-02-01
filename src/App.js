// Create a react component that inputs a textarea message then performs a fetch request to localhost:5000, gets back a response as a data.message and displays that message in a box below
import React, { useState } from 'react';

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
    <div>
      <form className='flex justify-center my-32' onSubmit={handleSubmit}>
        <textarea
          className='h-12 w-1/2 resize-none rounded-l-md p-3 outline-0'
          required
					placeholder='Enter your math problem'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className='h-12 rounded-r-md px-4 py-2 bg-teal-800 text-white'
          type='submit'
        >
          Solve
        </button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default App;
