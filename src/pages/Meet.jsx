import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { userData } from '../backendApis/api'

const Meet = () => {
    const navigate = useNavigate()
    const { meetcode } = useParams()
    const [userInfo, setUserInfo] = useState([])

    const fetchUser = async () => {
        try {
            const response = await userData();
            console.log(response)
            setUserInfo(response)
        } catch (error) {
            console.log('Eror fetching on frontend....')
        }
    }

    const meetingRoom = async (element) => {
        const appID = Number(import.meta.env.VITE_APP_ID)
        const serverSecret = import.meta.env.VITE_SERVER_SECRET
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetcode, userInfo._id, userInfo.name)
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Meet Link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomID=' +
                        meetcode,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
        });
        {
            errorMessage && (
                <p className="text-sm text-red-400 mt-1">{errorMessage}</p>
            )
        }
    }

    return (
        <>
            <div
                className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'
            >
                <div className='' ref={meetingRoom} style={{ width: "100vw", height: "100vh" }}>
                </div>
            </div>
        </>
    )
}

export default Meet