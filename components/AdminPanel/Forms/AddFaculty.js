import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const AddFaculty = () => {
    const router = useRouter();
    const [edit, setEdit] = useState(router.query.faculty_id ? true : false);
    const [name, setName] = useState(edit ? router.query.name : '');
    const [phoneNumber, setPhoneNumber] = useState(edit ? router.query.phone_number : '');
    const [level, setLevel] = useState(edit ? router.query.level : '');
    const [department, setDepartment] = useState(edit ? router.query.department : '');
    const [email, setEmail] = useState(edit ? router.query.email : '');
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await addFaculty({ name, phone_number: phoneNumber, level, department, email, password });
        setName('');
        setPhoneNumber('');
        setLevel('');
        setDepartment('');
        setEmail('');
        setPassword('');
    };

    const addFaculty = async (faculty) => {
        const new_faculty = await axios.post(`http://localhost:3000/api/admin/faculty/${edit ? "edit_faculty" : "add_faculty"}`, {
            faculty_id: edit ? router.query.faculty_id : null,
            ...faculty,
        })
        if (new_faculty.status === 200) {
            router.push("/admin")
        }
        console.log(new_faculty);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-200 p-4">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="phone_number">
                    Phone Number
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone_number"
                    type="text"
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="level">
                    Level
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="level"
                    type="text"
                    value={level}
                    onChange={(event) => setLevel(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="department">
                    Department
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="department"
                    type="text"
                    value={department}
                    onChange={(event) => setDepartment(event.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Add Faculty
            </button>
        </form>
    );
};

export default AddFaculty;
