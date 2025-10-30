pragma solidity ^0.8.0;

contract FinanzasEscolares {
    // Estructura de una actividad
    struct Actividad {
        string titulo;
        string descripcion;
        string respuestaCorrecta;
        address creador;
    }

    Actividad[] public actividades;

    mapping(address => uint) public puntos;

    mapping(address => bool) public esProfesor;

    event ActividadCreada(uint id, string titulo, address creador);

    event ActividadRespondida(uint id, address estudiante, bool correcta);

    function registrarProfesor(address _profesor) public {
        esProfesor[_profesor] = true;
    }

    function crearActividad(string memory _titulo, string memory _descripcion, string memory _respuestaCorrecta) public {
        require(esProfesor[msg.sender], "Solo profesores pueden crear actividades");
        actividades.push(Actividad(_titulo, _descripcion, _respuestaCorrecta, msg.sender));
        emit ActividadCreada(actividades.length - 1, _titulo, msg.sender);
    }

    function responderActividad(uint _id, string memory _respuesta) public {
        require(_id < actividades.length, "Actividad no existe");
        Actividad memory act = actividades[_id];
        bool correcta = keccak256(bytes(_respuesta)) == keccak256(bytes(act.respuestaCorrecta));
        if (correcta) {
            puntos[msg.sender] += 10;
        }
        emit ActividadRespondida(_id, msg.sender, correcta);
    }

    function consultarPuntos(address _estudiante) public view returns (uint) {
        return puntos[_estudiante];
    }

    function totalActividades() public view returns (uint) {
        return actividades.length;
    }
}