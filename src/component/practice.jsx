import React from "react"

// get={GetPractice}
// practice={practice}
// hymns={HymnNoAndTitle}

const Practice = ({ getPractice, practice, hymns, fresh, numLearned, numSongs, delay }) => {

  // console.log(fresh);
  
  return (
    <>
      <div className="heading">Practice</div>
      <div 
        className="button" 
        onClick={getPractice}
        style={{
          animation: "color-gradient " + numSongs + "s linear 1",
          animationFillMode: "forwards",
          animationPlayState: "paused",
          animationDelay: "-" + (numLearned - delay*3) + "s"}}
        >New Songs</div>
      <div className="song-container">
        {
          fresh 
          ? (<div className="songMsg">"You haven't learned anything yet!"</div>)
          : practice.map((song, i) => {
            return (
              <div className="song" key={i}>
                <div className="song-no">{hymns[song][0]}</div>
                <div className="song-title">{hymns[song][1]}</div>
              </div>
            )
          }) 
        }
      </div>
    </>
  )
}

export default Practice;