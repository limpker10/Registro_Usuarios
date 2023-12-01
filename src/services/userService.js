// userService.js
let arrayUsuarios = [
    {
        id: "asdfXkmnakjAQ2",
        nombre: "Jose Miguel",
        apellido: "Cano Vilcapaza",
        edad: 23,
        anhio_nacimiento: '03-05-1997',
        correo : "jcanov@unsa.edu.pe",
        telefono: 977522379,
        direccion: {
            primera_direccion: "San Juan de Dios",
            segunda_direccion: "",
        },
        documento_identidad: {
            tipo_documento: 'DNI',
            numero_documento: 10234567,
        },
        creacion_usuario: '2023-10-17T18:56:43.508298',
        estatus: true,
    }
];

function getAuthSpecificData() {
    return arrayUsuarios;
}
const addUser = async (userData) => {
    arrayUsuarios.push(userData);
};


module.exports = {
    addUser,
    arrayUsuarios,
    getAuthSpecificData
};
