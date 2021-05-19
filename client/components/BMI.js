import React, { useEffect, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MetricBMI from "./MetricBMI";
import ImperialBMI from "./ImperialBMI";

function BMI() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <div className="BMI">
        <h1>BMI CALCULATOR</h1>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
              />
            }
            label={state.checkedA ? "Metric" : "Imperial"}
          />
        </FormGroup>
        {state.checkedA ? <MetricBMI /> : <ImperialBMI />}

        <img src="https://westlakeplasticsurgery.com/wp-content/uploads/2020/02/BMI-Chart-Detailed.png" />
      </div>
    </div>
  );
}
export default BMI;
