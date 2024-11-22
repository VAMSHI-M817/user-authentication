import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState(null)
    const [loggingMsg, setloggingMsg] = useState(null)
    var notify = (res) => toast.error(res);
    var Errnotify = (res) => toast.error(res);

    const emailRef = useRef()
    const passwordRef = useRef()

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        const isLoggedUser = JSON.parse(localStorage.getItem("user"));

        try {
            const res = await axios.post("http://localhost:9000/users/login", {
                email: emailRef.current.value,
                password: passwordRef.current.value
            },
                {
                    headers: {
                        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                    }
                });

            // Check if login was successful by examining res.data
            if (res.data.email === emailRef.current.value && res.data.password === passwordRef.current.value) {
                localStorage.setItem("isLoggedIn", true)
                notify("Login successful! Redirecting to your dashboard...")
                setTimeout(() => {
                    navigate("/home");
                }, 1000);


            } else {
                setErrorMsg("Incorrect email or password");
                Errnotify("Incorrect email or password")
            }

            console.log(res.data); // Log the actual response data
        } catch (err) {
            console.error("Error during login:", err);
            setErrorMsg("Error during login. Please try again.");
        }



        // console.log(isLoggedUser);
        // if (emailRef?.current?.value === isLoggedUser?.email && passwordRef?.current?.value === isLoggedUser?.password) {
        //     setloggingMsg("Signing In")
        //     setTimeout(() => {
        //         navigate("/home")
        //     }, 2000);
        //     localStorage.setItem("isLoggedIn", true)

        // } else {
        //     setErrorMsg("Email or Password Incorrect")
        // }

    }

    return (
        <div>
            <div className="bg-white flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="bg-white shadow-md rounded-md p-6">
                        <img className="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
                        <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Log In
                        </h2>
                        <ToastContainer />
                        <form className="space-y-6" onSubmit={(e) => handleLogin(e)}>
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
                            <p className="text-red-400 font-bold">{errorMsg}</p>
                            <p className="text-green-400 font-bold">{loggingMsg}</p>
                            <div className="mt-4">
                                <button type="submit" className="block w-full py-2 text-center text-white bg-teal-500 border border-teal-500 rounded hover:bg-transparent hover:text-teal-500 transition uppercase font-roboto font-medium">Sign In</button>
                                <Link to={"/register"}>
                                    <div className="flex gap-2 pt-5">
                                        <p className="text-gray-600 text-sm">Don't have an account?</p>
                                        <p className="text-gray-600 text-sm underline">Register here</p>
                                    </div>
                                </Link>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
