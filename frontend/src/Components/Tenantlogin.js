import { React, useState, useEffect } from 'react'
import Navbar2 from './Navbar2'
import axios from 'axios'
import '../styles/tenant.css'

const Tenantlogin = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [allImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (activeSection === 'dashboard') {
      fetchAllImages();
    }
  }, [activeSection]);

  const fetchAllImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/uploads');
      setUploadedImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBookClick = () => {
    // Handle the book action here
    console.log('Book button clicked for:', selectedImage);
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
        </div>
        <div className="right-section">
          {renderSection()}
        </div>
      </div>
    </div>
  )
}

export default Tenantlogin






