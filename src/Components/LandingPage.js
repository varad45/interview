import React from "react";
import { Link } from "react-router-dom";
function LandingPage(props) {
  let post = props.data;
  let testArr = post && post.tests;
  const clrStorage = (idx) => {
    for (let i = 0; i < 3; i++) {
      if (i !== idx) {
        localStorage.removeItem(testArr && testArr[i].name);
      }
    }
  };
  return (
    <>
      <h1>My Interview Portal</h1>
      <div className="landingTable">
        <table>
          <tbody>
            <tr>
              <th>Test Name</th>
              <th>No of questions :</th>
              <th></th>
            </tr>
            {testArr &&
              testArr.map((test, i) => (
                <tr key={test.name}>
                  <td>{test.name}</td>
                  <td>{test.questions.length}</td>
                  <td>
                    <Link
                      to={`${test.name.replace(/\s/g, "")}/${
                        test.questions[0]._id
                      }`}
                    >
                      <button onClick={() => clrStorage(i)}>Start Test</button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LandingPage;
