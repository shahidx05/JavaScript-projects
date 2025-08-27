const create = document.querySelector("#Create");
const nameInput = document.querySelector("#name");
const email = document.querySelector("#email");
const info = document.querySelector("#info");
const profile = document.querySelector("#profile");
const heading = document.querySelector(".h1");
const container = document.querySelector(".container")
let editCard = null;

function checkEmpty() {
    const cards = container.querySelectorAll(".card");
    document.querySelector(".h2").style.display = cards.length ? "none" : "block";
}

function reset() {
    nameInput.value = "";
    email.value = "";
    info.value = "";
    profile.value = "";
    heading.textContent = "Create Card";
}

function createCard(name, mail, details, imgurl) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${imgurl}" alt="Profile Picture">
        <h2>${name}</h2>
        <p class="mail">${mail}</p>
        <p class="info">${details}</p>
        <div class="card-buttons">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
    `;

    container.appendChild(card);
    checkEmpty()

    const deleteBtn = card.querySelector(".delete");
    const editbtn = card.querySelector(".edit");

    deleteBtn.addEventListener("click", function () {
        card.remove();
        checkEmpty();

        if (editCard === card) {
            reset();
            editCard = null;
            create.textContent = "Create";
            create.style.backgroundColor = "#007bff";
        }

    });

    editbtn.addEventListener("click", function () {
        nameInput.value = card.querySelector("h2").textContent;
        email.value = card.querySelector(".mail").textContent;
        info.value = card.querySelector(".info").textContent;
        profile.value = card.querySelector("img").src;

        editCard = card;
        create.textContent = "Update";
        create.style.backgroundColor = "green";
        heading.textContent = "Update Card";
    })

}

create.addEventListener("click", function () {
    if (!nameInput.value || !email.value || !info.value || !profile.value) {
        document.querySelector(".h3").style.display = "block";
        setTimeout(() => {
            document.querySelector(".h3").style.display = "none";
        }, 3000);
        return;
    }

    if (editCard) {
        editCard.querySelector("h2").textContent = nameInput.value;
        editCard.querySelector(".mail").textContent = email.value;
        editCard.querySelector(".info").textContent = info.value;
        editCard.querySelector("img").src = profile.value;

        reset();
        editCard = null;
        create.textContent = "Create";
        create.style.backgroundColor = "#007bff";
        heading.textContent = "Create Card";
    }
    else {
        createCard(
            nameInput.value,
            email.value,
            info.value,
            profile.value
        );
        reset();
    }
});



// document.querySelector(".container").addEventListener("click", function (e) {
//     if (e.target.classList.contains("delete")) {
//         e.target.closest(".card").remove();
//     }
// });