const express = require("express");
const router = express.Router();
const { Translate } = require("@google-cloud/translate").v2;


router.post("/translate", (req, res) => {

const textToTranslate = req.body.translationText;
const language = req.body.translationLanguage;

console.log("language is: " + language)
console.log("textToTranslate is: " + textToTranslate)

const translate = new Translate();

async function translateMyText(text, target) {
    let [translatedText, metadata] = await translate.translate(text, target);
    console.log(translatedText); // This should log 'Hola'
    res.json({ translatedText }); // Send the translated text as JSON to frontend
}

translateMyText(textToTranslate, language);
});

module.exports = router;