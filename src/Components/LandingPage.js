import React from "react";
import { Link } from "react-router-dom";
function LandingPage(props) {
  let post = props.data;
  let testArr = post && post.tests;
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
              testArr.map((test) => (
                <tr key={test.name}>
                  <td>{test.name}</td>
                  <td>{test.questions.length}</td>
                  <td>
                    <Link to={`${test.name.replace(/\s/g, "")}/0`}>
                      <button>Start Test</button>
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
