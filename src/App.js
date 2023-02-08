// Create a react component that inputs a textarea message then performs a fetch request to localhost:5000, gets back a response as a data.message and displays that message in a box below
import React, { useState } from 'react';
import './App.css';
var Latex = require('react-latex');

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  // Split 'response' into two parts, the problem and the solution. The problem starts with 'Problem: ' and ends with 'Solution: ' and the solution starts with 'Solution: ' and ends with the end of the string
  // const problem = response.split('Solution: ')[0].replace('Problem: ', '');
  // const solution = response.split('Solution: ')[1];
  const problem = response;
  const solution = response;

  // Show value of 'difficulty' in console whenever it changes
  // useEffect(() => {
  //   console.log(difficulty);
  // }, [difficulty]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, difficulty }),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data.message);
      });
  };

  return (
    <div className='flex flex-col items-center my-12 w-full text-white'>
      <h1 className='text-5xl text-center'>Mathematica AI</h1>
      <h2 className='text-xl text-center'>Generate math problems with AI</h2>
      {/* <form
        className='flex justify-center text-center my-4'
        onSubmit={handleSubmit}
      > */}
      <form
        className='grid grid-cols-5 gap-4 content-center w-2/3 mt-10'
        onSubmit={handleSubmit}
      >
        <textarea
          className='h-12 col-span-4 block resize-none rounded-md p-3 !outline-none border-0 text-black'
          required
          placeholder="Enter a topic, e.g. Normal Distribution or Bayes' Theorem"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Dropdown menu that changes between Easy, Medium and Hard and saves the value using setDifficulty*/}
        <select
          className='h-11 col-span-1 block resize-none rounded-md p-3 outline-0 text-black bg-white'
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>

        <button
          className='h-12 col-start-3 rounded-md px-4 py-2 font-bold bg-black '
          type='submit'
        >
          Generate
        </button>
      </form>

      <div className='flex justify-center w-full mt-4'>
        <div className='h-96 w-2/3 p-3 rounded-md bg-white text-black '>
          <p className='w-full mb-4 text-center text-xl font-bold'>Problem</p>

          {/*Latex tag that renders the problem variable as a latex equation surrounded by '$$'*/}
          <div className='text-center text-2xl font-serif'>
            <Latex>{problem}</Latex>
          </div>

          <div className='flex justify-center mt-4'>
            <button
              className='h-12 w-1/4 mt-4 mb-2 rounded-md px-4 py-2 font-bold bg-black text-white'
              onClick={() => {
                document.getElementById('solution').classList.toggle('hidden');
              }}
            >
              Show Solution
            </button>
          </div>
          <div id='solution' className='hidden'>
            <p className='w-full mb-4 text-center text-xl font-bold text-bg-cyan'>
              Solution
            </p>
            <Latex>{'$$' + solution + '$$'}</Latex>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
