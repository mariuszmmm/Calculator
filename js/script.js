const keyOnElement = document.querySelector(".js-keyOn");
const keyOffElement = document.querySelector(".js-keyOff");
const keyUndoElement = document.querySelector(".js-keyUndo")
const keyPlusToMinusElement = document.querySelector(".js-keyPlusToMinus");
const keySquareElement = document.querySelector(".js-keySquare");
const keyProcentElement = document.querySelector(".js-keyProcent");
const keyDivisionElement = document.querySelector(".js-keyDivision");
const keyXElement = document.querySelector(".js-keyx");
const keyMinusElement = document.querySelector(".js-keyMinus");
const keyPlusElement = document.querySelector(".js-keyPlus");
const keyEqualElement = document.querySelector(".js-keyEqual");
const keyCommaElement = document.querySelector(".js-keyComma");
const key0Element = document.querySelector(".js-key0");
const key1Element = document.querySelector(".js-key1");
const key2Element = document.querySelector(".js-key2");
const key3Element = document.querySelector(".js-key3");
const key4Element = document.querySelector(".js-key4");
const key5Element = document.querySelector(".js-key5");
const key6Element = document.querySelector(".js-key6");
const key7Element = document.querySelector(".js-key7");
const key8Element = document.querySelector(".js-key8");
const key9Element = document.querySelector(".js-key9");

const displayElement = document.querySelector(".js-inputDisplay");
let display;
let result;
let a;
let b;
let action;

const consoleInfo = () => {
   console.log("kliknięto - nie przypisany klawisz")
   console.log("display", display);
};

const consoleAction = () => {
   console.log("display :", display);
   console.log("a :", a);
   console.log("action :", action);
   console.log("b :", b);
   console.log("result :", result);
   console.log("--------");
};

const addEvent = () => {
   keyUndoElement.addEventListener("click", numberUndo);
   keyPlusToMinusElement.addEventListener("click", consoleInfo);
   keySquareElement.addEventListener("click", consoleInfo);
   keyProcentElement.addEventListener("click", consoleInfo);
   keyDivisionElement.addEventListener("click", consoleInfo);
   keyXElement.addEventListener("click", consoleInfo);
   keyMinusElement.addEventListener("click", minus);
   keyPlusElement.addEventListener("click", plus);
   keyEqualElement.addEventListener("click", equal);
   keyCommaElement.addEventListener("click", consoleInfo);
   key0Element.addEventListener("click", digitEnter);
   key1Element.addEventListener("click", digitEnter);
   key2Element.addEventListener("click", digitEnter);
   key3Element.addEventListener("click", digitEnter);
   key4Element.addEventListener("click", digitEnter);
   key5Element.addEventListener("click", digitEnter);
   key6Element.addEventListener("click", digitEnter);
   key7Element.addEventListener("click", digitEnter);
   key8Element.addEventListener("click", digitEnter);
   key9Element.addEventListener("click", digitEnter);
};

const removeEvent = () => {
   keyUndoElement.removeEventListener("click", numberUndo);
   keyPlusToMinusElement.removeEventListener("click", consoleInfo);
   keySquareElement.removeEventListener("click", consoleInfo);
   keyProcentElement.removeEventListener("click", consoleInfo);
   keyDivisionElement.removeEventListener("click", consoleInfo);
   keyXElement.removeEventListener("click", consoleInfo);
   keyMinusElement.removeEventListener("click", minus);
   keyPlusElement.removeEventListener("click", plus);
   keyEqualElement.removeEventListener("click", equal);
   keyCommaElement.removeEventListener("click", consoleInfo);
   key0Element.removeEventListener("click", digitEnter);
   key1Element.removeEventListener("click", digitEnter);
   key2Element.removeEventListener("click", digitEnter);
   key3Element.removeEventListener("click", digitEnter);
   key4Element.removeEventListener("click", digitEnter);
   key5Element.removeEventListener("click", digitEnter);
   key6Element.removeEventListener("click", digitEnter);
   key7Element.removeEventListener("click", digitEnter);
   key8Element.removeEventListener("click", digitEnter);
   key9Element.removeEventListener("click", digitEnter);
};

const displayOn = () => {
   display = "0";
   a = "";
   b = "";
   result = "";
   action = "";
   displayElement.value = display;
   keyOffElement.addEventListener("click", displayOff);
   addEvent();
   consoleAction();
}

keyOnElement.addEventListener("click", displayOn);

const displayOff = () => {
   display = "";
   displayElement.value = display;
   removeEvent();
}

const digitEnter = (event) => {
   if ((action && !b) || result) {
      display = "";
      result = "";
   }



   if (display === "0") { display = "" };
   if ((Number(display)) > 99999999) return;

   switch (event.target.innerText) {
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
      default: display = "0"
   }
   displayElement.value = display;
   if (!b && !action) { a = display }
   else { b = display }
   consoleAction();
}

const numberUndo = (event) => {
   display -= display.charAt(display.length - 1);
   display = (display / 10) + "";
   displayElement.value = display;
}

const plus = () => {
   if (result && b) {
      a = result;
      b = "";
      action = "";
      result = "";
   }
   if (a && action && b && !result) {
      displayElement.value = Number(a) + Number(b) + "";
      display = displayElement.value;
      a = displayElement.value;
      b = "";
   };
   a ? (action = "plus") : (action = "");
   consoleAction();
}

const minus = () => {
   if (result && b) {
      a = result;
      b = "";
      action = "";
      result = "";
   }
   if (a && action && b && !result) {
      displayElement.value = Number(a) - Number(b) + "";
      display = displayElement.value;
      a = displayElement.value;
      b = "";
   };

   a ? (action = "minus") : (action = "");
   consoleAction();

}

const equal = () => {
   consoleAction();

   if (!a && !b && result) {
      action = "";
   }
   if (b) {
      switch (action) {
         case ("plus"):
            if ((a || result) && action && b) {
               (displayElement.value =
                  (!result ? Number(a) : Number(result))
                  +
                  Number(b) + "");
            }
            a = "";
            result = displayElement.value;
            display = displayElement.value;
            break;

         case ("minus"):
            if ((a || result) && action && b) {
               (displayElement.value =
                  (!result ? Number(a) : Number(result))
                  -
                  Number(b) + "");
            }
            a = "";
            result = displayElement.value;
            display = displayElement.value;
            break;

         default: return
      }
   }
   consoleAction();
}


