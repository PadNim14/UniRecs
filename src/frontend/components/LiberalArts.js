import React, { useState } from 'react'
import parsedData1 from '../../backend/liberal_arts.json'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/table.css'

function LiberalArts() {
    const [search, setSearch] = useState('');

    const filteredData1 = parsedData1.filter(
        (info) => {
            const collegeName = info.college_name.toLowerCase()
            const searchTermLower = search.toLowerCase()
            return collegeName.includes(searchTermLower)
        }
    );

    const data = filteredData1.map(
        (info) => {
            return (
                <tr key={info.ipeds_id}>
                    <td>{info.college_name}</td>
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
                    placeholder='Search college'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>College</th>
                            <th>USNews 2023 Ranking</th>
                            <th>State/Territory</th>
                            <th>IPEDS ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </center>
        </div>
    );
}

export default LiberalArts
