// import React from 'react';
// import { Link } from 'react-router-dom';

// function SearchResults(event, collegeName) {
//   event.preventDefault();
//   const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(collegeName)}`;
//   window.open(searchUrl, "_blank");
// }

// function CollegeCards({ colleges }) {
//   return (
//     <div className='college-cards'>
//       {colleges.map((college) => (
//         <Link to={`/search?q=${encodeURIComponent(college)}`} onClick={(event) => SearchResults(event, college)} style={{color: 'white'}}>
//           <CollegeCard key={college} name={college} style='college-name' />
//         </Link>
//       ))}
//     </div>
//   );
// }

// function CollegeCard({ name }) {
//   return <div className='college-card'>{name}</div>;
// }

// export default CollegeCards;

// function SearchResults(event, url) {
//   event.preventDefault();
//   window.open(url, "_blank");
// }

// function CollegeCards({ colleges }) {
//   return (
//     <div className='college-cards'>
//       {colleges.map((college) => (
//         <div key={college[0]} className='college-card'>
//           <button className='btn btn-primary' onClick={(event) => SearchResults(event, college[1])}>
//             {college[0]}
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
function SearchResults(event, url) {
  event.preventDefault();
  const baseUrl = "http://"; // replace with the base URL of your website
  const fullUrl = baseUrl + url;
  window.open(fullUrl, "_blank");
}

function CollegeCards({ colleges }) {
  return (
    <div className='college-cards'>
      {colleges.map((college) => (
        <div key={college[0]} className='college-card'>
          <button className='btn btn-primary' onClick={(event) => SearchResults(event, college[1])}>
            {college[0]}
          </button>
        </div>
      ))}
    </div>
  );
}

// function CollegeCards({ colleges }) {
//   return (
//     <div className='college-cards'>
//       {colleges.map((college) => (
//         <div key={college[0]} className='college-card'>
//           <a href={college[1]} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
//             {college[0]}
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }


// export default CollegeCards;


export default CollegeCards;
