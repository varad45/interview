import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Final(props) {
  const [score, setScore] = useState(0);
  const [storedAns, setStoredAns] = useState();
  let post = props.data;
  const [questions, setQuestions] = useState([]);
  let name = [];
  post && post.map((idx) => name.push(idx.name));

  useEffect(() => {
    name &&
      name.map((tname, i) => {
        if (localStorage.getItem(tname)) {
          const retAns = JSON.parse(localStorage.getItem(tname));
          retAns && setStoredAns(retAns);
          post && setQuestions(post[i].questions);
        }
      });
  }, [props]);

  const checkAns = () => {
    setScore(0);

    if (storedAns) {
      questions &&
        questions.map(
          (qn) =>
            storedAns &&
            storedAns.map((stored) => {
              if (qn._id === stored.id) {
                if (typeof qn.correctOptionIndex === "number") {
                  if (qn.correctOptionIndex === stored.selectedOption) {
                    setScore((prev) => prev + 1);
                  }
                } else {
                  if (stored.selectedOption) {
                    let sort = JSON.stringify(stored.selectedOption.sort());
                    let ans = JSON.stringify(qn.correctOptionIndex);
                    if (sort === ans) {
                      setScore((prev) => prev + 1);
                    }
                  }
                }
              }
            })
        );
    }
  };

  useEffect(() => {
    checkAns();
  }, [questions, storedAns]);

  return (
    <>
      <div className="finishComp">
        <Link to="/" onClick={() => localStorage.clear()}>
          <button>Home</button>
        </Link>
        <p>Correct Answers : {score}</p>
        <p>Wrong answers : {questions && questions.length - score}</p>
      </div>
    </>
  );
}

export default Final;
