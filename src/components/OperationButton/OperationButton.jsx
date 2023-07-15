import { ACTIONS } from "../../App.js";
import "./OperationButton.css";

export default function OperationButton({ dispatch, operation }) {
    return (
        <button 
            className="op-button"
            onClick={() => dispatch({ 
                type: ACTIONS.CHOOSE_OPERATION, 
                payload: { operation } 
            })}
        >
            {operation}
        </button>
    )
};