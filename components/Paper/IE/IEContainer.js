import React from 'react'

export default function IEContainer({excelData}) {
    console.log(excelData)
  return (
    //loop through excelData and render the data
    <div>
        {excelData.map((data, index) => {
            return (
                <div key={index}>
                    <p>{data.stop_number}</p>
                    <p>{data.cosignment_number}</p>
                </div>
            )
        })}
    </div>
  )
}
