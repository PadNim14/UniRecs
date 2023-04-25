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



export default CollegeCards;
