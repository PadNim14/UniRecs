import React from 'react'
import parsedData1 from '../../backend/liberal_arts.json'
import 'bootstrap/dist/css/bootstrap.css'
function LiberalArts() {
    // console.log(parsedData1);
    const data = parsedData1.map(
        (info) => {
            return (
                <tr>
                    <td>{info.college_name}</td>
                    <td>{info['2023_ranking'] ? info['2023_ranking'] : 'Unranked'}</td>
                    <td>{info.state_ab}</td>
                    <td>{info.ipeds_id}</td>
                </tr>
            )
        }
    )
    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>College</th>
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

export default LiberalArts