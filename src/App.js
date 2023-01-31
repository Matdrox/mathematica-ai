import logo from './logo.svg';
import './App.css';
var Latex = require('react-latex');

function App() {
	// const func = '$$\\int x^3 , dx = \\frac{1}{4}x^4 + C_2$$'
    // '$$\int_0^2 (5xy + x^3) , dx = \left[5x^2y + \frac{1}{4}x^4 \right]_0^2 = (5 \cdot 2^2 y + \frac{1}{4} \cdot 2^4) - (5 \cdot 0^2 y + \frac{1}{4} \cdot 0^4) = \boxed{20 + 8}$$'
	
    return (
		<div className='App'>
			{/* <Latex>{func}</Latex> */}
      <Latex>$3\times 4$</Latex>

		</div>
	);
}

export default App;
