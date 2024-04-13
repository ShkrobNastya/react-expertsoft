import { useState } from "react";
import classes from "./Filters.module.scss";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";

const Filters = () => {
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? 0 : Number(event.target.value));
  };

  return (
    <div className={classes.filters}>
      <div className={classes.title}>Filters</div>
      <div className={classes.filter}>
        <div className={classes.label}>Price</div>
        <div className={classes.inputs}>
          <MuiInput
            value={value[0]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
          <MuiInput
            value={value[1]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Rating</div>
        <div className={classes.inputs}>
          <MuiInput
            value={value[0]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
          <MuiInput
            value={value[1]}
            size="small"
            onChange={handleInputChange}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
        />
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Stock Presence</div>
        <div className={classes.inputs}>
          <Checkbox />
        </div>
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Reviews Presence</div>
        <div className={classes.inputs}>
          <Checkbox />
        </div>
      </div>
    </div>
  );
};

export default Filters;
