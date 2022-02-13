class Calculator {
	constructor(currentText, previousText) {
		this.currentText = currentText;
		this.previousText = previousText;
		this.clear();
	}
	clear() {
		this.currentNumber = "0";
		this.previousNumber = "";
		this.operation = undefined;
	}
	deleteLast() {
		let last = this.currentNumber.toString().slice(-1);
		if (last != 0) {
			this.currentNumber = this.currentNumber.toString().slice(0, -1);
		}
	}
	giveOperation(operation) {
		if(this.currentNumber == "0"){
			this.operation = operation
			return
		}
		if (this.previousNumber && this.currentNumber) {
			this.compute();
		}
		this.operation = operation;
		this.previousNumber = this.currentNumber;
		this.currentNumber = "0";
	}
	compute() {
		let current = Number(this.currentNumber);
		let previous = Number(this.previousNumber);
		let operations = this.operation;
		let computition;
		switch (operations) {
			case "÷":
				computition = previous / current;
				break;
			case "+":
				computition = previous + current;
				break;
			case "-":
				computition = previous - current;
				break;
			case "x":
				computition = previous * current;
				break;
			default:
				computition = "";
				break;
		}
		this.currentNumber = computition.toString();
		this.previousNumber = "";
		this.operation = undefined;
	}
	appendNumber(number) {
		if (number == "." && this.currentNumber.includes(".")) return;
		this.currentNumber = this.currentNumber.toString() + number.toString();
	}
	getFormetedNumber(number) {
		let firstNumber = parseFloat(number.toString().split(".")[0]);
		let secondNumber = number.toString().split(".")[1];
		let finalOfFirstNumber;
		if (isNaN(firstNumber)) {
			finalOfFirstNumber = "";
		} else {
			finalOfFirstNumber = firstNumber.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (secondNumber != undefined) {
			return `${finalOfFirstNumber}.${secondNumber}`;
		} else {
			return finalOfFirstNumber;
		}
	}
	updateDisplay() {
		this.currentText.innerHTML = this.getFormetedNumber(this.currentNumber);
		if (this.operation) {
			this.previousText.innerHTML =
				this.getFormetedNumber(this.previousNumber) + " " + this.operation;
		} else {
			this.previousText.innerHTML = "";
		}
	}
}

const currentText = document.querySelector("[data-current]"),
	previousText = document.querySelector("[data-previous]"),
	numbers = document.querySelectorAll("[data-number]"),
	operations = document.querySelectorAll("[data-operation]"),
	allClear = document.querySelector("[data-all-clear]"),
	deleteBtn = document.querySelector("[data-delete]"),
	equal = document.querySelector("[data-equal]");

let calculator = new Calculator(currentText, previousText);

numbers.forEach((button) => {
	button.addEventListener("click", (e) => {
		calculator.appendNumber(e.target.innerHTML);
		calculator.updateDisplay();
	});
});
operations.forEach((button) => {
	button.addEventListener("click", (e) => {
		calculator.giveOperation(e.target.innerHTML);
		calculator.updateDisplay();
	});
});

equal.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});
allClear.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
	calculator.deleteLast();
	calculator.updateDisplay();
});
