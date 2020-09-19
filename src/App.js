import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BubbleSort from "./components/sorts/BubbleSort";
import InsertionSort from "./components/sorts/InsertionSort";
import QuickSort from "./components/sorts/QuickSort";
import SelectionSort from "./components/sorts/SelectionSort";
import HomePage from "./HomePage";

export const windowDimensionContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return action.data;
    default:
      return state;
  }
};
function App() {
  // const [windowDimension, setWindowDimension] = useState);

  const [windowDimension, dispatch] = useReducer(reducer, {
    width: 0,
    height: 0,
  });

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  let updateWindowDimensions = () => {
    dispatch({
      type: "update",
      data: { width: window.innerWidth, height: window.innerHeight },
    });
  };

  return (
    <windowDimensionContext.Provider
      value={{ windowDimension, updateWindowDimensions }}
    >
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/bubblesort" component={BubbleSort} exact />
          <Route path="/quicksort" component={QuickSort} />
          <Route path="/insertionsort" component={InsertionSort} />
          <Route path="/quicksort" component={QuickSort} />
          <Route path="/selectionsort" component={SelectionSort} />
        </Switch>
      </Router>
    </windowDimensionContext.Provider>
  );
}

export default App;
