import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

const Meet = () => {
    const navigate = useNavigate()
    const { meetcode } = useParams()

    const meetingRoom = async (element) => {
        const appID = Number(import.meta.env.VITE_APP_ID)
        const serverSecret = import.meta.env.VITE_SERVER_SECRET
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, meetcode, "123456", "rahul_yadav")
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
    }

    return (
        <>
            <div
                className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'
            >
                <div className='' ref={meetingRoom} style={{width: "100vw", height: "100vh"}}>
                </div>
            </div>
        </>
    )
}

export default Meet