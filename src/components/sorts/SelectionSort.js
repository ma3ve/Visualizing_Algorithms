import React from "react";
import { Button, Grid } from "@material-ui/core";
import { windowDimensionContext } from "../../App";
import { delay } from "../utils/delay";

function SelectionSort() {
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

  const startSelectionSort = async () => {
    for (let i = 0; i < array.length; i++) {
      let minI = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[minI] > array[j]) {
          minI = j;
        }
      }
      document.getElementById(minI).style.backgroundColor = "green";
      document.getElementById(i).style.backgroundColor = "blue";
      await delay(0.25);
      let temp = array[minI];
      array[minI] = array[i];
      array[i] = temp;
      document.getElementById(minI).style.backgroundColor = "red";
      document.getElementById(i).style.backgroundColor = "white";

      setArray([...array]);
      // document.getElementById(i).style.backgroundColor = "white";
    }
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
                width: "2px",
                margin: "1px",
              }}
              key={i}
              id={i}
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
              setArray(
                randomArray(arraySettings.length, arraySettings.maxx)
              );
              array.forEach((a, i) => {
                document.getElementById(i).style.backgroundColor = "red";
              });
            }}
          >
            randomize
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={startSelectionSort}
          >
            Sort
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SelectionSort;
