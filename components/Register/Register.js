import React from 'react'

export default function Register() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-3/4 h-5/6 flex">
        <div className='w-1/2 font-poppins'>
          <div className="block p-6 rounded-tl-lg rounded-bl-lg shadow-lg bg-white h-full">
            <form>
              <div className='grid grid-cols-2 gap-5'>
                <div className="form-group mb-6">
                  <label htmlFor='PA number' className='text-gray-700 font-medium text-sm'>
                    PA Number
                  </label>
                  <input type="text" className="form-control block
                  w-full px-3 py-1.5 text-sm font-normal text-gray-700
                bg-white bg-clip-padding border border-solid border-gray-300
                  rounded transition ease-in-out m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id='PA number'
                    aria-describedby="emailHelp123" />
                </div>
                <div className="form-group mb-6">
                  <label htmlFor='Full Name' className='text-gray-700 font-medium text-sm'>
                    Full Name
                  </label>
                  <input type="text" className="form-control
              block
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
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Full Name"
                    aria-describedby="emailHelp123" />
                </div>
              </div>

              <div className="form-group mb-6">
                <label htmlFor='Email' className='text-gray-700 font-medium text-sm'>
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="Email"
                />
              </div>
              <div className='grid grid-cols-2 gap-5'>
                <div className="form-group mb-6">
                  <label htmlFor='Password' className='text-gray-700 font-medium text-sm'>
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
                <div className="form-group mb-6">
                  <label htmlFor='cgpa' className='text-gray-700 font-medium text-sm'>
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
                <label htmlFor='Courses' className='text-gray-700 font-medium text-sm'>
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
                  <label htmlFor='Password' className='text-gray-700 font-medium text-sm'>
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
                  <label htmlFor='cPassword' className='text-gray-700 font-medium text-sm'>
                    Confirm Password
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
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="cPassword"
                  />
                </div>
              </div>
              <button type="submit" className="
          w-full
          px-6
          py-2.5
          bg-blue-400
          text-white
          font-medium
          text-xs
          uppercase
          rounded
          hover:bg-blue-500 hover:shadow-lg
          focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-500 active:shadow-lg
          transition
          duration-150
          ease-in-out">Sign up</button>
            </form>
          </div>
        </div>

        <div className="w-1/2 h-full rounded-tr-lg rounded-br-lg shadow-lg bg-blue-200">

        </div>
      </div>
    </div>
  )
}



