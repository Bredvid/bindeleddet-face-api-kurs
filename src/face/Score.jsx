import React from 'react'
import Button from "@material-ui/core/Button/Button";
import {rounds} from './Game'

export const Score = ({score, round, photos, setGameStatus}) => {

    // Add all values in score state
    const getTotalScore = () => Object.values(score).reduce((a, b) => a + b);

    // Increase round state
    const nextRound = () => setGameStatus({showWebcamera: true, round: round + 1})

    return (
        <div className={"score-page"}>
            <div className="rounds-preview">
                {/*Show the photos taken, and their calculated score*/}
                {photos.length > 0 && rounds.map((roundName, index) =>
                    round > index &&
                    <div key={index} className={"round"}>
                        <p>{roundName}</p>
                        {photos[index] &&
                        <img className={"preview-image"} src={photos[index]}/>
                        }
                        <p>Score: {score[roundName]}</p>
                    </div>
                )}
            </div>

            {round < 4 &&
            <Button style={{margin: 'auto', maxWidth: '50vw'}} variant="contained" color="primary" onClick={nextRound}>
                Next Round
            </Button>
            }

            {round === 4 &&
            <>
                <h2>GAME OVER</h2>
                <h2>Total score: {getTotalScore()}</h2>
                <p>Refresh page to start over</p>
            </>}
        </div>
    )
}