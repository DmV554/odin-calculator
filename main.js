function operate(arr) {
    let i = 0;
    while (i < arr.length) {    
        if (arr[i] === '*' || arr[i] === '/') {
            const operator = arr[i];
            const left = parseFloat(arr[i - 1]);
            const right = parseFloat(arr[i + 1]);
            let result;

            if (operator === '*') {
                result = left * right;
            } else if (operator === '/') {
                if (right === 0) {
                    throw new Error("Error: Division by zero");
                }
                result = left / right;
            }

            arr.splice(i - 1, 3, result);
            i -= 1; 
        } else {
            i += 1;
        }
    }

    i = 0;
    while (i < arr.length) {
        if (arr[i] === '+' || arr[i] === '-') {
            const operator = arr[i];
            const left = parseFloat(arr[i - 1]);
            const right = parseFloat(arr[i + 1]);
            let result;

            if (operator === '+') {
                result = left + right;
            } else if (operator === '-') {
                result = left - right;
            }

            arr.splice(i - 1, 3, result);
            i -= 1; 
        } else {
            i += 1;
        }
    }

    return arr[0]; 
}



let arr = []
const resultadoOp = document.querySelector(".contenido-display")

function generateNumbers() {
    const calcCont = document.querySelector(".content-numbers")
    let cont = 1

    for(i=0; i<3; i++) {
        const numberRow = document.createElement("div")
        numberRow.classList.add("row-num")
        for(j = 0; j<3; j++) {
            const number = document.createElement("div")
            number.classList.add("numero")
            number.textContent = cont

            number.addEventListener("click", (e) => {
                addToArr(e.target.textContent)
            })
    
            numberRow.appendChild(number)
            cont++
        }
        calcCont.appendChild(numberRow)
    }


    const numberRowCero = document.createElement("div")
    numberRowCero.classList.add("row-num")

    const numberCero = document.createElement("div")
    numberCero.classList.add("numero")
    numberCero.textContent = 0

    numberCero.addEventListener("click", (e) => {
        addToArr(e.target.textContent)
    })
    
    numberRowCero.appendChild(numberCero)


    const cleanElement = document.createElement("div")
    cleanElement.classList.add("numero")
    cleanElement.textContent = "C"

    cleanElement.addEventListener("click", (e) => {
        cleanDisplay()
    })

    numberRowCero.appendChild(cleanElement)

    const dotElement = document.createElement("div")
    dotElement.classList.add("numero")
    dotElement.textContent = "."

    dotElement.addEventListener("click", (e) => {
        addToArr(e.target.textContent)
    })

    numberRowCero.appendChild(dotElement)

    calcCont.appendChild(numberRowCero)



}


function cleanDisplay() {
    arr = []
    resultadoOp.replaceChildren()
}




function generateSimbols() {
    const operatorsCont = document.querySelector(".content-operators")

    const arrOps = ["*", "/", "+", "-"]

    for(i=0; i<4; i++) {
        const oper = document.createElement("div")
        oper.classList.add("numero")

        oper.textContent = arrOps[i]

        oper.addEventListener("click", (e) => {
            addToArr(e.target.textContent)
        })

        operatorsCont.appendChild(oper)
    }

     const result = document.createElement("div")
     result.textContent = "="
     result.classList.add("numero")

     result.addEventListener("click", () => {

        if(arr.length >= 3 && !simboloEsOperador(arr[arr.length - 1 ])) {
            const operationResult = operate(arr)
            arr[0] = operationResult;

            if(resultadoOp.hasChildNodes()) {
                resultadoOp.replaceChildren()
            }
            
            const resultCell = document.createElement("div")
            resultCell.textContent = operationResult
            resultCell.classList.add("element-display")
            resultadoOp.appendChild(resultCell)
    }
     })
     operatorsCont.appendChild(result)
}



function addToArr(simbolo) {

    let agregar = true
    let esFloat = false
    const simboloOriginal = simbolo
    if(arr.length != 0) {
        const elemenActual = arr[arr.length - 1]
        

        if(!simboloEsOperador(simbolo) && !simboloEsOperador(elemenActual)) {
            simbolo = elemenActual.toString() + simbolo.toString();
            agregar = false
           // console.log(simbolo)
            

        } else if(simboloEsOperador(simbolo) && simboloEsOperador(elemenActual)) {
            return
        } else if(!simboloEsOperador(simbolo) && elemenActual === ".") {
            const primerNumFloat = arr[arr.length - 2]
            simbolo = parseFloat(String(primerNumFloat) + elemenActual + String(simbolo))
            console.log(simbolo)
            agregar = false
            esFloat = true
        }

    } else {
        if(simboloEsOperador(simbolo)) {
            return
        }
    }
     
    const elementoDisplay = document.createElement("div")
    elementoDisplay.textContent = simboloOriginal
    elementoDisplay.classList.add("element-display")

    resultadoOp.appendChild(elementoDisplay)

    if(agregar) {
        arr.push(simbolo)
    } else {

        if(esFloat) {
            arr.splice(arr.length - 2, 3, simbolo);
        } else {
            arr[arr.length - 1] = simbolo

        }
    }

    console.log(arr)
    
}

function simboloEsOperador(element) {

    if(element != "+" && element != "-" && element != "/" && element != "*" && element != ".") {
        return false
    }

    return true
}



function main() {

    generateNumbers()
    generateSimbols()





}


main()