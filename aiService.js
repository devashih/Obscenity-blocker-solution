const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const rekognition = new AWS.Rekognition();

async function analyzeImage(imageBuffer) {
    const params = {
        Image: { Bytes: imageBuffer },
        MinConfidence: 70
    };
    try {
        const response = await rekognition.detectModerationLabels(params).promise();
        return response.ModerationLabels;
    } catch (error) {
        console.error('Image analysis failed:', error);
        return [];
    }
}

const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
const fs = require('fs');

async function analyzeAudio(audioPath) {
    const audio = { content: fs.readFileSync(audioPath).toString('base64') };
    const config = { encoding: 'LINEAR16', languageCode: 'en-US' };
    const request = { audio, config };
    try {
        const [response] = await client.recognize(request);
        return response.results.map(r => r.alternatives[0].transcript).join(' ');
    } catch (error) {
        console.error('Audio analysis failed:', error);
        return '';
    }
}

const fs = require('fs');
async function analyzeMedia(filePath, mimeType) {
    if (mimeType.startsWith('image')) {
        const imageBuffer = fs.readFileSync(filePath);
        return await analyzeImage(imageBuffer);
    } else if (mimeType.startsWith('audio')) {
        return await analyzeAudio(filePath);
    } else {
        return 'Unsupported media type';
    }
}
module.exports = { analyzeMedia };