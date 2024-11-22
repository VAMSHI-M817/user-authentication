import { data } from 'autoprefixer'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

const Register = () => {
    const [errorMsg, setErrorMsg] = useState(null)
    const navigate = useNavigate()

    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const handleRegister = (e) => {
        e.preventDefault()

        // Create a new userInfo object directly in the function
        const newUserInfo = {
            name: nameRef?.current?.value,
            email: emailRef?.current?.value,
            password: passwordRef?.current?.value
        }
        //storing in local
        localStorage.setItem("user", JSON.stringify(newUserInfo))

        //storing in database
        fetch("http://localhost:9000/users/register", {
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(newUserInfo)
        }).then((data) => data.json())
            .then((data) => {
                setErrorMsg(data.message)
                alert(data.message)
            }).catch((err) => {
                console.log("Error while registration", err);
            })

        setTimeout(() => {
            navigate("/")
        }, 2000)
    }
    return (
        <div>
            <div>
                <div className="bg-white flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        <div className="bg-white shadow-md rounded-md p-6">
                            <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
                            <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                                Sign up for an account
                            </h2>

                            <form className="space-y-6" onSubmit={(e) => handleRegister(e)}>
                                <div>
                                    <div className="mt-1">
                                        <input
                                            ref={nameRef}
                                            autoComplete="off"
                                            placeholder="User Name"
                                            name="username"
                                            type="username"
                                            required
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <input
                                            ref={emailRef}
                                            placeholder="Enter email"
                                            name="email"
                                            type="email"
                                            autoComplete="email-address"
                                            required
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                    </div>
                                </div>

                                <div>
                                    <div className="mt-1">
                                        <input
                                            ref={passwordRef}
                                            placeholder="Enter Password"
                                            name="password"
                                            type="password"
                                            autoComplete="password"
                                            required
                                            className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" />
                                    </div>
                                </div>
                                <p className='text-red-500 font-bold'>
                                    {errorMsg}
                                </p>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium">
                                        Sign Up
                                    </button>
                                    <Link to={"/"}>
                                        <div className="flex gap-2 pt-5">
                                            <p className="text-gray-600 text-sm">Already have an account?</p>
                                            <p className="text-gray-600 text-sm underline">Sign In</p>
                                        </div>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
