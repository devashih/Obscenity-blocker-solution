const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { analyzeMedia } = require('./aiService');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { path, mimetype } = req.file;
        const analysisResult = await analyzeMedia(path, mimetype);

        // Clean up file after analysis
        fs.unlinkSync(path);

        if (analysisResult.length > 0) {
            return res.status(400).json({
                message: 'Obscene content detected! File has been blocked.',
                moderationLabels: analysisResult
            });
        }

        res.json({ message: 'File is safe.', moderationLabels: [] });
    } catch (error) {
        console.error('Error analyzing media:', error);
        res.status(500).json({ error: 'Failed to analyze media' });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));

const { sendAlert } = require('./alertService');

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const { path, mimetype } = req.file;
        const analysisResult = await analyzeMedia(path, mimetype);

        fs.unlinkSync(path);

        if (analysisResult.length > 0) {
            await sendAlert('authority@example.com', {
                filename: req.file.originalname,
                detectedLabels: analysisResult
            });

            return res.status(400).json({
                message: 'Obscene content detected! Authorities have been notified.',
                moderationLabels: analysisResult
            });
        }

        res.json({ message: 'File is safe.', moderationLabels: [] });
    } catch (error) {
        console.error('Error analyzing media:', error);
        res.status(500).json({ error: 'Failed to analyze media' });
    }
});
