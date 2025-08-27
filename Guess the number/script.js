const guess = parseInt(Math.random() * 100 + 1);
const check = document.querySelector("#checkBtn")
const restart = document.querySelector("#restartBtn")
const input = document.querySelector("#guessInput")
const message = document.querySelector("#message")
const attempts = document.querySelector("#attempts")
let attempt = 0;

check.addEventListener("click", function () {
    if (input.value.trim() === '') {
        message.textContent = "⚠️ Input cannot be empty!";
        message.style.color = "#fd5f2fff";
        return;
    }
    const num = parseInt(input.value, 10);
    if (isNaN(num) || num < 1 || num > 100 || input.value.trim() === '') {
        message.textContent = "⚠️ Enter a valid number between 1 and 100!";
        message.style.color = "#e53935";
        return;
    }

    let display;
    let diff = Math.abs(num - guess)

    if (num === guess) {
        display = "🎉 You Win!";
        check.disabled = true;
        input.disabled = true;
        message.style.color = "#4caf50"; 
    } else if (num < guess) {
        if (diff <= 5) {
            display = "Too low, but very close!";
            message.style.color = "#ffc107"; 
        } else if (diff <= 10) {
            display = "Too low, but close.";
            message.style.color = "#ff9800"; 
        } else if (diff <= 20) {
            display = "Too low and far off.";
            message.style.color = "#ff7043"; 
        } else {
            display = "Too low and very far.";
            message.style.color = "#d32f2f"; 
        }
    } else {
        if (diff <= 5) {
            display = "Too high, but very close!";
            message.style.color = "#60d8ebff"; 
        } else if (diff <= 10) {
            display = "Too high, but close.";
            message.style.color = "#0077ffff"; 
        } else if (diff <= 20) {
            display = "Too high and far off.";
            message.style.color = "#214affff"
        } else {
            display = "Too high and very far.";
            message.style.color = "#3e44f7ff"
        }
    }

    if (attempt >= 9 && num !== guess) {
        display = "💥 Game Over! The number was " + guess;
        check.disabled = true;
        input.disabled = true;
        message.style.color = "#ff0000ff";
    }
    attempt++;
    attempts.textContent = attempt
    message.textContent = `You guessed ${num}. ${display}`
    input.value = ""

})

restart.addEventListener("click", function () {
    attempt = 0;
    attempts.textContent = attempt
    message.textContent = ""
    guess = parseInt(Math.random() * 100 + 1);
    input.value = ""
    check.disabled = false;
    input.disabled = false;
})

input.addEventListener("keyup", function(e) {
  if (e.key === "Enter") check.click();
});