import React, { useState, useEffect } from 'react';
import Navbar2 from './Navbar2';
import '../styles/owner.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Ownerlogin = ({ ownerId }) => {
    const navigate = useNavigate();

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
    const [notifications, setNotifications] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [assignedHouses, setAssignedHouses] = useState([]);

    useEffect(() => {
        if (activeSection === 'dashboard') {
            fetchUploadedImages();
        } else if (activeSection === 'notifications') {
            fetchNotifications();
        } else if (activeSection === 'Rented') {
            fetchAssignedHouses();
        }
    }, [activeSection]);

    const handleAssignTenant = async (houseId, tenantId) => {
        console.log(houseId, tenantId);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.put(`http://localhost:5000/select-tenant/${houseId}/${tenantId}`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log(response.data);
            fetchNotifications();
        } catch (error) {
            console.error('Error assigning tenant:', error);
        }
    };

    const fetchAssignedHouses = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/login');
            return;
        }
        try {
            const response = await axios.get('http://localhost:5000/houses/assigned', {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setAssignedHouses(response.data);
        } catch (error) {
            console.error('Error fetching assigned houses:', error);
        }
    };

    const fetchUploadedImages = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.get('http://localhost:5000/uploads/owner', {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setUploadedImages(response.data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.get('http://localhost:5000/notifications', {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, photo: e.target.files[0] });
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

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.post('http://localhost:5000/uploads', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `${token}`
                }
            });
            setFormData({
                category: '',
                ownername: '',
                phoneno: '',
                cost: '',
                area: '',
                photo: null,
                description: ''
            });
            fetchUploadedImages();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleUnassignTenant = async (houseId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            }
            const response = await axios.put(`http://localhost:5000/unassign-tenant/${houseId}`, {}, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            console.log(response.data);
            fetchAssignedHouses();
        } catch (error) {
            console.error('Error unassigning tenant:', error);
        }
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
                return (
                    <div>
                        <h2>Rented Houses</h2>
                        <div>
                            {assignedHouses.length > 0 ? (
                                assignedHouses.map((house, index) => (
                                    <div key={index}>
                                        <h3>{house.category} - {house.ownername}</h3>
                                        <p><strong>Tenant Email:</strong> {house.currentTenant.email}</p>
                                        <p><strong>Cost:</strong> ${house.cost}</p>
                                        <button onClick={() => handleUnassignTenant(house._id)}>Unassign Tenant</button>
                                    </div>
                                ))
                            ) : (
                                <p>No houses are currently rented out.</p>
                            )}
                        </div>
                    </div>
                );

            case 'notifications':
                return (
                    <div>
                        <h2>Notifications</h2>
                        <div className="notifications-container">
                            {notifications.length > 0 ? (
                                notifications.map((notification, index) => (
                                    <div key={index} className="notification-card">
                                        <h3>House: {notification.houseName}</h3>
                                        <p><strong>Owner Name:</strong> {notification.ownerName}</p>
                                        <p><strong>House ID:</strong> {notification.houseId}</p>
                                        <h4>Applied Tenants:</h4>
                                        {notification.appliedTenants.length > 0 ? (
                                            notification.appliedTenants.map((tenant, idx) => (
                                                <div key={idx}>
                                                    <p>{tenant.email} has requested for this house.</p>
                                                    <button onClick={() => handleAssignTenant(notification.houseId, tenant._id)}>Assign</button>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No applicants for this house yet.</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No notifications available.</p>
                            )}
                        </div>
                    </div>
                );
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
                    <button className={activeSection === 'notifications' ? 'active' : ''} onClick={() => { setActiveSection('notifications'); setSelectedImage(null); }}>Notifications</button>
                </div>
                <div className="right-section">
                    {renderSection()}
                </div>
            </div>
        </div>
    );
};

export default Ownerlogin;
