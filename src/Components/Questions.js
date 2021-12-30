import React, { useEffect, useState } from "react";

function Questions(props) {
  let questionArr = props.data;
  let count = props.idx;
  let tname = props.testName;
  let options;
  let optionsValid;
  let qnId;
  let type;
  let boxType;
  if (questionArr) {
    options = questionArr.map((qn) => qn.options);
    optionsValid = options[count];
    type = questionArr[count] && questionArr[count].type;
    qnId = questionArr.map((qn) => qn._id);
    qnId = qnId[count];
  }
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState();
  const [selectedArr, setSelectedArr] = useState([]);
  const [selected, setSelected] = useState();
  const [testObj, setTestObj] = useState(
    JSON.parse(localStorage.getItem(tname)) || []
  );
  if (JSON.parse(localStorage.getItem(tname) === null)) {
    localStorage.setItem(tname, JSON.stringify([]));
  }

  if (type === "Multiple-Response") {
    boxType = "checkbox";
  } else {
    boxType = "radio";
  }

  const updateItem = (qid, itemAttributes) => {
    if (testObj) {
      let index = -1;
      index = testObj.findIndex((x) => x.id === qid);
      if (index === -1) return false;
      else {
        testObj &&
          setTestObj([
            ...testObj.slice(0, index),
            { id: qid, selectedOption: itemAttributes },
            ...testObj.slice(index + 1),
          ]);
        return true;
      }
    }
  };

  const handleClick = (i) => {
    if (boxType === "checkbox") {
      if (checked.includes(i)) {
        setChecked(checked.filter((val) => i !== val));
      } else {
        setChecked([...checked, i]);
      }
    } else {
      setRadio(i);
    }
  };
  useEffect(() => {
    setSelected();
    setSelectedArr([]);
  }, [count]);

  useEffect(() => {
    if (selectedArr.includes(checked)) {
      setSelectedArr(selectedArr.filter((val) => checked !== val));
    } else setSelectedArr(checked);
    if (updateItem(qnId, checked)) return;
    setTestObj([...testObj, { id: qnId, selectedOption: [...checked] }]);
  }, [checked]);

  useEffect(() => {
    setSelected(radio);
    if (updateItem(qnId, radio)) return;
    setTestObj([...testObj, { id: qnId, selectedOption: radio }]);
  }, [radio]);

  useEffect(() => {
    localStorage.setItem(tname, JSON.stringify(testObj));
  }, [testObj]);
  const getStr = () => {
    let retItems = JSON.parse(localStorage.getItem(tname));
    setTestObj(retItems);
    if (retItems) retItems = retItems.filter((e) => e.selectedOption !== null);
    retItems &&
      retItems.map((ret, i) => {
        if (count === i) {
          if (typeof ret.selectedOption === "number") {
            setSelected(ret.selectedOption);
            setSelectedArr([]);
          } else {
            setSelectedArr(ret.selectedOption);

            setSelected();
          }
        }
      });
  };
  useEffect(() => {
    getStr();
  }, [props]);

  return (
    <>
      <br />
      {questionArr && questionArr[count] && questionArr[count].questionText}
      <br />
      <br />

      {optionsValid &&
        optionsValid.map((op, i) => (
          <React.Fragment key={op}>
            {boxType === "checkbox" && selectedArr ? (
              <>
                <input
                  className="boxes"
                  type={boxType}
                  value={i}
                  name="answer"
                  id={i}
                  onChange={() => handleClick(i)}
                  checked={selectedArr.includes(i)}
                ></input>
                <label htmlFor={i}>{op}</label>
                <br />
              </>
            ) : selected !== null ? (
              <>
                <input
                  className="boxes"
                  type={boxType}
                  value={i}
                  name="answer"
                  id={i}
                  onChange={() => handleClick(i)}
                  checked={i === selected}
                ></input>
                <label htmlFor={i}>{op}</label>
                <br />
              </>
            ) : (
              <>
                <input
                  className="boxes"
                  type={boxType}
                  value={i}
                  name="answer"
                  id={i}
                  onChange={() => handleClick(i)}
                  defaultChecked={false}
                ></input>
                <label htmlFor={i}>{op}</label>
                <br />
              </>
            )}
          </React.Fragment>
        ))}
    </>
  );
}

export default Questions;
