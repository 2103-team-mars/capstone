import React, { useEffect, useState } from "react";
import Switch from "@material-ui/core/Switch";

function BMI() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
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

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  useEffect(() => {
    let bmiMetric = (weight / (height * 2)) * 100;
    setBMI(bmiMetric.toFixed(2));
  }, [height, weight]);

  return (
    <div>
      <div className="BMI">
        <h1>BMI CALCULATOR</h1>
        <Switch
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <p>Height</p>
        <input type="number" onChange={handleHeight}></input>
        <p>Weight</p>
        <input type="number" onChange={handleWeight}></input>
        <h2>BMI: {bmi}</h2>
        <img src="https://westlakeplasticsurgery.com/wp-content/uploads/2020/02/BMI-Chart-Detailed.png" />
      </div>
    </div>
  );
}
export default BMI;
