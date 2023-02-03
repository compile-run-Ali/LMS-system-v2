import { FaQuestionCircle } from "react-icons/fa";

export default function Login() {
    return (
        <div className='w-full h-screen font-poppins flex justify-center items-center  '>
            <div className='w-2/3 lg:w-2/3 h-[400px] -mt-20 flex flex-col bg-blue-100 border border-slate-300 shadow-xl'>
                <div className='h-1/5 text-4xl text-center mt-5 font-medium  text-slate-600'>
                    <h1>ASC Online Exam System</h1>

                    <h2 className="mt-1 text-2xl">Student Portal</h2>

                </div>
                <div className='w-full h-4/5 mt-2 pt-8  border-t border-slate-300 relative z-10 flex justify-between items-end pb-10 pr-40 bg-white '>
                    <div className='w-[40%]  ml-14' >
                        <form>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="off"
                                    required
                                    className="relative block w-full mt-2 appearance-none rounded-none bg-transparent
                                        border border-gray-300 px-3  py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                />
                            </div>
                            <div className='mt-5'>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="Password"
                                    autoComplete="off"
                                    required
                                    className="relative block w-full mt-3 appearance-none rounded-none bg-transparent autofill:bg-white
                                        border border-gray-300 px-3  py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div className='mt-5'>
                                <button
                                    type="button"
                                    className="group relative flex w-full justify-center border border-transparent
                 bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Login
                                </button>
                            </div>

                        </form>
                    </div>
                    <div className=''>
                        <div className=''>
                            <a href="#" className="hover:text-blue-500 text-slate-700">
                                <span >Forgotten your username or </span>
                                <br />
                                <span>password?</span>
                            </a>
                        </div>
                        <div className=' mt-2'>
                            <span>Cookies must be enabled in your </span>
                            <span className="flex items-center  ">browser  <FaQuestionCircle className="h-4 w-4 ml-1 mt-[0.5px] text-green-500 " /></span>
                        </div>

                        <div className="my-3 cursor-pointer">
                            <a className="hover:text-blue-500 text-slate-700">
                                Register as Student
                            </a>
                        </div>

                        <div className='mt-5'>
                            <button
                                type="Login"
                                className="group relative flex w-full justify-center border border-transparent
                 bg-blue-100 py-2 px-4 text-sm font-medium text-slate-00 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Login as Faculty
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}