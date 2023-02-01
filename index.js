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
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    // prompt: `If a mathematical problem is not provided, answer with 'No'.
	// Otherwise, if a mathematical problem is provided, answer it very shortly without text, only in LaTeX: ${message}.`,
	prompt: `Answer using LaTeX: Generate a mathematical problem for me to solve about ${message}.`,
    max_tokens: 20,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  if (response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
