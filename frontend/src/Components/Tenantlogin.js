import { React, useState, useEffect } from 'react'
import Navbar2 from './Navbar2'
import axios from 'axios'
import '../styles/tenant.css'
import { useNavigate } from 'react-router-dom'

const Tenantlogin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [allImages, setUploadedImages] = useState([]);
  const [rentedHouses, setRentedHouses] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [requestedHouses, setRequestedHouses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeSection === 'dashboard') {
      fetchAllImages();
    } else if (activeSection === 'Rented') {
      fetchRentedHouses();
    } else if (activeSection === 'Requested') {
      fetchRequestedHouses();
    }
  }, [activeSection]);

  const fetchAllImages = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/active-openings', {
        headers: {
          'Authorization': `${token}`
        }
      });
      setUploadedImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };


  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBookClick = async () => {
    if (!selectedImage) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.post(`http://localhost:5000/add/${selectedImage._id}`, null, {
        headers: {
          'Authorization': `${token}`
        }
      });
      console.log('Request submitted successfully:', response.data);
    } catch (error) {
      console.error('Error requesting house:', error);
    }
  };

  const fetchRequestedHouses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login')
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/requested', {
        headers: { Authorization: `${token}` }
      });
      setRequestedHouses(response.data);
    } catch (error) {
      console.error('Error fetching requested houses:', error);
    }
  };

  const fetchRentedHouses = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/active-notifications', {
        headers: {
          'Authorization': `${token}`
        }
      });
      setRentedHouses(response.data);
    } catch (error) {
      console.error('Error fetching rented houses:', error);
    }
  };


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderSection = () => {
    if (selectedImage) {
      return renderImageDetails();
    }

    if (selectedCategory) {
      const filteredImages = allImages.filter(image => image.category.toLowerCase() === selectedCategory.toLowerCase());
      return (
        <div>
          <h2><b>{selectedCategory}</b></h2>
          <div className="images-container">
            {filteredImages.length > 0 ? (
              filteredImages.map((image, index) => (
                <div key={index} className="image-card" onClick={() => handleImageClick(image)}>
                  <img src={`http://localhost:5000/images/${image.photo}`} alt={image.description} />
                  <p>{image.description}</p>
                </div>
              ))
            ) : (
              <p>No images available for {selectedCategory}.</p>
            )}
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case 'dashboard':
        return (
          <div>
            <h2><b>Welcome</b></h2>
            <div className="category-container">
              <div className="category-card" onClick={() => handleCategoryClick('House')}>
                <img src="/path/to/house-image.jpg" alt="House" />
                <p>House</p>
              </div>
              <div className="category-card" onClick={() => handleCategoryClick('Villa')}>
                <img src="/path/to/villa-image.jpg" alt="Villa" />
                <p>Villa</p>
              </div>
              <div className="category-card" onClick={() => handleCategoryClick('Apartment')}>
                <img src="/path/to/apartment-image.jpg" alt="Apartment" />
                <p>Apartment</p>
              </div>
            </div>
          </div>
        );
      case 'Requested':
        return (
          <div>
            <h2>Requested Houses</h2>
            <div className="requested-houses-container">
              {requestedHouses.length > 0 ? (
                requestedHouses.map((house, index) => (
                  <div key={index} className="requested-house-card">
                    <img src={`http://localhost:5000/images/${house.photo}`} alt={house.description} className="requested-house-image" />
                    <h3>{house.category} - {house.ownername}</h3>
                    <p><strong>Cost:</strong> ${house.cost}</p>
                    <p><strong>Area:</strong> {house.area}</p>
                    <p><strong>Description:</strong> {house.description}</p>
                  </div>
                ))
              ) : (
                <p>Not Found Any Such House</p>
              )}
            </div>
          </div>
        );
      case 'Rented':
        return (
          <div>
            <h2>Rented Houses</h2>
            <div className="rented-houses-container">
              {rentedHouses.length > 0 ? (
                rentedHouses.map((house, index) => (
                  <div key={index} className="rented-house-card">
                    <h3>{house.category} - {house.ownername}</h3>
                    <p><strong>Cost:</strong> ${house.cost}</p>
                  </div>
                ))
              ) : (
                <p>No houses currently rented.</p>
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
          <button className="ssubmit" onClick={handleBookClick}>Request</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar2 />
      <div className="owner-container">
        <div className="left-section">
          <button className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>Dashboard</button>
          <button className={activeSection === 'Rented' ? 'active' : ''} onClick={() => setActiveSection('Rented')}>Rented</button>
          <button className={activeSection === 'Requested' ? 'active' : ''} onClick={() => setActiveSection('Requested')}>Requested</button>
        </div>
        <div className="right-section">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default Tenantlogin






