import React, { useEffect, useState } from "react";
const MetricBMI = () => {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bmi, setBMI] = useState(0);

  const handleHeight = (event) => {
    let height = event.target.value;
    setHeight(height);
  };

  const handleWeight = (event) => {
    let weight = event.target.value;
    setWeight(weight);
  };
  useEffect(() => {
    let bmiMetric = (weight / (height * 2)) * 100;
    setBMI(bmiMetric.toFixed(2));
  }, [height, weight]);

  return (
    <div>
      <p>Height in cm</p>
      <input type="number" onChange={handleHeight}></input>
      <p>Weight in kg</p>
      <input type="number" onChange={handleWeight}></input>
      <h2>BMI: {bmi === NaN ? 0 : bmi}</h2>
    </div>
  );
};
export default MetricBMI;
