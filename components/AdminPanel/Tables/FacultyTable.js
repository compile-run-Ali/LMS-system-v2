import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

const FacultyTable = ({setOpen}) => {
    const [facultyMembers, setFacultyMembers] = useState([
        { name: 'John Doe', phone_number: '1234567890', level: 'Professor', department: 'Computer Science', email: 'johndoe@gmail.com' },
        { name: 'John Doe', phone_number: '1234567890', level: 'Professor', department: 'Computer Science', email: 'johndoe@gmail.com' },
    ]);

    const openModal = () => {
        setOpen(true);
    };

    const handleEditMCQ = (index) => () => {
        // Implement this
    };

    const handleDeleteMCQ = (index) => () => {
        // Implement this
        
    };

    return (
        <table className="table-auto mt-10 rounded-md font-poppins w-full text-left">
            <thead>
                <tr className="bg-blue-800 rounded-md text-white">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Phone Number</th>
                    <th className="px-4 py-2">Level</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2"></th>
                    <th className="px-4 py-2"></th>
                </tr>
            </thead>
            <tbody>
                {facultyMembers.map((facultyMember, index) => (
                    <tr key={index} className="bg-white">
                        <td className=" px-4 py-2">{facultyMember.name}</td>
                        <td className=" px-4 py-2">{facultyMember.phone_number}</td>
                        <td className=" px-4 py-2">{facultyMember.level}</td>
                        <td className=" px-4 py-2">{facultyMember.department}</td>
                        <td className=" px-4 py-2">{facultyMember.email}</td>
                        <td className="px-4 py-2">
                            <button
                                onClick={handleEditMCQ(index)}
                                className="bg-white text-blue-900 p-2 rounded hover:bg-blue-900 hover:text-white"
                            >
                                <MdEdit />
                            </button>
                        </td>
                        <td className="px-4 py-2">
                            <button
                                onClick={openModal}
                                className="bg-white text-red-600 p-2 rounded hover:bg-red-600 hover:text-white"
                            >
                                <MdDelete />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default FacultyTable;
