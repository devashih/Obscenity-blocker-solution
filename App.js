import React, { useState } from 'react';
import './App.css';

function App() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (response.status === 400) {
                alert("Obscene content detected! File has been blocked.");
            } else {
                alert("File uploaded successfully.");
            }

            setResult(data);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to analyze the file.");
        }
    };

    return (
        <div>
            <h1>Obscenity Blocker</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>

            {result && result.moderationLabels && result.moderationLabels.length > 0 && (
                <div style={{ color: "red" }}>
                    <h3>Obscene Content Detected!</h3>
                    <ul>
                        {result.moderationLabels.map((label, index) => (
                            <li key={index}>{label.Name} (Confidence: {label.Confidence.toFixed(2)}%)</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
