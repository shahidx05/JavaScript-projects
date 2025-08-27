const display = document.querySelector(".display");

function append(a){
    display.value += a;
}

function cleardisplay(){
    display.value = ""
}

function removelast(){
    display.value = display.value.slice(0, -1);
}

function calculate(){
    try {
         if (display.value.trim() === "") return;
        display.value = eval(display.value);
    } catch (error) {
        display.value = "error"
        setTimeout(() => display.value = "", 2000);
    }
}

