// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [info, setInfo] = useState('');

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('phone', phone);
        formData.append('info', info);

        try {
            const response = await axios.post('http://localhost:8628/add_user', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
            alert('Data uploaded successfully');
        } catch (error) {
            console.error('Error during data upload:', error);
            alert('Error during data upload');
        }
    };

    return (
        <div className="App">
            <h1>User Data Upload</h1>
            <form onSubmit={handleUpload}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                <textarea placeholder="Info" value={info} onChange={(e) => setInfo(e.target.value)} /><br />
                <input type="file" onChange={handleImageChange} /><br />
                <button type="submit">Upload Data</button>
            </form>
        </div>
    );
}

export default App;
