// An express server that handles requests to the API coming in and responds with a json object, uses body parser and cors
require('dotenv').config();

const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;
const configuration = new Configuration({
	organization: 'org-tuOiA1rN0intH8Us6sOieFSR',
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
	const { message, difficulty } = req.body;
	const response = await openai.createCompletion({
		model: 'text-davinci-003',
		//   prompt: `Without going over 170 characters, using LaTeX, write "Problem: " and generate a mathematical problem with ${difficulty} difficulty for me to solve
		// about ${message}. Then, write "Solution: " and solve the problem.`,
		prompt: `Using '$' in LaTeX, generate a mathematical problem with ${difficulty} difficulty about the topic of ${message} that I can solve`,

		max_tokens: 70,
		temperature: 0,
	});
	console.log(response.data.choices[0].text);
	console.log(response.data.choices);
	console.log(response.data.choices.length);
  console.log(difficulty, message)
	if (response.data.choices[0].text) {
		res.json({ message: response.data.choices[0].text });
	}
});

app.listen(port, () => console.log(`Server started on port ${port}`));
