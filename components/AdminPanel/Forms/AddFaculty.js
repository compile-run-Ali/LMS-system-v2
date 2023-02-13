import Input from '@/components/Common/Form/Input';
import React, { useState } from 'react';

const AddFaculty = ({ onAddFaculty }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [level, setLevel] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddFaculty({ name, phone_number: phoneNumber, level, department, email });
        setName('');
        setPhoneNumber('');
        setLevel('');
        setDepartment('');
        setEmail('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} className="px-4">
         <div className='p-4 grid grid-cols-2 gap-x-8 px-10'>
            <div className="mb-4 ">
               
                <Input
                    text= "Name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
               
                   
                <Input
                   text="Phone Number"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
            <Input
                   text="Email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
            <Input
                   text="Password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
            <Input
                   text="Department"
                    type="text"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
            <Input
                   text="Level"
                    type="text"
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    required
                />
            </div>
            
            <div className='font-poppins mt-4'>

<label className="block mb-2  text-primary-black" for="file_input">Upload Profile Pic</label>
<input className="block w-full text-sm text-gray-900 h-11 border border-primary-black border-opacity-[0.15] rounded-md cursor-pointer bg-white  focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
<p className="mt-1 pl-1 text-sm text-black-100 " id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
</div>
            </div>
            
           <div className='flex justify-left ml-10 '>
            <button
                className="bg-blue-800 hover:bg-blue-700 text-lg mt-4 font-poppins text-white font-semibold py-2 px-10 rounded focus:outline-none focus:shadow-outline " 
                type="submit"
            >
                Add Faculty
            </button>
            </div>
        </form>
    );
};

export default AddFaculty;
