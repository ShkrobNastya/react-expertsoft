import { Suspense } from "react";
import classes from "./AboutUs.module.scss";
import { CircularProgress } from "@mui/material";

const AboutUs = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
      <div className="container">
        <div className={classes.wrapper}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            aspernatur dolorem error placeat architecto adipisci amet, veritatis
            quos natus? Modi perspiciatis optio ducimus ab commodi cupiditate
            totam facilis maiores suscipit! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nesciunt aspernatur dolorem error
            placeat architecto adipisci amet, veritatis quos natus? Modi
            perspiciatis optio ducimus ab commodi cupiditate totam facilis
            maiores suscipit!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            aspernatur dolorem error placeat architecto adipisci amet, veritatis
            quos natus? Modi perspiciatis optio ducimus ab commodi cupiditate
            totam facilis maiores suscipit! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nesciunt aspernatur dolorem error
            placeat architecto adipisci amet, veritatis quos natus? Modi
            perspiciatis optio ducimus ab commodi cupiditate totam facilis
            maiores suscipit!
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default AboutUs;
