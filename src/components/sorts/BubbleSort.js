import { Grid } from "@material-ui/core";
import React from "react";
import { windowDimensionContext } from "../../App";
function BubbleSort() {
  const [array, setArray] = React.useState([]);
  const [arraySettings, setArraySettings] = React.useState({
    maxx: 0,
    length: 0,
  });

  const windowDimension = React.useContext(windowDimensionContext);

  React.useEffect(() => {
    setArraySettings({
      maxx: Math.floor(0.8 * windowDimension.height),
      length: Math.floor(0.8 * windowDimension.width),
    });
  }, [windowDimension]);

  let randomArray = (length, max) =>
    [...(new Array(Math.floor(length / 4)) + 5)].map(() =>
      Math.round(Math.random() * max)
    );

  React.useEffect(() => {
    setArray(randomArray(arraySettings.length, arraySettings.maxx));
  }, [arraySettings]);

  return (
    <Grid
      style={{ height: windowDimension.height }}
      container
      justify="center"
    >
      <Grid
        style={{ height: "80%", width: "90%" }}
        container
        item
        justify="center"
      >
        {array.map((h, i) => {
          console.log(h);
          return (
            <Grid
              item
              style={{
                height: h,
                background: "red",
                width: "2px",
                margin: "1px",
              }}
              key={i}
            ></Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default BubbleSort;
