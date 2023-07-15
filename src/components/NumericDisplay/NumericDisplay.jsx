import "./NumericDisplay.css";

export default function NumericDisplay({ 
    previousOperand, 
    currentOperand, 
    operation, 
    memory, 
    formatOperand 
}) {
  return (
    <>
      <div className="output">
        <div className="memory-display">
          {memory != null ? "M " : ""}{formatOperand(memory)}
        </div>
        <div className="previous-operand">
          {formatOperand(previousOperand)} 
          {operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
    </>
  )
};