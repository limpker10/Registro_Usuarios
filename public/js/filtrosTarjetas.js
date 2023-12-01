// Event listeners para filtrar las tarjetas de usuario
const userCards = document.querySelectorAll('[data-user-card]');
const usersData = Array.from(userCards).map(card => {
    const nombreApellido = card.querySelector('h5.card-title').textContent.split(',');
    const p_card_text = card.querySelectorAll('p.card-text');
    const correo = p_card_text[0].textContent;
    const telefono = p_card_text[1].textContent;
    const creacion_usuario= p_card_text[2].textContent;
    const estado = card.querySelector('button').textContent;

    return {
        nombre: nombreApellido[0].trim(),
        apellido: nombreApellido[1].trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
        creacion_usuario : creacion_usuario.trim(),
        estado : estado.trim()
    };
});

const searchInput = document.querySelector("[data-search]");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const statusSelector = document.getElementById("statusSelector");

searchInput.addEventListener("input", () => {
    filtersCards();
});

startDateInput.addEventListener("change", () => {
    filtersCards();
});

endDateInput.addEventListener("change", () => {
    filtersCards();
});

statusSelector.addEventListener("change", () => {
    filtersCards();
});

// funcion para filtrar las tarjetas de usuario
function filtersCards() {
    const searchValue = searchInput.value.toLowerCase();
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const selectedStatus = statusSelector.value;

    usersData.forEach((user, index) => {
        const userCard = document.querySelector(`[data-user-card='${index}']`);
        if (userCard) {
            const nameMatch = checkNameMatch(user, searchValue);
            const dateMatch = checkDateMatch(user.creacion_usuario, startDate, endDate);
            const statusMatch = checkStatusMatch(user.estado, selectedStatus)
            const isVisible = nameMatch && dateMatch && statusMatch;
            userCard.classList.toggle("hide", !isVisible);
        }
    });
}

// funcionees auxiliares para verificar coincidencias
function checkNameMatch(user, searchValue) {
    console.log(user)
    return user.nombre.toLowerCase().includes(searchValue) || user.apellido.toLowerCase().includes(searchValue);
}

function checkDateMatch(creationDateString, startDate, endDate) {

    creationDateString = creationDateString.split('T')[0]
    if (startDate === '' && endDate === '') {
        return true;
    }
    if (startDate !== '' && endDate === '') {
        return (creationDateString === startDate);
    }
    return (creationDateString >= startDate) && (creationDateString <= endDate);
}

function checkStatusMatch(user, status) {
    if (status === 'all') {
        return true;
    }
    console.log(user)
    console.log(status)
    return user === status;
}
