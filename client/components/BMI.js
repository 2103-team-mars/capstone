import React, { useEffect, useState } from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import MetricBMI from "./MetricBMI";
import ImperialBMI from "./ImperialBMI";
import Chart from "./Chart";
import "../../public/style.css";

function BMI() {
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Chart />
      <div className="BMI">
        <h1>BMI CALCULATOR</h1>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                id="switch"
                checked={state.checkedA}
                onChange={handleChange}
                name="checkedA"
                color="grey"
              />
            }
            label={state.checkedA ? "Metric" : "Imperial"}
          />
        </FormGroup>
        {state.checkedA ? <MetricBMI /> : <ImperialBMI />}

        <img
          className="photo"
          src="https://miro.medium.com/max/4532/1*j-53cEPitjKSSTCGooYFfg.png"
        />
      </div>
    </div>
  );
}
export default BMI;
