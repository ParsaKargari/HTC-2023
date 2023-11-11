import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [loginEmail, setLoginEmail] = useState('');

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('email', email);
        formData.append('name', name);
        formData.append('info', info);

        try {
            const response = await axios.post('http://localhost:8628/add_listing', formData, {
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

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', loginEmail);

        try {
            const response = await axios.post('http://localhost:8628/login_user', formData, {
             headers: {
                    'Content-Type': 'multipart/form-data'
                }
              });
            console.log('Login Response:', response.data);
            alert('Login successful');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Error during login');
        }
    };

    return (
        <div className="App">
            <h1>User Data Upload</h1>
            <form onSubmit={handleUpload}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                <textarea placeholder="Info" value={info} onChange={(e) => setInfo(e.target.value)} /><br />
                <input type="file" onChange={handleImageChange} /><br />
                <button type="submit">Upload Data</button>
            </form>

            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default App;
