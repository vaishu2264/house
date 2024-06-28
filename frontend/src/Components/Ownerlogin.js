import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import '../styles/owner.css';
import axios from 'axios';

const Ownerlogin = ({ ownerId }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [formData, setFormData] = useState({
        category: '',
        ownername: '',
        phoneno: '',
        cost: '',
        area: '',
        photo: null,
        description: ''
    });
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        if (activeSection === 'dashboard') {
            fetchUploadedImages();
        }
    }, [activeSection]);

    const fetchUploadedImages = async () => {
        try {
            const ownerId = localStorage.getItem("ownerId")
            const response = await axios.get(`http://localhost:5000/uploads/owner/${ownerId}`);
            setUploadedImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
        console.log(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const wordCount = formData.description.trim().split(/\s+/).length;
        if (wordCount > 250) {
            alert('Description must not exceed 250 words.');
            return;
        }

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        data.append('ownerId', localStorage.getItem("ownerId"));

        try {
            const response = await axios.post('http://localhost:5000/uploads', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('upload done', response.data);
            setFormData({
                category: '',
                ownername: '',
                phoneno: '',
                cost: '',
                area: '',
                photo: null,
                description: '',
            });
            fetchUploadedImages();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const renderSection = () => {
        if (selectedImage) {
            return renderImageDetails();
        }

        switch (activeSection) {
            case 'dashboard':
                return (
                    <div>
                        <h2><b>Welcome</b></h2>
                        <div className="images-container">
                            {uploadedImages.length > 0 ? (
                                uploadedImages.map((image, index) => (
                                    <div key={index} className="image-card" onClick={() => handleImageClick(image)}>
                                        <img src={`http://localhost:5000/images/${image.photo}`} alt={image.description} />
                                    </div>
                                ))
                            ) : (
                                <p>No images uploaded yet.</p>
                            )}
                        </div>
                    </div>
                );
            case 'upload':
                return (
                    <div>
                        <h2>Upload House Details</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                className="input-field"
                            >
                                <option value="">Select Category</option>
                                <option value="Apartment">Apartment</option>
                                <option value="House">House</option>
                                <option value="Villa">Villa</option>
                            </select>
                            <label htmlFor="ownername">Owner Name:</label>
                            <input
                                type="text"
                                id="ownername"
                                name="ownername"
                                value={formData.ownername}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                            <label htmlFor="phoneno">Phone Number:</label>
                            <input
                                type="tel"
                                id="phoneno"
                                name="phoneno"
                                value={formData.phoneno}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                            <label htmlFor="cost">Cost:</label>
                            <input
                                type="text"
                                id="cost"
                                name="cost"
                                value={formData.cost}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                            <label htmlFor="area">Area:</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                value={formData.area}
                                onChange={handleInputChange}
                                className="input-field"
                            />
                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="input-field"
                                rows="10"
                            />
                            <label htmlFor="photo">Photo:</label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handleFileChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                );
            case 'Rented':
                return <div>empty</div>;
            default:
                return <div>Welcome to the Owner Dashboard!</div>;
        }
    };

    const renderImageDetails = () => {
        if (!selectedImage) {
            return null;
        }
        return (
            <div className="image-details">
                <div className="back-arrow" onClick={() => setSelectedImage(null)}>←</div>
                <img src={`http://localhost:5000/images/${selectedImage.photo}`} alt={selectedImage.description} className="selected-image" />
                <div className="details">
                    <p><strong>Category:</strong> {selectedImage.category}</p>
                    <p><strong>Owner Name:</strong> {selectedImage.ownername}</p>
                    <p><strong>Phone Number:</strong> {selectedImage.phoneno}</p>
                    <p><strong>Cost:</strong> {selectedImage.cost}</p>
                    <p><strong>Area:</strong> {selectedImage.area}</p>
                    <p><strong>Description:</strong> {selectedImage.description}</p>
                </div>
            </div>
        );
    };
    

    return (
        <div>
            <Navbar2 />
            <div className="owner-container">
                <div className="left-section">
                    <button className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => { setActiveSection('dashboard'); setSelectedImage(null); }}>Dashboard</button>
                    <button className={activeSection === 'upload' ? 'active' : ''} onClick={() => { setActiveSection('upload'); setSelectedImage(null); }}>Upload</button>
                    <button className={activeSection === 'Rented' ? 'active' : ''} onClick={() => { setActiveSection('Rented'); setSelectedImage(null); }}>Rented</button>
                </div>
                <div className="right-section">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default Ownerlogin;
