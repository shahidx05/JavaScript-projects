const input = document.querySelector('.amount');
const display = document.querySelector('.msg');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const dropdown = document.querySelectorAll('.container select');
const btn = document.querySelector(".btn")
const arrow = document.querySelector('#arrow');


for (let key in countryList) {
    for (let drop of dropdown) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = key;
        drop.appendChild(option)
    }
}

from.value = "USD"
to.value = "INR"

dropdown.forEach(drop => {
    drop.addEventListener('change', () => {
        const img = drop.parentElement.querySelector('img');
        const code = countryList[drop.value];
        const imgurl = `https://flagsapi.com/${code}/flat/64.png`;
        img.src = imgurl;
        input.value = ""
        display.value = ""
        update(1)
    })
});

update(1)

btn.addEventListener('click', () => {
    const amount = input.value.trim();
    if (isNaN(amount) || amount <= 0) {
        const temp = display.textContent
        display.textContent = "⚠️ Please enter a valid amount";
        input.value = ""
        setTimeout(() => {
            display.textContent = temp;
        }, 3000);
        return;
    }
    if (amount === '') return;
    update(amount)
})

function update(amount) {
    display.innerHTML = `<i class="fa-solid fa-spinner"></i>`
    const api = `https://v6.exchangerate-api.com/v6/82d624a523831ec74b8c9256/latest/${from.value}`;

    fetch(api)
        .then((response) => {
            if (!response.ok) throw new Error("error");
            return response.json();
        })
        .then((data) => {
            const ratevalue = data.conversion_rates[to.value];
            const convert = ratevalue * amount;

            display.textContent = `${amount} ${from.value} = ${convert} ${to.value}`;

        })
        .catch((err) => {
            display.textContent = "❌ Failed to fetch rates. Try again later.";
        })
}

arrow.addEventListener('click', () => {
    arrow.classList.toggle('active');
    input.value = "";
    const temp = from.value;
    from.value = to.value;
    to.value = temp;

    dropdown.forEach(drop => {
        const img = drop.parentElement.querySelector('img');
        const code = countryList[drop.value];
        const imgurl = `https://flagsapi.com/${code}/flat/64.png`;
        img.src = imgurl;
    });
    update(1)
})

input.addEventListener("keypress", e => {
    if (e.key === "Enter") btn.click();
});