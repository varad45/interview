import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Test from "./Components/Test";
import Final from "./Components/Final";
function App() {
  const [post, setPost] = useState(null);
  useEffect(() => {
    axios
      .get(`http://interviewapi.stgbuild.com/getQuizData`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage data={post} />} />
          <Route
            path="/AngularJStest/:id"
            element={<Test data={post && post.tests[0]} />}
          />
          <Route
            path="/JavaScripttest/:id"
            element={<Test data={post && post.tests[1]} />}
          />
          <Route
            path="/NodeJStest/:id"
            element={<Test data={post && post.tests[2]} />}
          />
          <Route path="/Final" element={<Final data={post && post.tests} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
