import React from 'react'
// import parsedData from '../../backend/convert_xlsx_to_json'
import parsedData from '../../backend/college_data'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/table.css'
function SampleData() {
  const data = parsedData.map(
    (info) => {
      return (
        <tr>
          <td>{info.university_name}</td>
          <td>{info['2023_ranking'] ? info['2023_ranking'] : 'Unranked'}</td>
          <td>{info.state_ab}</td>
          <td>{info.ipeds_id}</td>
        </tr>
      )
    }
  )
  return (
    <div className='App'>
      <table className='table table-hover white-text'>
        <thead>
          <tr>
            <th>University</th>
            <th>USNews 2023 Ranking</th>
            <th>State</th>
            <th>IPEDS ID</th>
          </tr>
        </thead>
        <tbody>
          {data}
        </tbody>
      </table>
    </div>
  )
}

export default SampleData