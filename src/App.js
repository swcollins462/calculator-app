import { useReducer } from "react";
import Decimal from "decimal.js-light";
import NumericDisplay from "./components/NumericDisplay/NumericDisplay";
import CalculatorButtons from "./components/CalculatorButtons/CalculatorButtons";
import "./App.css";

Decimal.config({ precision: 12, toExpPos: 12, toExpNeg: -12 });

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
        const operand = new Decimal(state.currentOperand);
        return {
          ...state,
          operation: payload.operation,
          previousOperand: operand.val(),
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
        const entry = new Decimal(state.currentOperand);
        return {
          ...state,
          currentOperand: entry.negated().val()
        };
      };
      return state;
    case ACTIONS.PERCENT:
      if (state.currentOperand === "." || state.currentOperand === "0.") return state;
      const entry = new Decimal(state.currentOperand);
      if (state.operation === "+" || state.operation === "−") {
        return {
        ...state,
        currentOperand: entry.dividedBy(100).times(state.previousOperand).val()
        };
      } else if (state.currentOperand !== "0") {
        return {
          ...state,
          currentOperand: entry.dividedBy(100).val()
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
  const prev = new Decimal(previousOperand);
  const current = new Decimal(currentOperand);
  let computation = ""
  try {
    switch(operation) {
      case "+":
        computation = prev.plus(current);
        break
      case "−":
        computation = prev.minus(current);
        break
      case "×":
        computation = prev.times(current);
        break
      case "÷":
        computation = current.d[0] === 0 ? "Error" : prev.dividedBy(current);
        break
      default:
        return;
    };
  } catch {
    computation = "Error"
  };
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