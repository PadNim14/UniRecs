import { useState } from 'react';
import college from '../assets/college.jpg'
function SearchResults(event, url) {
  // console.log(url);
  event.preventDefault();
  const baseUrl = ""; // replace with the base URL of your website
  const fullUrl = baseUrl + url;
  window.open(fullUrl, "_blank");
}
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
  console.log(colleges[0]['data']['primaryPhotoCardSmall']);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const handleClick = (college) => {
    setSelectedCollege(college);
  };

  const handleClose = () => {
    setSelectedCollege(null);
  };

  return (
    <div className="college-cards">
      {colleges.map((college) => (
        <div key={college['name']} className="college-card">
          <img
            src={college['data']['primaryPhotoCardSmall']}
            alt={college['name']}
            onClick={() => handleClick(college)}
          />
          <span className="college-name">{college['name']}</span>
        </div>
      ))}
      {selectedCollege && (
        <div className="college-popup">
          <div className="college-popup-content">
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
            <img
              src={selectedCollege['data']['primaryPhotoCardSmall']}
              alt={selectedCollege['name']}
            />
            <h2>{selectedCollege['name']}</h2>
            <p>{selectedCollege['data']['description']}</p>
          </div>
        </div>
      )}
    </div>
  );
}


// function CollegeCards({ colleges }) {
//   const [selectedCollege, setSelectedCollege] = useState(null);

//   const handleSelectCollege = (college) => {
//     setSelectedCollege(college);
//   };

//   const handleClosePopup = () => {
//     setSelectedCollege(null);
//   };

//   return (
//     <div className='college-cards'>
//       {colleges.map((college, index) => (
//         <div key={college.name} className='college-card'>
//           <button className='btn btn-primary' onClick={() => handleSelectCollege(college)}>
//             {index + 1}. {college.name}
//             <img src={college.data.primaryPhotoThumb} alt={college.name} />
//           </button>
//           {selectedCollege && selectedCollege.name === college.name && (
//             <div className='college-popup'>
//               <div className='college-popup-content'>
//                 <button className='btn btn-close' onClick={handleClosePopup}>Close</button>
//                 <h2>{selectedCollege.name}</h2>
//                 {selectedCollege.data.primaryPhotoCardSmall ? (
//                   <img src={selectedCollege.data.primaryPhotoThumb} alt={selectedCollege.name} />
//                 ) : (
//                   <img src='https://via.placeholder.com/300' alt='No Image Available' />
//                 )}
//                 <p>{selectedCollege.description}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


// function CollegeCards({ colleges }) {
//   const handleSelectCollege = (college) => {
//     const popupContent = `
//       <html>
//         <head>
//           <title>${college.name}</title>
//         </head>
//         <body>
//           <h2>${college.name}</h2>
//           <img src="${college.data.primaryPhotoCardSmall}" alt="${college.name}" />
//           <p>${college.description}</p>
//         </body>
//       </html>
//     `;
//     window.open('', '_blank', 'height=500,width=600');
//     const newWindow = window.open('', '_blank');
//     newWindow.document.write(popupContent);
//     newWindow.document.close();
//   };

//   return (
//     <div className='college-cards'>
//       {colleges.map((college, index) => (
//         <div key={college.name} className='college-card'>
//           <button className='btn btn-primary' onClick={() => handleSelectCollege(college)}>
//             {index + 1}. {college.name}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


// function CollegeCards({ colleges }) {
//   const [selectedCollege, setSelectedCollege] = useState(null);

//   const handleSelectCollege = (college) => {
//     setSelectedCollege(college);
//   };

//   const handleClosePopup = () => {
//     setSelectedCollege(null);
//   };

//   return (
//     <div className='college-cards'>
//       {colleges.map((college, index) => (
//         <div key={college.name} className='college-card'>
//           <button className='btn btn-primary' onClick={() => handleSelectCollege(college)}>
//             {index + 1}. {college.name}
//           </button>
//         </div>
//       ))}

//       {selectedCollege && (
//         <div className='popup-overlay'>
//           <CollegePopup college={selectedCollege} onClose={handleClosePopup} />
//         </div>
//       )}
//     </div>
//   );
// }


export default CollegeCards;
