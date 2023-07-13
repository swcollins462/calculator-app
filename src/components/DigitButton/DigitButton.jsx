import { ACTIONS } from "../../App.js";
import "./DigitButton.css";

export default function DigitButton({ dispatch, digit }) {
    return (
        <button 
            className="digit-button"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
        >
            {digit}
        </button>
    )
};