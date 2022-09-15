import React from "react"

// get={GetLearn}
// learning={learning}
// hymns={HymnNoAndTitle}
// learned={LearnedNew}
// new={GetLearn}

const Learn = ({ getLearn, learning, hymns, learned }) => {
  return (
    <>
      <h3>Learn</h3>
      <div onClick={learned}>Learned</div>
      <div onClick={getLearn}>New Song</div>
      <div>{hymns[learning][0] + ' ' + hymns[learning][1]}</div>
    </>
  )
}

export default Learn;