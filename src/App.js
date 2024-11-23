import {useState} from 'react';
import './App.scss';

function App() {

  const[answer,setAnswer] = useState("0");
  const[expression,setExpression] = useState("");
  const trimmed = expression.trim();

  const isOperator = (event) =>{
    return /[*/+-]/.test(event);
  };

  const pressButton = (event)=>{
    if(event === "clear"){
      setAnswer("");
      setExpression("0");
    }else if(isOperator(event)){
      setExpression(trimmed + " " + event + " ");
    }else if(event === "="){
      calculate();
    }else if(event === "."){
      const lastNumber = expression.split(/[-+*/]/g).pop();
      if(lastNumber?.includes(".")) return;
      setExpression(expression + event);
    }else{
      if(expression.charAt(0)==="0"){
        setExpression(expression.slice(1) + event);
      }else{
        setExpression(expression + event);
      }
    }
  };

  const calculate = () =>{
    
    if(isOperator(trimmed.charAt(trimmed.length - 1))) return;

    const parts = trimmed.split(" ");
    const newParts = [];

    for(let i = parts.length - 1; i >= 0; i-- ){
      if(["*","/","+"].includes(parts[i]) && isOperator(parts[i-1])){
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i-1;
        while(isOperator(parts[k])){
          k--;
          j++;
        }
        i-=j;
      }else{
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if(isOperator(newExpression.charAt(0))){
      setAnswer(eval(answer + newExpression));
    }else{
      setAnswer(eval(newExpression));
    }
    setExpression("");
  }

  return (
    <div className="App">
      <h1>Calculator</h1>
      <div id="calculator">
        <div id="display" style={{textAlign: "right"}}>
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
          
        </div>
        <button id="clear" className="clearBtn" onClick={()=>pressButton("clear")}>C</button>
        <button id="divide" className="operations" onClick={()=>pressButton("/")}>/</button>
        <button id="multiply" className="operations" onClick={()=>pressButton("*")}>X</button>
        <button id="seven" className="numbers" onClick={()=>pressButton("7")}>7</button>
        <button id="eight" className="numbers" onClick={()=>pressButton("8")}>8</button>
        <button id="nine" className="numbers" onClick={()=>pressButton("9")}>9</button>
        <button id="subtract" className="operations" onClick={()=>pressButton("-")}>-</button>
        <button id="four" className="numbers" onClick={()=>pressButton("4")}>4</button>
        <button id="five" className="numbers" onClick={()=>pressButton("5")}>5</button>
        <button id="six" className="numbers" onClick={()=>pressButton("6")}>6</button>
        <button id="add" className="operations" onClick={()=>pressButton("+")}>+</button>
        <button id="one" className="numbers" onClick={()=>pressButton("1")}>1</button>
        <button id="two" className="numbers" onClick={()=>pressButton("2")}>2</button>
        <button id="three" className="numbers" onClick={()=>pressButton("3")}>3</button>
        <button id="zero" className="numbers" onClick={()=>pressButton("0")}>0</button>
        <button id="decimal" className="numbers" onClick={()=>pressButton(".")}>.</button>
        <button id="equals" className="operations" onClick={()=>pressButton("=")}>=</button>
      </div>
    </div>
  );
}

export default App;
