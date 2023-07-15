import { ACTIONS } from "../../App.js";

export default function DigitButton({ dispatch, digit }) {
    return (
        <button 
            className="button digit-button"
            onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
        >
            {digit}
        </button>
    )
};