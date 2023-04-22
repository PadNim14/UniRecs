import React, { useState } from 'react'
import parsedData from '../../backend/college_data'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/table.css'

function SampleData() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = parsedData.filter(
        (info) => {
            const universityName = info.university_name.toLowerCase()
            const searchTermLower = searchTerm.toLowerCase()
            return universityName.includes(searchTermLower)
        }
    );

    const data = filteredData.map(
        (info) => {
            return (
                <tr key={info.ipeds_id}>
                    <td>{info.university_name}</td>
                    <td>{info['2023_ranking'] ? info['2023_ranking'] : 'Unranked'}</td>
                    <td>{info.state_ab}</td>
                    <td>{info.ipeds_id}</td>
                </tr>
            )
        }
    );

    return (
        <div className='App'>
            <center>
                <input
                    type='text'
                    placeholder='Search university'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
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
            </center>

        </div>
    )
}

export default SampleData

