// userService.js
let arrayUsuarios = [
    {
        nombre: "Jose Miguel",
        apellido: "Cano Vilcapaza",
        numeroDeCelular: 977522379,
        departamento : "nuevodepartamento",
        provincia : "nuevaprovincia",
        distrito : "nuevodistrito",
        direccionExacta: "San Juan de Dios",
        email : "jcanov@unsa.edu.pe",
        tipoDeDocumento: 'DNI',
        numeroDeDocumento: 10234567,
        contrasena : 'nuevacontrasena',
        horaFormateada : '2023-10-17T18:56:43.508298',
        fechaFormateada : '2023-10-17T18:56:43.508298',
        estado: true,
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
