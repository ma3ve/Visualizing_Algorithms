import React from "react";
import { Button, Grid } from "@material-ui/core";
import { windowDimensionContext } from "../../App";
import { delay } from "../utils/delay";

function QuickSort() {
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
    [...(new Array(Math.floor(length / 8)) + 5)].map(() =>
      Math.round(Math.random() * max)
    );

  React.useEffect(() => {
    setArray(randomArray(arraySettings.length, arraySettings.maxx));
  }, [arraySettings]);

  const startQuickSort = async () => {
    setInProgress(true);
    let partition = async (start_i, end_i) => {
      let pivot = array[end_i];
      document.getElementById(start_i).style.background = "blue";
      document.getElementById(end_i).style.background = "green";

      let partition_i = start_i;

      for (let i = start_i; i <= end_i - 1; i++) {
        if (array[i] <= pivot) {
          array[partition_i] = [
            array[i],
            (array[i] = array[partition_i]),
          ][0];
          partition_i++;
          await delay(1);
          setArray([...array]);
        }
      }
      array[end_i] = [
        array[partition_i],
        (array[partition_i] = array[end_i]),
      ][0];
      await delay(1);
      setArray([...array]);
      document.getElementById(end_i).style.background = "red";
      return partition_i;
    };
    let quickSort = async (start, end) => {
      if (start >= end) {
        document.getElementById(start) &&
          (document.getElementById(start).style.background = "white");
        return;
      }
      let partition_i = await partition(start, end);
      document.getElementById(partition_i).style.background = "white";
      await delay(1);
      setArray([...array]);
      await quickSort(start, partition_i - 1);
      await quickSort(partition_i + 1, end);
    };
    await quickSort(0, array.length - 1);
    setArray([...array]);
    setInProgress(false);
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
                width: "4px",
                margin: "2px",
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
            onClick={startQuickSort}
            disabled={inProgress}
          >
            Sort
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default QuickSort;
