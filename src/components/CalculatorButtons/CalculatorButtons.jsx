import { ACTIONS } from "../../App.js";
import DigitButton from "../DigitButton/DigitButton.jsx";
import OperationButton from "../OperationButton/OperationButton.jsx";
import "./CalculatorButtons.css";

export default function CalculatorButtons({ dispatch, currentOperand }) {
    return (
        <>
            <button className="memory-button" onClick={() => dispatch({ 
                type: ACTIONS.MEMORY_CLEAR 
            })}>
                MC
            </button>
            <button className="memory-button" onClick={() => dispatch({ 
                type: ACTIONS.MEMORY_ADD 
            })}>
                M+
            </button>
            <button className="memory-button" onClick={() => dispatch({ 
                type: ACTIONS.MEMORY_SUBTRACT 
            })}>
                M−
            </button>
            <button className="memory-button" onClick={() => dispatch({ 
                type: ACTIONS.MEMORY_RECALL 
            })}>
                MR
            </button>
            <button className="button" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>
                {currentOperand === "0" ? "AC" : "C"}
            </button>
            <button className="op-button" onClick={() => dispatch({ type: ACTIONS.NEGATE })}>
                ±
            </button>
            <button className="button" onClick={() => dispatch({ type: ACTIONS.PERCENT })}>
                %
            </button>
            <OperationButton operation="÷" dispatch={dispatch} />
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton operation="×" dispatch={dispatch} />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton operation="+" dispatch={dispatch} />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton operation="−" dispatch={dispatch} />
            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            <button 
                className="eval-button" 
                onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            >
                =
            </button>
        </>
    )
  };