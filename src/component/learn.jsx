import React, {useState} from "react"

// get={GetLearn}
// learning={learning}
// hymns={HymnNoAndTitle}
// learned={LearnedNew}
// new={GetLearn}

const Learn = ({ getLearn, learning, hymns, learned, finished,numLearned, numSongs, delay }) => {
  
  return (
    <>
      <div className="heading">Learn</div>
      
      <div className="button" 
        onClick={learned}
        style={{
          animation: "color-gradient " + numSongs + "s linear 1",
          animationFillMode: "forwards",
          animationPlayState: "paused",
          animationDelay: "-" + (numLearned - delay) + "s"}}
        >Learned</div>
      <div 
        className="button" 
        onClick={getLearn}
        style={{
          animation: "color-gradient " + numSongs + "s linear 1",
          animationFillMode: "forwards",
          animationPlayState: "paused",
          animationDelay: "-" + (numLearned - delay * 2) + "s"}}
        >New Song</div>
      <div className="song-container">
        {learning === -1 ? (
          <div className="songMsg">"Congratulation! You've learned everything"</div>
        ) : (
          <div className="song">
            <div className="song-no">{hymns[learning][0]}</div>
            <div className="song-title">{hymns[learning][1]}</div>
          </div>
        )}
        
      </div>
    </>
  )
}

export default Learn;