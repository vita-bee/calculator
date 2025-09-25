function add(x,y) {
  return x+y;
};

function subtract(x,y) {
	return x-y;
};

function multiply(x, y) {
  return x*y;
};

function divide(x, y) {
  return x/y;
};

function power(base, exponent) {
	return base ** exponent;
};

function operate(x, y, operator) {
  switch (operator){
    case '+': return add(x,y);
    case '-': return subtract(x,y);
    case '*': return multiply(x,y);
    case '/': return divide(x,y);
    case '^': return power(x,y);
  }
};

function calculateQuery(query){
    return operate(parseInt(query[0]), parseInt(query[2]), query[1]);
}


let xdigit = 0;
let ydigit = 0;
let operator = '';
let query =[];
let result = 0;
const operatorlist = ['+','-','*','/','^','+/-'];
const digitlist = ['0','1','2','3','4','5','6','7','8','9'];
const calcDisplay = document.querySelector('#calcDisplay');
const digitBtn = document.querySelector('.digitBtn') ;  
const operatorBtn = document.querySelector('.operatorBtn') ; 
const clearBtn = document.querySelector('.clearBtn') ; 
const enterBtn = document.querySelector('.enterBtn');
const toggleNegationBtn = document.querySelector('.toggleNegationBtn');
const calcBtns = document.querySelectorAll('.btn');


calcBtns.forEach((calcBtn) => {
        calcBtn.addEventListener("click", (e) => {
            if (e.target.textContent=== "AC"){
                calcDisplay.textContent = '';
                query.length = 0;
                return;
            }
            if (!query[0] && (!(digitlist.includes(e.target.textContent)))) { 
                return;
            } else if (!query[0] && ((digitlist.includes(e.target.textContent)))) {
                query[0] = e.target.textContent;
                calcDisplay.textContent = query[0];
            } else if (query[0] && !(query[1]) && ((digitlist.includes(e.target.textContent)))) {
                query[0] = `${query[0]}${e.target.textContent}`;
                calcDisplay.textContent = query[0];
            } else if (query[0] && !(query[1]) && ((operatorlist.includes(e.target.textContent)))) {
                query[1] = e.target.textContent;
                calcDisplay.textContent = query[0] + query[1]
            } else if (query[0] && (query[1]) && !(query[2]) && ((operatorlist.includes(e.target.textContent)))) {
                return;
            } else if (query[0] && (query[1]) && !(query[2]) && ((digitlist.includes(e.target.textContent)))) {
                query[2] = e.target.textContent;
                calcDisplay.textContent = query[0] + query[1] + query[2];
            } else if (query[0] && (query[1]) && (query[2]) && ((digitlist.includes(e.target.textContent)))) {
                query[2] = `${query[2]}${e.target.textContent}`;
                calcDisplay.textContent = query[0] + query[1] + query[2];
            } else if (query[0] && (query[1]) && (query[2]) && (e.target.textContent === '=')) {
                query[3] = e.target.textContent;
                calcDisplay.textContent = query[0] + query[1] + query[2] + query[3];
                result = calculateQuery(query);
                calcDisplay.textContent = result;
                query.length = 0; 
                query[0] = result;
            } else if (query[0] && (query[1]) && (query[2]) && (operatorlist.includes(e.target.textContent))) {
                query[3] = '=';
                calcDisplay.textContent = query[0] + query[1] + query[2] + query[3];
                result = calculateQuery(query);
                calcDisplay.textContent = result;
                query.length=2;
                query[0]=result;
                query[1]=e.target.textContent;
                
                
            }
        })
})
