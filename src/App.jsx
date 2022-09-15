import React, { useState, useEffect } from 'react'
import './App.css'
import Configure from './component/configure.jsx'
import Header from './component/header.jsx'
import Learn from './component/learn.jsx'
import Practice from './component/practice.jsx'

import cookieTemplate from './data/cookie-default.json'
import hymnNoAndTitle from './data/hymnNoAndTitle.json'

export default function App() {

  // const rawCookie = JSON.parse(cookieTemplate);
  const practiceNo = 5;

  const HymnNoAndTitle = [...hymnNoAndTitle.data];
  const [hymnLearn, setHimLearn] = useStickyState([...cookieTemplate.data], 'status');
  const [hymnPractice, setHimPractice] = useState([]);
  const [practice, setPractice] = useState([]);
  // const [hymnLearn, setHimLearn] = useState([]);

  function useStickyState(defaultValue, key) {
    // console.log("does this run?");
    // console.log(defaultValue);
    // console.log(window.localStorage.getItem(key));
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    // console.log('VALUE');
    // console.log(value);
    return [value, setValue];
  }

  useEffect(() => {
    GetPractice();
  }, [])

  const filterHymns = (isLearned) => {
    console.log("FilterHymns");
    let filteredArray = hymnLearn.filter((arr) => {
      if (arr[1] === isLearned) {
        return true;
      } else if (arr[1] === !isLearned) {
        return false;
      }
    })
    return filteredArray;
  }

  const GetHymnIndexByNo = (no) => {
    for (let i = 0; i < HymnNoAndTitle.length; i++) {
      if (HymnNoAndTitle[i][0] === no) {
        return i;
      }
    }
  }

  const GetRandom = (isLearned) => {
    console.log("GetRandom");
    let filteredHymns = filterHymns(isLearned);
    let rand;
    let no;

    if (filteredHymns.length > 0) {
      rand = Math.floor(Math.random() * (filteredHymns.length))
      no = filteredHymns[rand][0];
    } else {
      no = -1;
    }

    // console.log(no);
    return GetHymnIndexByNo(no);
  }

  const [learning, setLearning] = useStickyState(GetRandom(false), 'learn');

  const GetLearn = () => {
    console.log("GetLearn");
    setLearning(GetRandom(false));
  }

  const GetPractice = () => {
    let filteredHymns = filterHymns(true);
    let practiceArray = []

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

  const Learned = () => {

  }
  const Unlearned = (no) => {
    let index = GetHymnIndexByNo(no);
    let newHymnLearn = [...hymnLearn];
    newHymnLearn[index][1] = false;

    setHimLearn(newHymnLearn,);
  }
  const LearnedNew = () => {
    let newHymnLearn = [...hymnLearn];
    newHymnLearn[learning][1] = true;
    newHymnLearn[learning][2] = newHymnLearn[learning][2] + 1;

    setHimLearn(newHymnLearn)
    GetLearn();
  }
  const LearnedManual = (no) => {
    let index = GetHymnIndexByNo(no);
    let newHymnLearn = [...hymnLearn];
    newHymnLearn[index][1] = true;
    newHymnLearn[index][2] = newHymnLearn[learning][2] + 1;

    setHimLearn(newHymnLearn)
  }

  const clearStorage = () => {
    window.localStorage.clear();
  }

  // console.log("LEARNING");
  // console.log(learning);
  console.log(practice);

  return (
    <main>
      <Header />
      <button onClick={clearStorage}>clear mems</button>
      <Learn
        getLearn={GetLearn}
        learning={learning}
        hymns={HymnNoAndTitle}
        learned={LearnedNew}
      />
      <Practice
        getPractice={GetPractice}
        practice={practice}
        hymns={HymnNoAndTitle}
      />
      <Configure
        learned={LearnedNew}
        unlearned={Unlearned}
      />
    </main>
  )
}
