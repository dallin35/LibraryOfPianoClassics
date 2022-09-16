import React from "react"

const Header = ({ numLearned, numSongs }) => {
  return (
    <div className="header" style={{
      animation: "color-gradient " + numSongs + "s linear 1",
      animationFillMode: "forwards",
      animationPlayState: "paused",
      animationDelay: "-" + numLearned + "s"
    }}>
      <div className="center-header">Hymns</div>
      <div className="right-header">
        <div className="tracker">{numLearned + "/" + numSongs}</div>
        <div className="tracker">{((100 * numLearned)/numSongs).toFixed(2) + "%"}</div>
      </div>
    </ div>
  )
}

export default Header;