function SearchResults(event, url) {
  // console.log(url);
  event.preventDefault();
  const baseUrl = ""; // replace with the base URL of your website
  const fullUrl = baseUrl + url;
  window.open(fullUrl, "_blank");
}

function CollegeCards({ colleges }) {
  // console.log(colleges['data'])
  return (
    <div className='college-cards'>
      {colleges.map((college) => (
        <div key={college['name']} className='college-card'>
          <button className='btn btn-primary' onClick={(event) => SearchResults(event, college['data']['primaryPhotoCardSmall'])}>
            {college['name']}
          </button>
        </div>
      ))}
    </div>
  );
}



export default CollegeCards;
