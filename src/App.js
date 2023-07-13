import { useReducer } from "react";
import './App.css';

const initialState = {
  currentOperand: "0",
  previousOperand: null,
  operation: null,
  memory: null,
  overwrite: true
};

function App() {
  const [{ currentOperand, previousOperand, operation, memory }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="calculator-grid">
      <NumericDisplay 
        previousOperand={previousOperand}
        currentOperand={currentOperand}
        operation={operation}
        memory={memory}
        formatOperand={formatOperand}
      />
      <CalculatorButtons dispatch={dispatch} currentOperand={currentOperand} />
    </div>
  )
};

export default App;