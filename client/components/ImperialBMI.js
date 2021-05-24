import React, { useEffect, useState } from 'react';
const ImperialBMI = () => {
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
    let bmiImperial = (weight / Math.pow(height, 2)) * 703;
    setBMI(bmiImperial.toFixed(2));
  }, [height, weight]);

  return (
    <div>
      <p>Height in inches</p>
      <input type="number" onChange={handleHeight}></input>
      <p>Weight in lbs</p>
      <input type="number" onChange={handleWeight}></input>
      <h2>BMI: {isNaN(bmi) ? 0 : bmi}</h2>
    </div>
  );
};
export default ImperialBMI;
