import React from 'react'
import styles from './Input.module.css'

export default function Input({ text, required, placeholder, type, value, onChange, min, max }) {
    return (
        <div className='w-full font-poppins mt-6' >
            <label className=' text-primary-black'>
                {text}
                {required &&
                <span className='text-red-500'>&nbsp;*</span>
                }
            </label>
            <input type={type} placeholder={placeholder} defaultValue={value} onChange={onChange} min={min} max={max} required={required}
                className={`
                w-full  border  border-primary-black border-opacity-[0.15] rounded-md mt-2 px-3 py-2 focus:border-[#FEC703] focus:outline-none
                ${styles.dateSelectorColor}
                `} />
        </div>
    )
}
