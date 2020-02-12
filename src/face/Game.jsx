import React, {useEffect, useState} from 'react'
import {Webcamera} from "./Webcamera";
import {Score} from "./Score";

const subscriptionKey = '7661167634b1cb907b70340da6cdb' //VIKTIG: legg til 8, 8 og e først i denne key'en
const API_URL = 'https://face-api-bredvid.cognitiveservices.azure.com/face/v1.0/detect'
const parameters = '?returnFaceAttributes=emotion'

export const rounds = ['happiness', 'anger', 'sadness', 'surprise'];


export const Game = () => {
    // Create the default game state
    const [gameStatus, setGameStatus] = useState({
        showWebcamera: true,
        round: 1
    });

    // Create an empty list for the captured photos
    const [photos, setPhotos] = useState([])

    const addPhoto = photo => {
        setPhotos(photos.concat(photo))
        setGameStatus({...gameStatus, showWebcamera: false})
    }

    // User score
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

    // ImageData is a photo converted into a blob, ready for api request
    const [imageData, setImageData] = useState("")

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-key': subscriptionKey,
            'Content-Type': 'application/octet-stream'
        },
        body: imageData
    }

    /* Noen api-kall kan ta veldig lang tid. Derfor kan det være nyttig å ha en STATE (isFetching) som
     * forteller brukeren din at Appen holder på å hente data. F.eks ved å vise en loading animation */
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
            const sendImageToCloud = () => {
                // Nå henter vi data
                setIsFetching(true)

                fetch(API_URL + parameters, fetchOptions)
                    .then(res => res.json())
                    .then(json => updateScore(json[0].faceAttributes.emotion))
                    .catch(e => console.log(e))

                // Nå er vi ferdige med å hente data (eller feile). For å demonstrere at det kan ta tid bruker
                // vi funskjonen setTimeout for å vente i 1000ms før vi sier at kallet er ferdig.
                setTimeout(() => setIsFetching(false), 1000)

                // Kan bare stå dette --> setIsFetching(true)
            }

            imageData && sendImageToCloud() //Hvis vi har imageData, kall funksjonen sendImageToCloud()
        },
        [imageData])

    return (
        <div className="game-wrapper">

            <Score score={score} round={gameStatus.round} photos={photos} setGameStatus={setGameStatus} isFetching={isFetching}/>

            {gameStatus.showWebcamera &&
            <Webcamera addPhoto={addPhoto} round={gameStatus.round} setImageData={setImageData}/>
            }

        </div>
    )
}