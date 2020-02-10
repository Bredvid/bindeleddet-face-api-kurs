import React, {useCallback, useRef} from 'react'
import Webcam from "react-webcam";
import Button from '@material-ui/core/Button';
import {rounds} from './Game'


import {b64toBlob} from "../utils";
import '../App.css';


const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export const Webcamera = ({addPhoto, round, setImageData}) => {

    const hasWebcam = navigator.getUserMedia
    const webcamRef = useRef(null);

    const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                addPhoto(imageSrc)
                setImageData(b64toBlob(imageSrc.split("base64,")[1]))
            }
        }, [webcamRef]
    )

    // If user does not have a webcamera
    const onUpload = event => {
        encodeFile(event.target.files[0])
        addPhoto(URL.createObjectURL(event.target.files[0]))
    }
    const encodeFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = evt =>
            setImageData(b64toBlob(evt.target.result.split("base64,")[1]))
    }


    return (
        <div className="modal-wrapper">
            {hasWebcam ?
                <div className="webcam-wrapper">
                    {round === 1 && <p> Can you show emotions on command? </p>}
                    <h2 className="header-modal">Round {round}: Show {rounds[round - 1]}</h2>
                    <Webcam
                        audio={false}
                        height={450}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={800}
                        videoConstraints={videoConstraints}
                    />

                    <Button style={{marginTop: '2rem'}} variant="contained" color="primary" onClick={capture}>
                        Capture photo
                    </Button>
                </div>
                :
                // Non webcam fallback (Mobile)
                <input type={'file'} accept={'image/jpeg'} onChange={onUpload}/>
            }
        </div>

    )
};