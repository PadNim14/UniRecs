import React from 'react'
// import parsedData from '../../backend/convert_xlsx_to_json'
import parsedData from '../../backend/college_data'

function SampleData() {
  return (
    <div>
      <pre>
        {JSON.stringify(parsedData, null, 2)}
      </pre>
    </div>
  )
}

export default SampleData