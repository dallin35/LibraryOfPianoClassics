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
    console.log('VALUE');
    console.log(value);
    return [value, setValue];
  }

  useEffect(() => {
    GetPractice();
  }, [practice])

  // useEffect(() => {
  //   localStorage.setItem('status', JSON.stringify(hymnLearn));
  // }, [hymnLearn]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('status'));
  //   console.log(items);
  //   if (items) {
  //     setHimLearn(items);
  //   } else {
  //     setHimLearn([...cookieTemplate.data]);
  //   }
  // }, []);

  // const heLearn = () => {
  //   setHimLearn('bonanza');
  //   localStorage.setItem('learn', JSON.stringify(a));
  //   console.log("Check");
  // }

  // const heLearned = () => {
  //   console.log(JSON.parse(localStorage.getItem('learn')));
  //   console.log(JSON.parse(localStorage.getItem('status')));
  // }

  const filterHymns = (isLearned) => {
    let filteredArray = hymnLearn.filter((arr) => {
      if (arr[2] === isLearned) {
        return true;
      } else if (arr[2] === !isLearned) {
        return false;
      }
    })
    return filteredArray;
  }

  const GetHymnIndexByNo = (no) => {
    for (let i = 0; i < filteredHymns.length; i++) {
      if (HymnNoAndTitle[i][0] === no) {
        return i;
      }
    }
  }

  const GetRandom = (isLearned) => {
    let filteredHymns = filterHymns(isLearned);
    let no;

    if (filteredHymns.length > 0) {
      no = Math.floor(Math.random() * (filteredHymns.length) + 1)
    } else {
      no = -1;
    }

    return GetHymnIndexByNo(no);
  }

  const [learning, setLearning] = useStickyState(GetRandom(false), 'learn');
  const [practice, setPractice] = setState([]);

  const GetLearn = () => {
    setLearning(GetRandom(false));
  }

  const GetPractice = () => {
    let filteredHymns = filterHymns(true);
    let practiceArray = []

    if (filteredHymns.length <= practiceNo) {
      practiceArray = [...filteredHymns];
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

    setHimLearn(newHymnLearn);
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

  return (
    <main>
      <Header />
      <Learn
        get={GetLearn}
        learning={learning}
        hymns={HymnNoAndTitle}
        learned={LearnedNew}
        new={GetLearn}
      />
      <div>{HymnNoAndTitle[learning][0] + ' ' + HymnNoAndTitle[learning][1]}</div>
      <Practice
        get={GetPractice}
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
