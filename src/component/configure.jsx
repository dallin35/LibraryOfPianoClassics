import React from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// learned={LearnedNew}
// unlearned={Unlearned}

const Configure = ({ learned, unlearned, numLearned, numSongs, delay }) => {

  return (
    <>
      <div className="heading">Configure</div>
      <ToastContainer />
      <input type="text" placeholder="Enter a page number" id="input"></input>
      <div 
        className="button" 
        onClick={() => learned(document?.getElementById('input')?.value)}
        style={{
          animation: "color-gradient " + numSongs + "s linear 1",
          animationFillMode: "forwards",
          animationPlayState: "paused",
          animationDelay: "-" + (numLearned - delay*4) + "s"}}
        >Learned</div>
      <div 
        className="button" 
        onClick={() => unlearned(document?.getElementById('input')?.value)}
        style={{
          animation: "color-gradient " + numSongs + "s linear 1",
          animationFillMode: "forwards",
          animationPlayState: "paused",
          animationDelay: "-" + (numLearned - delay*5) + "s"}}
        >Needs More Work</div>
    </>
  )
}

export default Configure;