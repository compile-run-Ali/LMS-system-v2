import React from 'react'

export default function Input({ text, required, placeholder, type, value, onChange, min, max }) {
    return (
        <div className='w-1/2 font-poppins mt-6' >
            <label className=' text-primary-black'>
                {text}
                {required &&
                <span className='text-red-500'>&nbsp;*</span>
                }
            </label>
            <input type={type} placeholder={placeholder} defaultValue={value} onChange={onChange} min={min} max={max}
                className='w-full bg-white border border-primary-black border-opacity-[0.15] rounded-md mt-2 px-3 py-2 focus:border-[#FEC703] focus:outline-none' />
        </div>
    )
}
