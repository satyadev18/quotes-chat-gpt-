
const { Configuration, OpenAIApi } = require("openai")
const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

//express
const app = express();
app.use(cors());
dotenv.config()

app.use( bodyParser.json())



const configuration = new Configuration({
    organization: "org-wY1f4DriP3pWl3LVhnN1SJeH",
    apiKey: process.env.API_KEY
});

const openai = new OpenAIApi(configuration);



const port = process.env.PORT ;

app.post('/', async (req,res)=>{
    const {person,topic} = req.body;

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `write 10 best quotes by ${person} on ${topic}`,
        max_tokens: 1000,
        temperature: 0,
    });
      res.json({
        message:response.data.choices[0].text})

    });

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
