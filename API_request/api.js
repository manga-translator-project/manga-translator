require('dotenv').config();  // install dotenv using npm install dotenv
const express = require('express');  // install express using npm install express
const app = express();
app.use(express.json());
const port = 3000;
const { GoogleGenerativeAI } = require('@google/generative-ai');  // install @google/generative-ai using npm install @google/generative-ai
const genAI = new GoogleGenerativeAI(process.env.API_KEY);   // import your key here which you will generate from google cloud go to api and services create credentials create api key



const LANGUAGES = {
    'af' : 'Afrikaans', 'sq' : 'Albanian', 'am' : 'Amharic', 'ar' : 'Arabic', 'hy' : 'Armenian', 'az' : 'Azerbaijani',
    'eu' : 'Basque', 'bn' : 'Bengali', 'bs' : 'Bosnian', 'bg' : 'Bulgarian', 'my' : 'Burmese',
    'ca' : 'Catalan', 'ceb' : 'Cebuano', 'zh' : 'Chinese (simplified)', 'zh-TW' : 'Chinese(Traditional)', 'co' : 'Corsican', 'hr' : 'Croatian', 'cs' : 'Czech',
    'da' : 'Danish', 'nl' : 'Dutch', 'en' : 'English', 'eo' : 'Esperanto', 'et' : 'Estonian',
    'tl' : 'Filipino(tagalog)', 'fi' : 'Finnish', 'fr' : 'French', 'fy' : 'Frisian',
    'gl' : 'Galician', 'ka' : 'Georgian', 'de' : 'German', 'el' : 'Greek', 'gu' : 'Gujarati',
    'ht' : 'Haitian creole', 'ha' : 'Hausa', 'haw' : 'Hawaiian', 'he' : 'Hebrew', 'hi' : 'Hindi', 'hmn' : 'Hmong', 'hu' : 'Hungarian',
    'is' : 'Icelandic', 'ig' : 'Igbo', 'ilo' : 'Ilocano', 'id' : 'Indonesian', 'ga' : 'Irish', 'it' : 'Italian',
    'ja' : 'Japanese', 'jv' : 'Javanese',
    'kn' : 'Kannada', 'kk' : 'Kazakh', 'km' : 'Khmer', 'rw' : 'Kinyarwanda', 'ko' : 'Korean', 'ku' : 'Kurdish(kurmanji)', 'ky' : 'Kyrgyz',
    'lo' : 'Lao', 'la' : 'Latin', 'lv' : 'Latvian', 'lt' : 'Lithuanian', 'lb' : 'Luxembourgish',
    'mk' : 'Macedonian', 'mg' : 'Malagasy', 'ms' : 'Malay', 'ml' : 'Malayalam', 'mt' : 'Maltese', 'mi' : 'Maori', 'mr' : 'Marathi', 'mn' : 'Mongolian',
    'ne' : 'Nepali', 'no' : 'Norwegian',
    'or' : 'Odia(Oriya)',
    'ps' : 'Pashto', 'fa' : 'Persian(Farsi)', 'pl' : 'Polish', 'pt' : 'Portuguese', 'pa' : 'Punjabi',
    'ro' : 'Romanian', 'ru' : 'Russian',
    'su' : 'Sundanese', 'sv' : 'Swedish', 'sw' : 'Swahili', 'sm' : 'Samoan', 'gd' : 'Scots Gaelic', 'sr' : 'Serbian', 'st' : 'Sesotho', 'sn' : 'Shona', 'sd' : 'Sindhi', 'si' : 'Sinhala', 'sk' : 'Slovak', 'so' : 'Somali',
    'es' : 'Spanish', 'tg' : 'Tajik', 'te' : 'Telugu', 'tr' : 'Turkish', 'ta' : 'Tamil', 'th' : 'Thai',
    'ur' : 'Urdu', 'uk' : 'Ukrainian', 'uz' : 'Uzbek',
    'vi' : 'Vietnamese', 'cy' : 'Welsh', 'xh' : 'Xhosa', 'yo' : 'Yoruba', 'yi' : 'Yiddish', 'zu' : 'Zulu'
};


function validateLanguage(req,res,next) {
    const { targetLanguage } = req.body;
    if(!LANGUAGES[targetLanguage]) return res.status(400).json({ message : "Invalid language" });
    next();
}
app.post("/translate", validateLanguage, async(req, res) => {
    try {
        const { text, targetLanguage } = req.body;
        if(!text || !targetLanguage) res.status(404).json({ message : "Enter the text" });
        const model = genAI.getGenerativeModel({ model : "gemini-2.5-pro" });
        const prompt = `
        Translate the following text to ${LANGUAGES[targetLanguage]}:
        """
        ${text}
        """


        Strictly follow these rules : 
        1.Output only the raw translation ONLY
        2.Output should be what asked only nothing else
        3.No commas or any other symbol unless given in my original text`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translatedText = response.text().trim();
        res.status(200).json({ translation : translatedText });
    } catch(error) {
        console.error("🚨 Full Error:", {
            message: error.message,
            stack: error.stack,
            requestBody: req.body
        });
        res.status(500).json({ message : "Server error" });
    }
});

app.listen(port,() => {
    console.log(`server is working on port ${port}`);
});