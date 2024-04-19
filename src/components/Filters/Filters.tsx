import classes from "./Filters.module.scss";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import { FilterPropsType } from "./withFilters";
import Button from "@mui/material/Button";

const Filters = ({
  priceRange,
  ratingRange,
  inStock,
  hasReviews,
  handlePriceChange,
  handleRatingChange,
  handleInStockChange,
  handleHasReviewsChange,
  handleClearFilters,
}: FilterPropsType) => {
  return (
    <div className={classes.filters}>
      <div className={classes.title}>Filters</div>
      <div className={classes.filter}>
        <div className={classes.label}>Price</div>
        <div className={classes.inputs}>
          <MuiInput
            value={priceRange[0]}
            size="small"
            onChange={(e) => handlePriceChange(+e.target.value, "from")}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
          <MuiInput
            value={priceRange[1]}
            size="small"
            onChange={(e) => handlePriceChange(+e.target.value, "to")}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
            }}
          />
        </div>
        <Slider
          value={priceRange}
          onChange={(_e, value, activeThumb) =>
            handlePriceChange(value, activeThumb === 0 ? "from" : "to")
          }
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={100}
        />
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Rating</div>
        <div className={classes.inputs}>
          <MuiInput
            value={ratingRange[0]}
            size="small"
            onChange={(e) => handleRatingChange(+e.target.value, "from")}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 5,
              type: "number",
            }}
          />
          <MuiInput
            value={ratingRange[1]}
            size="small"
            onChange={(e) => handleRatingChange(+e.target.value, "to")}
            inputProps={{
              step: 0.1,
              min: 0,
              max: 5,
              type: "number",
            }}
          />
        </div>
        <Slider
          value={ratingRange}
          onChange={(_e, value, activeThumb) =>
            handleRatingChange(value, activeThumb === 0 ? "from" : "to")
          }
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={5}
          step={0.1}
        />
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Stock Presence</div>
        <div className={classes.inputs}>
          <Checkbox
            checked={inStock}
            onChange={(_e, isChecked) => handleInStockChange(isChecked)}
          />
        </div>
      </div>
      <div className={classes.filter}>
        <div className={classes.label}>Reviews Presence</div>
        <div className={classes.inputs}>
          <Checkbox
            checked={hasReviews}
            onChange={(_e, isChecked) => handleHasReviewsChange(isChecked)}
          />
        </div>
      </div>
      <Button
        className={classes.clearBtn}
        variant="contained"
        onClick={handleClearFilters}
      >
        Remove all filters
      </Button>
    </div>
  );
};

export default Filters;
