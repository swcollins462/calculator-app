import { useReducer } from "react";
import NumericDisplay from "./components/NumericDisplay/NumericDisplay";
import CalculatorButtons from "./components/CalculatorButtons/CalculatorButtons";
import "./App.css";

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  NEGATE: 'negate',
  PERCENT: 'percent',
  MEMORY_CLEAR: 'memory-clear',
  MEMORY_ADD: 'memory-add',
  MEMORY_SUBTRACT: 'memory-subtract',
  MEMORY_RECALL: 'memory-recall',
  EVALUATE: 'evaluate'
};

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