import React, { useState } from 'react';
//import './app.css';

function App() {
    const [file, setFile] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('http://localhost:5000/upload', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <h1>Obscenity Blocker</h1>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default App;
