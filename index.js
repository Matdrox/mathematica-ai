// An express server that handles requests to the API coming in and responds with a json object, uses body parser and cors
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
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Say this is a test',
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  if (response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text });
  }
});

app.listen(port, () => console.log(`Server started on port ${port}`));
