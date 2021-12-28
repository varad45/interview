import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { Link, useParams } from "react-router-dom";

function Test(props) {
  let { id } = useParams();
  let post = props.data;
  let questionArr;
  if (post) questionArr = post.questions;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem(post && post.name))
      localStorage.setItem(post && post.name, "[]");
  }, []);

  useEffect(() => {
    if (!id) {
      setCount(1);
    } else {
      setCount(parseInt(id));
    }
  });
  const nextQn = () => {
    if (count >= questionArr.length - 1) {
      return;
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const prevQn = () => {
    if (count <= 0) {
      return;
    } else {
      setCount((prev) => prev - 1);
    }
  };
  return (
    <div className="questionContainer">
      <h1>{post && post.name}</h1>
      <div className="qnBody">
        <h4>Question: {count + 1}</h4>
        <Questions
          data={post && post.questions}
          idx={count}
          testName={post && post.name}
        />
      </div>
      <div className="buttonContainer">
        <div className="left">
          {count ? (
            <Link to={`/${post && post.name.replace(/\s/g, "")}/${count - 1}`}>
              <button onClick={prevQn}>previous</button>
            </Link>
          ) : (
            <></>
          )}
          <Link to={`/${post && post.name.replace(/\s/g, "")}/${count + 1}`}>
            <button onClick={nextQn}>next</button>
          </Link>
        </div>
        <Link to="/Final">
          <button>Finish Test</button>
        </Link>
      </div>
    </div>
  );
}

export default Test;
