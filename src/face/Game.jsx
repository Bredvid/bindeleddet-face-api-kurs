import React, {useEffect, useState} from 'react'
import {Webcamera} from "./Webcamera";
import {Score} from "./Score";

const subscriptionKey = '' //secret: 7661167634b1cb907b70340da6cdb
const FACE_API_URL = 'https://face-api-bredvid.cognitiveservices.azure.com/face/v1.0/detect'
const parameters = '?returnFaceAttributes=emotion'


export const rounds = ['happiness', 'anger', 'sadness', 'surprise'];


export const Game = () => {

    const [gameStatus, setGameStatus] = useState({
        showWebcamera: true,
        round: 1
    });

    const [photos, setPhotos] = useState([])

    const addPhoto = photo => {
        setPhotos(photos.concat(photo))
        setGameStatus({...gameStatus, showWebcamera: false})
    }

    const [score, setScore] = useState({
        happiness: 0,
        anger: 0,
        sadness: 0,
        surprise: 0
    })

    const updateScore = emotions => {
        switch (gameStatus.round) {
            case 1:
                setScore({...score, happiness: emotions.happiness})
                break;
            case 2:
                setScore({...score, anger: emotions.anger})
                break;
            case 3:
                setScore({...score, sadness: emotions.sadness})
                break
            default:
                setScore({...score, surprise: emotions.surprise})
        }
    }


    const [imageData, setImageData] = useState("")

    const fetchOptions = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
        body: imageData
    };
    const [isFetching, setIsFetching] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)

    useEffect(() => {
            const fetchEmotions = async () => {
                setIsFetching(true)
                setFetchingError(false)

                fetch(FACE_API_URL + parameters, fetchOptions)
                    .then(response => response.json())
                    .then(json => updateScore(json[0].faceAttributes.emotion))
                    .catch(error => {
                        setFetchingError(true)
                        console.log(error)
                    })

                setTimeout(() => setIsFetching(false), 1000)
            }

            imageData && fetchEmotions();
        },
        [imageData])

    return (
        <div className="game-wrapper">
            {gameStatus.showWebcamera &&
                <Webcamera addPhoto={addPhoto} round={gameStatus.round} setImageData={setImageData}/>
            }
            <Score score={score} round={gameStatus.round} photos={photos} setGameStatus={setGameStatus}
                   isFetching={isFetching} fetchingError={fetchingError} />
        </div>
)
}