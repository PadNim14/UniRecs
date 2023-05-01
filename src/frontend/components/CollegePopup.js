import { useState } from 'react';


function CollegePopup({ college, onClose }) {
  return (
    <div className='college-popup'>
      <h2>{college.name}</h2>
      <img src={college.data.primaryPhotoCardSmall} alt={college.name} />
      <p>{college.description}</p>
      <button className='btn btn-secondary' onClick={onClose}>Close</button>
    </div>
  );
}

function CollegeCards({ colleges }) {
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleSelectCollege = (college) => {
    setSelectedCollege(college);
  };

  const handleClosePopup = () => {
    setSelectedCollege(null);
  };

  return (
    <div className='college-cards'>
      {colleges.map((college, index) => (
        <div key={college.name} className='college-card'>
          <button className='btn btn-primary' onClick={() => handleSelectCollege(college)}>
            {index + 1}. {college.name}
          </button>
        </div>
      ))}

      {selectedCollege && (
        <div className='popup-overlay'>
          <CollegePopup college={selectedCollege} onClose={handleClosePopup} />
        </div>
      )}
    </div>
  );
}
