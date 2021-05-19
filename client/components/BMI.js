import React, { useEffect, useState } from "react";
import ".components/";

function BMI() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(0);

  function handleHeight(event) {
    let height = event.target.value;
    setHeight(height);
  }

  function handleWeight(event) {
    let weight = event.target.value;
    setWeight(weight);
  }

  useEffect(() => {
    if (isToggled) {
      let bmiMetric = (weight / (height * 2)) * 100;
      setBMI(bmiMetric.toFixed(2));
    } else {
      let bmiImperial = (weight / (height * 2)) * 100;
      setBMI(bmiImperial.toFixed(2));
    }
  }, [height, weight]);

  return (
    <div className="BMI">
      <h1>BMI CALCULATOR</h1>
      <p>Height</p>
      <input type="number" onChange={handleHeight}></input>
      <p>Weight</p>
      <input type="number" onChange={handleWeight}></input>
      <h2>BMI: {bmi}</h2>
      <img src="https://westlakeplasticsurgery.com/wp-content/uploads/2020/02/BMI-Chart-Detailed.png" />
    </div>
  );
}
export default BMI;
