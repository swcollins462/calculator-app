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

function reducer(state, { type, payload }) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentOperand === "0" && payload.digit === "0") return state;
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      } else if (
        payload.digit === "." && 
        state.currentOperand.includes(".")) return state;
      if (state.currentOperand.length < 15) {
        return {
        ...state,
        currentOperand: `${state.currentOperand}${payload.digit}`
        };
      };
      return state;
    case ACTIONS.CHOOSE_OPERATION: 
      if (state.currentOperand === "." || state.currentOperand === "0.") return state;
      if (state.currentOperand === "0" && state.previousOperand == null) return state;

      if (state.currentOperand === "0") {
        return {
          ...state,
          operation: payload.operation,
        };
      } else if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: "0",
        };
      };
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: "0"
      };
    case ACTIONS.CLEAR:
      if (state.currentOperand !== "0") {
        return {
          ...state,
          currentOperand: "0"
        };
      };
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: "0"
      };
    case ACTIONS.NEGATE:
      if (state.currentOperand === "." || state.currentOperand === "0.") return state;
      if (state.currentOperand !== "0") {
        return {
          ...state,
          currentOperand: state.currentOperand
        };
      };
      return state;
    case ACTIONS.PERCENT:
      if (state.currentOperand === "." || state.currentOperand === "0.") return state;
      if (state.operation === "+" || state.operation === "−") {
        return {

        };
      } else if (state.currentOperand !== "0") {
        return {
          
        };
      };
      return state;
    case ACTIONS.EVALUATE: 
      if (
        state.operation == null ||
        state.previousOperand == null
      ) {
        return state;
      };
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      };
    default:
      return state;
  }
};

function evaluate({ currentOperand, previousOperand, operation}) {
  let computation = ""

  return computation.toString()
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