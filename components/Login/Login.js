/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { FaQuestionCircle } from "react-icons/fa";
export default function Login() {
    return (
        <>
            {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
            <div className='w-full h-screen font-poppins flex justify-center items-center  '>
                <div className='w-2/3 lg:w-1/2 h-[300px] -mt-32 flex flex-col bg-slate-100 border border-slate-300 shadow-xl'>
                    <div className='h-1/5 text-3xl text-center mt-5 font-medium  text-slate-600'>
                        <h1>ASC Online Exam System</h1>
                    </div>
                    <div className='w-full h-4/5 mt-2 pt-8  border-t border-slate-300 relative z-10 flex gap-x-12 bg-white '>
                        <div className='w-[40%]  ml-14' >
                            <form>
                                <div>
                                    <input
                                        id="username"
                                        name="username"
                                        type="name"
                                        autoComplete="name"
                                        required
                                        className="relative block w-full appearance-none rounded-none
                                        border border-gray-300 px-3  py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className='mt-3'>
                                    <input
                                        id="password"
                                        name="password"
                                        type="Password"
                                        autoComplete="current-password"
                                        required
                                        className="relative block w-full appearance-none rounded-none
                                        border border-gray-300 px-3  py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button
                                        type="button"
                                        className="group relative flex w-full justify-center border border-transparent
                 bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Login
                                    </button>
</div>
                                  
                            </form>
                        </div>
                            <div className=' text-sm'>
                            <div className=''>
                                <span >Forgotten your username or </span>
                                <br />
                                <span>password?</span>
                            </div>
                            <div className=' mt-2'>
                                <span>Cookies must be enabled in your </span>
                                <span className="absolute inset-y flex items-center  ">browser  <FaQuestionCircle className="h-4 w-4 ml-1 mt-[0.5px] text-green-500 " /></span>
                            </div>
                            <div className='mt-8'>
                                    <button
                                        type="Login"
                                        className="group relative flex w-full justify-center border border-transparent
                 bg-slate-600 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    >
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        </span>
                                        Login as Faculty
                                    </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
