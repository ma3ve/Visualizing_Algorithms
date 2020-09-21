import React from "react";
import { Button, Grid } from "@material-ui/core";
import { windowDimensionContext } from "../../App";
import { delay } from "../utils/delay";

function InsertionSort() {
  const [array, setArray] = React.useState([]);
  const [arraySettings, setArraySettings] = React.useState({
    maxx: 0,
    length: 0,
  });
  const [inProgress, setInProgress] = React.useState(false);

  const windowDimension = React.useContext(windowDimensionContext)
    .windowDimension;
  const updateWindowDimensions = React.useContext(windowDimensionContext)
    .updateWindowDimensions;

  React.useEffect(() => {
    setArraySettings({
      maxx: Math.floor(0.8 * windowDimension.height),
      length: Math.floor(0.8 * windowDimension.width),
    });
  }, [windowDimension]);

  let randomArray = (length, max) =>
    [...(new Array(Math.floor(length / 10)) + 5)].map(() =>
      Math.round(Math.random() * max)
    );

  React.useEffect(() => {
    setArray(randomArray(arraySettings.length, arraySettings.maxx));
  }, [arraySettings]);

  const startInsertionSort = async () => {
    setInProgress(true);
    for (let i = 1; i < arraySettings.length; i++) {
      let value = array[i];
      let hole = i;
      while (hole > 0 && array[hole - 1] > value) {
        array[hole] = array[hole - 1];

        hole = hole - 1;
        document.getElementById(hole).style.background = "black";
        document.getElementById(hole + 1).style.background = "red";
        setArray([...array]);
        await delay(1);
      }
      await delay(1);
      array[hole] = value;

      setArray([...array]);
      document.getElementById(hole).style.background = "red";
    }
    setInProgress(false);
    Object.values(document.getElementsByClassName("aBlock")).forEach(
      (x) => {
        x.style.background = "white";
      }
    );
  };

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
          return (
            <Grid
              item
              style={{
                height: h,
                background: "red",
                width: "6px",
                margin: "2px",
              }}
              key={i}
              id={i}
              className="aBlock"
            />
          );
        })}
      </Grid>
      <Grid xs={12} container item justify="center" spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              updateWindowDimensions();
              array.forEach((a, i) => {
                document.getElementById(i).style.backgroundColor = "red";
              });
            }}
            disabled={inProgress}
          >
            randomize
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={startInsertionSort}
            disabled={inProgress}
          >
            Sort
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default InsertionSort;
