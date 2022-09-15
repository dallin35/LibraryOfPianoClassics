import React from "react"

// get={GetPractice}
// practice={practice}
// hymns={HymnNoAndTitle}

const Practice = ({ getPractice, practice, hymns }) => {
  return (
    <>
      <h3>Practice</h3>
      <div>
        <div onClick={getPractice}>New Songs</div>
        {practice.map((song, i) => {
          console.log("SONG");
          console.log(song);
          console.log("IIIIIIIIIIIII");
          console.log(i);
          return (
            <div key={i}>{hymns[song][0] + ' ' + hymns[song][1]}</div>
          )
        })}
      </div>
    </>
  )
}

export default Practice;