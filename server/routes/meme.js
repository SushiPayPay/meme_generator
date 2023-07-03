var express = require("express");
var axios = require('axios');
var fs = require("fs");
var path = require('path');
var Jimp = require("jimp");
var router = express.Router();
require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const memeDirectory = path.join(__dirname, '../data/');

if (!fs.existsSync(memeDirectory)) {
    fs.mkdirSync(memeDirectory, { recursive: true });
}

// Serve the data directory as a static folder
router.use(express.static(memeDirectory));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/', function (req, res) {
    fs.readdir(memeDirectory, (err, files) => {
      if (err) {
        console.error('Error reading meme directory:', err);
        return res.status(500).json({ error: 'An error occurred while reading the meme directory.' });
      }
  
      const urlExtensions = files.map((file) => `/meme/${file}`);
  
      res.status(200).json({ urlExtensions });
    });
});

router.post('/', async function(req, res) {
    const prompt = req.body.text;
    
    const id = Date.now();
    
    const GPTPromptBase = `
    you are an edgy AI powered image macro generator. 
    you are given a meme prompt, and in response you need to generate a top_text and bottom_text as a JSON object. 
    captions should be about 5 words each. 
    you should use the prompt to generate puns, employ ironic humor, and generally be witty in your response. 
    Be concise. 
    Return only the JSON object.
    Prompt: 
    `;
    
    const GPTPrompt = GPTPromptBase + prompt;
    
    let topText, bottomText;
    
    try {
        const GPTResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: GPTPrompt }],
        });
      
        const responseMessage = GPTResponse.data.choices[0].message;
      
        if (!responseMessage || !responseMessage.content) {
            return res.status(500).json({ error: 'Invalid response from GPT-3.5 Turbo' });
        }
      
        let memeTextJSON;
        try {
            memeTextJSON = JSON.parse(responseMessage.content);
        } catch (error) {
            console.error('Error parsing meme text JSON:', error);
            return res.status(500).json({ error: 'Invalid meme text JSON format' });
        }
      
        if (!memeTextJSON || !memeTextJSON.top_text || !memeTextJSON.bottom_text) {
            return res.status(500).json({ error: 'Invalid meme text JSON format' });
        }
      
        topText = memeTextJSON.top_text;
        bottomText = memeTextJSON.bottom_text;

    } catch (error) {
        console.error('Error generating meme text:', error);
        return res.status(500).json({ error: 'An error occurred while generating the meme text' });
    }
    
    const DallEPrompt = prompt + ` monochrome, ms-paint`;
    
    let rawImageURL, rawFileName, rawFilePath;
    
    try {
        const DallEResponse = await openai.createImage({
            prompt: DallEPrompt,
            n: 1,
            size: "512x512",
        });
    
        rawImageURL = DallEResponse.data.data[0].url;
    
        rawFileName = `raw_${id}.jpg`;
        rawFilePath = path.join(__dirname, '..', 'data', rawFileName);
    } catch (error) {
        console.error('Error creating image:', error);
        return res.status(500).json({ error: 'An error occurred while creating the image.' });
    }
    
    try {
        const response = await axios.get(rawImageURL, {
          responseType: 'arraybuffer',
        });
    
        fs.writeFileSync(rawFilePath, response.data);

        // Load the Jimp fonts
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK); // Load the font (Change this to your desired font)

        // Read the image with Jimp
        let image = await Jimp.read(rawFilePath);

        // Overlay the text onto the image
        image.print(font, 10, 10, topText) // Position the texts as needed
                .print(font, 10, 60, bottomText);

    
        const memeFileName = `meme_${id}.jpg`;
        const memeFilePath = path.join(__dirname, '..', 'data', memeFileName);

        // Write the modified image to disk
        await image.writeAsync(memeFilePath);

        // Delete the original image file
        fs.unlinkSync(rawFilePath);

        const urlExtension = `/meme/${memeFileName}`;

        res.status(200).json({ urlExtension });
    
      } catch (error) {
        console.error('Error downloading image:', error);

        if (fs.existsSync(rawFilePath)) {
            fs.unlinkSync(rawFilePath);
        }

        return res.status(500).json({ error: 'An error occurred while downloading the image.' });
      }
});

module.exports = router;