const express = require("express");
const router = express.Router();

router.post("/synthesize", (req, res) => {
    
    const fs = require("fs");

    // Imports the Google Cloud client library
    const textToSpeech = require("@google-cloud/text-to-speech");

    // Creates a client
    const client = new textToSpeech.TextToSpeechClient();

    // Use text from frontend
    const text = req.body.text;

    // Construct the request
    const request = {
    input: { text: text },
    // Select the language and SSML Voice Gender (optional)
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    // Select the type of audio encoding
    audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the Text-to-Speech request
    client.synthesizeSpeech(request, (err, response) => {
        if (err) {
        console.error("ERROR:", err);
        return res.status(500).send("Error synthesizing speech.");
        }

        res.send(response.audioContent);

    });
});

module.exports = router;