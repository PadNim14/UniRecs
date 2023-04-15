import React from 'react'

function CollegeCards({ colleges }) {
  return (
    <div className='college-cards'>
      {colleges.map((college) => (
        <CollegeCard key={college} name={college} />
      ))}
    </div>
  );
}

function CollegeCard({ name }) {
  return <div className='college-card'>{name}</div>
}

export default CollegeCards