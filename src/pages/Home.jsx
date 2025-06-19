import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [meetCode, setMeetCode] = useState('')
    const [debounce, setDebounce] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleMeet = () => {
        if (meetCode) {
            setErrorMessage('')
            navigate(`/room/${meetCode}`)
        } else {
            setErrorMessage('Error: enter the code...')
        }
    }

    useEffect(() => {
        const clearWork = setTimeout(() => {
            setDebounce(meetCode)
            setErrorMessage('')
        }, 400)

        return () => {
            clearTimeout(clearWork)
        }
    }, [meetCode])

    useEffect(() => {
        if (debounce) {
            console.log(debounce)
        }
    }, [debounce])

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    <header className="px-6 py-8">
                        <div className="max-w-7xl mx-auto flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <h1 className="text-2xl font-bold text-white">MeetMate</h1>
                            </div>
                            <div className="hidden md:flex items-center space-x-6 text-sm">
                                <div className="flex items-center space-x-2 text-blue-200">
                                    <span>Secure</span>
                                </div>
                                <div className="flex items-center space-x-2 text-blue-200">
                                    <span>Instant</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-6 py-12">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    Connect Collaborate
                                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent block">
                                        Create Together
                                    </span>
                                </h2>
                                <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                                    Join your team meetings instantly with just a room code.
                                </p>
                            </div>

                            <div className="flex justify-center items-center gap-8 mb-16">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 transition-all duration-300">
                                    <div className="flex items-center space-x-3 mb-6">
                                        <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                        </div>
                                        <h3 className="text-2xl font-semibold text-white">Join Meeting</h3>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="block text-sm font-medium text-white mb-2">
                                                Enter Room Code
                                            </p>
                                            <input
                                                type="text"
                                                placeholder="XXX-XXX-XXX"
                                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-blue-300 text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                value={meetCode}
                                                onChange={(e) => { setMeetCode(e.target.value) }}
                                            />
                                            {errorMessage && (
                                                <p className="text-sm text-red-400 mt-1">{errorMessage}</p>
                                            )}
                                        </div>

                                        <button
                                            onClick={handleMeet}
                                            className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${debounce ? ('bg-blue-500 text-white') : ('bg-gray-600/50')} text-gray-400 cursor-pointer`}
                                        >
                                            <span>Join Meeting</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default Home