{
   let display;
   let componentA;
   let action;
   let componentB;
   let result;

   const addEvents = () => {
      const keyElements = document.querySelectorAll(".js-key");

      keyElements.forEach((keyElement) => {
         keyElement.addEventListener("click", calculatorEvent)
      });
   };

   const removeEvents = () => {
      const keyElements = document.querySelectorAll(".js-key");

      keyElements.forEach((keyElement) => {
         keyElement.removeEventListener("click", calculatorEvent)
      });
   };

   const calculatorEvent = (event) => {
      const key = event.target;
      const keyValue = key.innerText;
      (isNaN(parseInt(keyValue)) && (keyValue !== ",")) ? enterAction(keyValue) : enterDigit(keyValue);
   };

   const enterDigit = (keyValue) => {
      if (display === "0") display = "";
      if (result) calculatorReset();
      if (display.length >= 9) return;

      switch (keyValue) {
         case "1": display += "1";
            break;
         case "2": display += "2";
            break;
         case "3": display += "3";
            break;
         case "4": display += "4";
            break;
         case "5": display += "5";
            break;
         case "6": display += "6";
            break;
         case "7": display += "7";
            break;
         case "8": display += "8";
            break;
         case "9": display += "9";
            break;
         case "0": display += "0";
            break;
         case ",": display ? (display += ".") : (display += "0.");
            break;
         default: return
      };

      if (display.indexOf(".") !== display.lastIndexOf(".")) {
         display = display.slice(0, -1);
      };

      if (display.charAt(display.length - 1) !== ".") {
         selectComponent();
      };
      viewResult();
      consoleDisplay();
   };

   const selectComponent = () => {
      if (!action) { componentA = +display }
      else { componentB = +display };
   };

   const enterAction = (keyValue) => {
      switch (keyValue) {
         case "⇽": backspace(keyValue);
            break;
         case "+/-": changeSign(keyValue);
            break;
         case "√": squareRoot(keyValue);
            break;
         case "%": percent(keyValue);
            break;
         case "/": basicOperations(keyValue);
            break;
         case "x": basicOperations(keyValue);
            break;
         case "-": basicOperations(keyValue);
            break;
         case "+": basicOperations(keyValue);
            break;
         case "=": equals(keyValue);
            break;
         default: return
      };
   };

   const calculate = (a, operator, b) => {
      switch (operator) {
         case "+":
            return a + b;
         case "-":
            return a - b;
         case "x":
            return a * b;
         case "/":
            return a / b;
         default: return
      };
   };

   const calculateResult = () => {
      result = calculate(componentA, action, componentB);
      display = result + "";

      let displayLength = (`${Math.round(Number(display))}`.length);

      if (displayLength <= 9) {
         display = Number(display).toFixed(9 - displayLength)
      } else {
         display = Number(display).toPrecision(4) + ""
      };

      if (Math.abs(Number(display)) < 0.00000001) {
         display = "0"
         result = 0;
      };

      while (
         (display.includes(".") && !display.includes("e")
            &&
            (display.charAt(display.length - 1) === "0"))
         ||
         (display.charAt(display.length - 1) === ".")
      ) { display = display.slice(0, -1) };

   };

   const viewResult = () => {
      const displayElement = document.querySelector(".js-inputDisplay");

      if ((display === "NaN") || (display === "Infinity")) {
         display = "ERROR";
         removeEvents();
      }

      displayElement.value = display ? display.replace(".", ",") : "0";
   };

   const calculatorReset = () => {
      display = "";
      componentA = "";
      action = "";
      componentB = "";
      result = "";
   };

   const calculatorOn = (event) => {
      calculatorReset();
      addEvents(event.keyElements);
      viewResult();
      consoleDisplay();
   };

   const calculatorOff = () => {
      const displayElement = document.querySelector(".js-inputDisplay");
      calculatorReset();
      displayElement.value = display;
      removeEvents();
      consoleDisplay();
   };

   const backspace = () => {
      if (result === "") {
         display = display.slice(0, -1);
         if (display === "") display = "0";
         if (display.charAt(display.length - 1) === ".") {
            display = display.slice(0, -1);
         }
         selectComponent();
      };
      viewResult();
      consoleDisplay();
   };

   const changeSign = () => {
      if (result === "") {
         display = -display + "";
         if (((componentA) && !action) || (componentB)) {
            selectComponent();
            viewResult();
         };
      };
      consoleDisplay();
   };

   const squareRoot = () => {
      display = Math.sqrt(Number(display)) + "";
      if (result !== "") {
         componentA = Number(display);
         componentB = "";
         result = "";
      } else {
         selectComponent();
      }
      viewResult();
      display = "";
      consoleDisplay();
   }

   const percent = () => {
      if ((componentB !== "") && (!result)) {
         if (action === "+" || action === "-") {
            componentB = componentA * componentB / 100;
         };
         if (action === "x" || action === "/") {
            componentB = componentB / 100;
         };
         calculateResult();
         viewResult();
         consoleDisplay();
      };
   };

   const basicOperations = (keyValue) => {
      if (componentA !== "") {
         if ((componentB !== "") && !result) calculateResult();
         action = keyValue;
         if (result !== "") {
            viewResult();
            componentA = result;
            componentB = "";
            result = "";
         }
         display = "";
         consoleDisplay();
      };
   };

   const equals = () => {
      if (action && (componentB !== "")) {
         calculateResult();
         componentA = result;
         viewResult();
         consoleDisplay();
      };
   };

   const consoleDisplay = () => {
      console.log("display    :", display);
      console.log("componentA :", componentA);
      console.log("action     :", action);
      console.log("componentB :", componentB);
      console.log("result     :", result);
      console.log("--------");
   };

   const init = () => {
      const onElement = document.querySelector(".js-on");
      const offElement = document.querySelector(".js-off");
      onElement.addEventListener("click", calculatorOn);
      offElement.addEventListener("click", calculatorOff);
   };

   init();
}