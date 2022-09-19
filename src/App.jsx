import React, { useState, useEffect } from 'react'
import './App.css'
import Configure from './component/configure.jsx'
import Header from './component/header.jsx'
import Learn from './component/learn.jsx'
import Practice from './component/practice.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cookieTemplate from './data/cookie-default.json'
import hymnNoAndTitle from './data/hymnNoAndTitle.json'

export default function App() {

  const practiceNo = 5;
  const toastDuration = 1500;

  const HymnNoAndTitle = [...hymnNoAndTitle.data];
  const [hymnLearn, setHimLearn] = useStickyState([...cookieTemplate.data], 'status');
  const [hymnPractice, setHimPractice] = useState([]);
  const [practice, setPractice] = useState([]);
  const [numLearned, setNumLearned] = useState();
  const [finished, setFinished] = useState();
  const [fresh, setFresh] = useState();
  const numSongs = HymnNoAndTitle.length;

  const gradientDelay = Math.floor(hymnLearn.length / 5);
  
  function useStickyState(defaultValue, key) {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }

  useEffect(() => {
    setNumLearned(filterHymns(true).length);
    GetPractice();
  }, [])

  useEffect(() => {
    setNumLearned(filterHymns(true).length);
  }, [hymnLearn])

  useEffect(() => {
    learningState();
    if (numLearned <= practiceNo) {
      GetPractice();
    }
  }, [numLearned])

  const filterHymns = (isLearned) => {
    let filteredArray = [];
    filteredArray = hymnLearn.filter((arr) => {
      if (arr[1] === isLearned) {
        return true;
      } else if (arr[1] === !isLearned) {
        return false;
      }
    })
    return filteredArray;
  }

  const learningState = () => {
    if (numLearned == numSongs) {
      setFinished(true);
      setFresh(false);
    } else if (numLearned == 0) {
      setFinished(false);
      setFresh(true);
    } else {
      setFinished(false);
      setFresh(false);
    }
  }

  const GetHymnIndexByNo = (no) => {
    if (no > 0) {
      for (let i = 0; i < HymnNoAndTitle.length; i++) {
        if (HymnNoAndTitle[i][0] === no) {
          return i;
        }
      }
    } else {
      return -1;
    }
  }

  const GetRandom = (isLearned) => {
    let filteredHymns = filterHymns(isLearned);
    let rand;
    let no;
    if (filteredHymns.length > 0) {
      rand = Math.floor(Math.random() * (filteredHymns.length))
      no = filteredHymns[rand][0];
    } else {
      no = -1;
    }

    return GetHymnIndexByNo(no);
  }

  const [learning, setLearning] = useStickyState(GetRandom(false), 'learn');

  const GetLearn = () => {
    if (learning >= 0) {
      let idx = GetRandom(false);
      setLearning(idx);
    } else {
      toast.error("There are no more songs to learn.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: toastDuration
      })
    }
  }

  const GetPractice = () => {
    let filteredHymns = filterHymns(true);
    let practiceArray = []

    if (filteredHymns.length > 0) {
      if (filteredHymns.length <= practiceNo) {
        for (let i = 0; i < filteredHymns.length; i++) {
          practiceArray.push(GetHymnIndexByNo(filteredHymns[i][0]));
        }
      } else {
        for (let i = 0; i < practiceNo; i++) {
          let randomHymn;
          do {
            randomHymn = GetRandom(true);
          } while (practiceArray.includes(randomHymn))
          practiceArray.push(randomHymn);
        }
      }
      setPractice(practiceArray);
    }
  }

  const GetPracticeUser = () => {
    let filteredHymns = filterHymns(true);
    let practiceArray = []

    if (filteredHymns.length > 0) {
      if (filteredHymns.length <= practiceNo) {
        toast.error("You've only learned " + numLearned + " songs.", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: toastDuration
        })
      } else {
        for (let i = 0; i < practiceNo; i++) {
          let randomHymn;
          do {
            randomHymn = GetRandom(true);
          } while (practiceArray.includes(randomHymn))
          practiceArray.push(randomHymn);
        }
        setPractice(practiceArray);
      }
    } else {
      toast.error("You haven't learned anything yet!.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: toastDuration
      })
    }
  }

  const notify = (msg) => toast.error(msg, {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: toastDuration
  });
  const toaster = () => toast.success("This isn't a ten second setup", {
    position: toast.POSITION.BOTTOM_CENTER,
    autoClose: toastDuration
  })

  const Unlearned = (no) => {
    if (!isNaN(no)) {
      no = parseInt(no)
      if (Number.isInteger(no)) {
        if (no < hymnLearn.length && no > 0) {
          let index = GetHymnIndexByNo(no);
          if (index !== -1) {
            if (hymnLearn[index][1]) {
              let newHymnLearn = [...hymnLearn];

              if (numLearned === numSongs) {
                setLearning(index);
              }

              if (practice.includes(index) && filterHymns(true).length > 5) {
                let newPractice = [...practice];
                let randomHymn;
                do {
                  randomHymn = GetRandom(true);
                } while (newPractice.includes(randomHymn))
                newPractice[newPractice.indexOf(index)] = randomHymn;
                setPractice(newPractice);
              }
              newHymnLearn[index][1] = false;
              setHimLearn(newHymnLearn);

              document.getElementById('input').value = "";
              document?.getElementById('input').focus();
              document?.getElementById('input').select();

              toast.success("The song has been updated successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: toastDuration
              })
              return;
            } else {
              toast.error("That song hasn't been learned yet.", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: toastDuration
              })
            }
          } else {
            toast.error("There is no song with that page number.", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: toastDuration
            })
          }
        } else {
          toast.error("Please enter a number between 1 and " + hymnLearn.length + ".", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: toastDuration
          })
        }
      } else {
        toast.error("Invalid input. Please enter an integer.", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: toastDuration
        })
      }
    } else {
      toast.error("Invalid input. Please enter a number.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: toastDuration
      })
    }
    document?.getElementById('input').focus();
    document?.getElementById('input').select();
  }

  const LearnedNew = () => {

    let newHymnLearn = [...hymnLearn];
    console.log("LEARNING");
    console.log(learning);

    if (learning >= 0) {
      console.log("ENTERED");
      newHymnLearn[learning][1] = true;
      // newHymnLearn[learning][2] = newHymnLearn[learning][2] + 1;

      setHimLearn(newHymnLearn);
      GetLearn();
    } else {
      toast.error("There are no more songs to learn.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: toastDuration
      })
    }
  }

  const LearnedManual = (no) => {
    if (!isNaN(no)) {
      no = parseInt(no)
      if (Number.isInteger(no)) {
        if (no < hymnLearn.length && no > 0) {
          let index = GetHymnIndexByNo(no);
          if (index !== -1) {
            if (!hymnLearn[index][1]) {
              let newHymnLearn = [...hymnLearn];

              if (numLearned >= numSongs - 1) {
                setLearning(-1);
              } else if (index === learning) {
                GetLearn();
              }

              newHymnLearn[index][1] = true;
              setHimLearn(newHymnLearn)

              document.getElementById('input').value = "";
              document?.getElementById('input').focus();
              document?.getElementById('input').select();

              toast.success("The song has been updated successfully", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: toastDuration
              })

              return;
            } else {
              toast.error("That song has already been marked 'learned'.", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: toastDuration
              })
            }
          } else {
            toast.error("There is no song with that page number.", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: toastDuration
            })
          }
        } else {
          toast.error("Please enter a number between 1 and " + hymnLearn.length + ".", {
            position: toast.POSITION.BOTTOM_CENTER,
            autoClose: toastDuration
          })
        }
      } else {
        toast.error("Invalid input. Please enter an integer.", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: toastDuration
        })
      }
    } else {
      toast.error("Invalid input. Please enter a number.", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: toastDuration
      })
    }
    // let index = GetHymnIndexByNo(no);
    // let newHymnLearn = [...hymnLearn];
    // newHymnLearn[index][1] = true;
    // // newHymnLearn[index][2] = newHymnLearn[learning][2] + 1;

    // setHimLearn(newHymnLearn)
    document?.getElementById('input').focus();
    document?.getElementById('input').select();
  }

  const clearStorage = () => {
    window.localStorage.clear();
  }

  return (
    <main>
      <Header
        numLearned={numLearned}
        numSongs={numSongs}
        delay={gradientDelay}
      />
      <div className='body'>
        {//<button onClick={clearStorage}>clear mems</button>
        }
        <Learn
          getLearn={GetLearn}
          learning={learning}
          hymns={HymnNoAndTitle}
          learned={LearnedNew}
          finished={finished}
          numLearned={numLearned}
          numSongs={numSongs}
          delay={gradientDelay}
        />
        <Practice
          getPractice={GetPracticeUser}
          practice={practice}
          hymns={HymnNoAndTitle}
          fresh={fresh}
          numLearned={numLearned}
          numSongs={numSongs}
          delay={gradientDelay}
        />
        <Configure
          learned={LearnedManual}
          unlearned={Unlearned}
          numLearned={numLearned}
          numSongs={numSongs}
          delay={gradientDelay}
        />
        <br />
        <br />
        <br />
        <br />
      </div>
    </main>
  )
}
