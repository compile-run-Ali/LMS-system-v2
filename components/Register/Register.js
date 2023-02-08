import React from 'react'
import Link from "next/link";


export default function Register() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-[90%] flex">
        <div className='w-1/2 font-poppins'>
          <div className="block p-6 rounded-tl-lg rounded-bl-lg shadow-lg bg-white h-full">
            <div>
              <h1 className='text-blue-900 text-2xl font-semibold mb-3'>Register yourself</h1>
            </div>
            <form>
              <div className='grid grid-cols-2 gap-5'>
                <div className="form-group mb-5">
                  <label htmlFor='PA number' className='text-blue-900 font-medium text-sm'>
                    PA Number
                  </label>
                  <input type="text" className="form-control block
                  w-full px-3 py-1.5 text-sm font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id='PA number'
                    aria-describedby="emailHelp123" />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor='Full Name' className='text-blue-900 font-medium text-sm'>
                    Full Name
                  </label>
                  <input type="text" className="form-control
              block
              w-full
              px-3
              py-1.5
              text-sm
              font-normal
              text-blue-900
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-blue-900 focus:bg-white focus:border-blue-600 focus:outline-none" id="Full Name"
                    aria-describedby="emailHelp123" />
                </div>
              </div>

              <div className="form-group mb-5">
                <label htmlFor='Email' className='text-blue-900 font-medium text-sm'>
                  Email
                </label>
                <input type="email" className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-blue-900 focus:bg-white focus:border-blue-600 focus:outline-none" id="Email"
                />
              </div>
              <div className='mb-5'>
                <label className="block mb-2 text-sm font-medium text-blue-900" for="file_input">Profile Picture</label>
                <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md h-9 cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  custom-file-input " id="file_input" type="file" />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className="form-group mb-5">
                  <label htmlFor='Password' className='text-blue-900 font-medium text-sm'>
                    Date of Birth
                  </label>
                  <input type="date" className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Password"
                  />
                </div>
                <div className="form-group mb-5">
                  <label htmlFor='cgpa' className='text-blue-900 font-medium text-sm'>
                    CGPA
                  </label>
                  <input type="text" className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="cgpa"
                  />
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor='Courses' className='text-blue-900 font-medium text-sm'>
                  Courses
                </label>
                <input type="email" className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Courses"
                />
              </div>

              <div className='grid grid-cols-2 gap-5'>
                <div className="form-group mb-6">
                  <label htmlFor='Password' className='text-blue-900 font-medium text-sm'>
                    Password
                  </label>
                  <input type="password" className="form-control block
            w-full
            px-3
            py-1.5
            text-sm
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Password"
                  />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor='cPassword' className='text-blue-900 font-medium text-sm'>
                    Confirm Password
                  </label>
                  <input type="password" className="form-control block
            w-full px-3 py-1.5 text-sm font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="cPassword"
                  />
                </div>
              </div>

              <button type="submit" className="
          w-full
          px-6
          py-2.5
          bg-blue-900
          text-white
          font-medium
          text-xs
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-700 active:shadow-lg
          transition
          duration-150
          ease-in-out">Sign up</button>
              <div className='mt-4 text-left'>
                <span> Already registered? </span>
                <Link href={"/"} ><span className='text-blue-900 hover:text-blue-700 font-medium'> Login here </span>
                </Link>
              </div>

            </form>
          </div>
        </div>

        <div className=" font-poppins w-1/2 h-full rounded-tr-lg rounded-br-lg shadow-lg bg-blue-900">
          <div className='mt-5'>
            <h1 className='text-white text-2xl text-center font-semibold mb-3'>Instructions</h1>
          </div>
        </div>
      </div>
    </div>
  )
}



