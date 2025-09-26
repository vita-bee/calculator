function roundToTotalDigits(number, totalDigits) {
  const numString = String(number);
  const decimalIndex = numString.indexOf('.');
  let integerDigits;
  if (decimalIndex === -1) integerDigits = numString.length;
  else integerDigits = decimalIndex;
  const decimalPlaces = totalDigits - integerDigits;
  // round to 0 decimal places if the integer part is too large.
  if (decimalPlaces < 0) return parseFloat(number.toFixed(0));
  // Round and convert back to a number
  return parseFloat(number.toFixed(decimalPlaces));
}

function operate(x, y, operator) {
  switch (operator){
    case '+': return x+y;
    case '-': return x-y;
    case '*': return x*y;
    case '/': return x/y;
    case '^': return x ** y;
  }
};

function calculateQuery(term1, term2, operator){
    let value = operate(+term1, +term2, operator);
    return roundToTotalDigits(value, maxdigits);
}

function append(x, y){ 
    //append but remove any starting zero if 2nd digit is not a decimal
    if ((x.charAt(0) === '0') && !(x.charAt(1) === '.')) x = x.substring(1);
    return `${x}${y}`; 
}

let query = {
      term1: '',
      term2: '',
      operator: '',
      result: function() {return this.complete ? calculateQuery(this.term1, this.term2, this.operator) : null; },
      complete:function() {return (this.term1 && this.term2 && this.operator) ? true : false; },
      string: function() {return `${this.term1} ${this.operator} ${this.term2}`; },
      divbyZero: function() { if (this.term2 == 0 && this.operator === '/') return true;
                                else return false;},
      clear: function() {this.term1=''; this.term2=''; this.operator=''; },
    };

let displayResult = false;
const maxdigits = 12;
const calcDisplay = document.querySelector('#calcDisplay');
const formulaDisplay = document.querySelector('#formulaDisplay');
const calcBtns = document.querySelectorAll('.btn');
let executed = false;
let currentTerm = '';

calcBtns.forEach((calcBtn) => {
        calcBtn.addEventListener("click", (e) => {
        const calcBtnClassList = e.target.classList;
        
            if (calcBtnClassList.contains('clearBtn')) {
                formulaDisplay.textContent = '';
                calcDisplay.textContent = '';
                query.clear();
                displayResult = false;
                return;
            }

            if (calcBtnClassList.contains('digitBtn')) {
                
                    if (displayResult && !(query.operator) ) {
                        query.clear();
                        if (!(e.target.textContent === '0')) {
                            if (e.target.textContent === '.') query.term1 = '0' + e.target.textContent;
                            else query.term1 = e.target.textContent;
                        }
                        formulaDisplay.textContent = '0';
                        currentTerm = 'term1';
                        calcDisplay.style.color = "slategray";
                        calcDisplay.textContent = query[currentTerm];
                        displayResult = false;
                        return;
                    }
                    if (!query.term1) {
                        if (e.target.textContent === '.') { query.term1 = '0' + e.target.textContent;
                        } else {
                            query.term1 = e.target.textContent;
                            currentTerm = 'term1';
                        }
                    } else if ((query.term1) && (query.term1.length <= maxdigits) && (!query.operator)) {
                        if ((e.target.textContent === '.') && (query.term1.includes('.')) ) return;
                        query.term1 = append(query.term1, e.target.textContent);
                        currentTerm = 'term1';
                    } else if ((query.operator) && (!query.term2)) {
                         if (e.target.textContent === '.') query.term2 = '0' + e.target.textContent;
                         else query.term2 = e.target.textContent;
                         currentTerm = 'term2';
                    } else if ((query.operator) && (query.term2) && (query.term2.length <= maxdigits)) {
                        if ((e.target.textContent === '.') && (query.term2.includes('.')) ) return;
                        query.term2 = append(query.term2, e.target.textContent);
                        currentTerm = 'term2';
                    }
                    formulaDisplay.textContent = `${query.term1} ${query.operator}`;
                    calcDisplay.style.color = "slategray";
                    calcDisplay.textContent = query[currentTerm];
                    displayResult = false;
                    return;
            }
            
        
            if (calcBtnClassList.contains('operatorBtn')) {
                if (!displayResult && query.complete()) {
                    if (query.divbyZero()) {
                        query.clear();
                        formulaDisplay.textContent = '';
                        calcDisplay.textContent = '';
                        alert("Mang, my frieng, you can't diving by zero.");
                        return;
                    }
                    calcDisplay.textContent = query.result();
                    calcDisplay.style.color = "blue";
                    query.term1 = query.result();
                    displayResult = true; 
                    query.operator = e.target.textContent;
                    query.term2 = '';
                    formulaDisplay.textContent = query.string(); 
                    currentTerm = 'operator';             
                    return;
                }
                if ((query.term1) && !(query.operator)) {
                    query.operator = e.target.textContent;
                    formulaDisplay.textContent = query.string();
                    calcDisplay.style.color = "slategray";
                    displayResult = false;
                    currentTerm = 'operator';  
                    return;
                }
            }

            if (calcBtnClassList.contains('equalBtn')) {
                if (query.complete()) {
                    if (query.divbyZero()) {
                        query.clear();
                        calcDisplay.textContent = '';
                        formulaDisplay.textContent = '';
                        alert("Mang, my frieng, you can't diving by zero.");
                        return;
                    }
                    formulaDisplay.textContent = query.string() + ' =';
                    calcDisplay.textContent = query.result();
                    query.clear();
                    query.term1 = calcDisplay.textContent;
                    calcDisplay.style.color = "blue";
                    displayResult = true;
                    return;
                }
            }

            if (calcBtnClassList.contains('delBtn')) {
                if (!displayResult){
                    query[currentTerm] = query[currentTerm].slice(0,-1);
                    calcDisplay.textContent = query[currentTerm];
                }
            }
            

            
        })
})
