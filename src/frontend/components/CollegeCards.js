import { useState } from 'react';
import placeholder from '../assets/placeholder.jpeg'

function CollegeCards({ colleges }) {
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleClick = (college) => {
    setSelectedCollege(college);
  };

  const handleClose = () => {
    setSelectedCollege(null);
  };

  return (
    <div>
      <center>
        <div className="college-cards">
          {colleges.map((college) => (
            <div key={college['data']} className="college-card">
              {college['data']['primaryPhotoThumb'] ? (
                <img
                  src={college['data']['primaryPhotoThumb']}
                  alt={college['name']}
                  onClick={() => handleClick(college)}
                />
              ) : (
                <img
                  src={placeholder}
                  alt={college['name']}
                  onClick={() => handleClick(college)}
                />
              )}
              <span className="college-name">{college['name']}</span>
            </div>
          ))}
          {selectedCollege && (
            <div className="college-popup">
              <div className="college-popup-content">
                <button className="close-btn" onClick={handleClose}>
                  Close
                </button>
                {selectedCollege['data']['primaryPhotoThumb'] ? (
                  <img
                    src={selectedCollege['data']['primaryPhotoThumb']}
                    alt={selectedCollege['name']}
                  />
                ) : (
                  <img
                    src={placeholder}
                    alt={selectedCollege['name']}
                  />
                )}
                <h3>{selectedCollege['name']}</h3>
                <h3>{selectedCollege['data']['description']}</h3>
                <p>Alias: {selectedCollege['data']['aliasNames'] ? selectedCollege['data']['aliasNames'] : "None"}</p>
                <p>Location: {selectedCollege['data']['location']}</p>
              </div>
            </div>
          )}
        </div>
      </center>
    </div>
  );
}

export default CollegeCards;
