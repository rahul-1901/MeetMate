import React from 'react'
import { Video } from 'lucide-react'
import axios from 'axios'
import { googleAuth } from '../backendApis/api'
import { useGoogleLogin } from '@react-oauth/google'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate()

    const responseGoogle = async (authResult) => {
        try {
            if (authResult['code']) {
                const result = await googleAuth(authResult['code']);
                const { name, email } = result.data.user;
                const token = result.data.token;
                localStorage.setItem("userToken", token);
                localStorage.setItem("userEmail", email);
                toast.success('Login successfull...', {autoClose: 1000})
                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        } catch (error) {
            console.error('Error while req google', error)
        }
    }

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <Video className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h1>
                        <p className="text-gray-600">Sign in to join your meeting room</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                        <div className="space-y-6">
                            <button onClick={googleLogin} className="w-full cursor-pointer flex items-center justify-center space-x-3 px-6 py-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group">
                                <span className="text-gray-700 font-medium group-hover:text-gray-900">
                                    Continue with Google
                                </span>
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Secure & Fast</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <span>End-to-end encrypted meetings</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span>HD video and crystal clear audio</span>
                                </div>
                                <div className="flex items-center space-x-3 text-sm text-gray-600">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                    <span>Share screens and collaborate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}

export default Login