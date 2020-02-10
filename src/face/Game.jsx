import React, {useEffect, useState} from 'react'
import {Webcamera} from "./Webcamera";
import {Score} from "./Score";

const subscriptionKey = '' //secret: 7661167634b1cb907b70340da6cdb


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

    // ImageData is a photo converted into a blob ready for the api request
    const [imageData, setImageData] = useState("")

    return (
        <div className="game-wrapper">
            <Score score={score} round={gameStatus.round} photos={photos} setGameStatus={setGameStatus}/>

            {gameStatus.showWebcamera &&
            <Webcamera addPhoto={addPhoto} round={gameStatus.round} setImageData={setImageData}/>
            }
        </div>
    )
}