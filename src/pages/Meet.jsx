import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { userData } from '../backendApis/api'

const Meet = () => {
    const navigate = useNavigate()
    const { meetcode } = useParams()
    const meetingRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await userData();
                // console.log(response)
                setUserInfo(response)
            } catch (error) {
                console.log('Eror fetching on frontend....')
            }
        }
        fetchUser();
    }, [])


    useEffect(() => {
        const initMeeting = async () => {
            if (!userInfo || !meetingRef.current) return;

            const appID = Number(import.meta.env.VITE_APP_ID);
            const serverSecret = import.meta.env.VITE_SERVER_SECRET;

            const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                meetcode,
                userInfo._id,
                userInfo.name
            );

            const zp = ZegoUIKitPrebuilt.create(kitToken);
            zp.joinRoom({
                container: meetingRef.current,
                sharedLinks: [
                    {
                        name: 'Meet Link',
                        url: `${window.location.protocol}//${window.location.host}/meet/${meetcode}`,
                    },
                ],
                scenario: {
                    mode: ZegoUIKitPrebuilt.GroupCall,
                },
            });
        };

        initMeeting();
    }, [userInfo]);

    return (
        <>
            <div
                className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'
            >
                <div className='' ref={meetingRef} style={{ width: "100vw", height: "100vh" }}>
                </div>
            </div>
        </>
    )
}

export default Meet