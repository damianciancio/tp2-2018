# tp2 2018

TP 2
1 - Enunciado
1.1 - Desarrollo

Desarrollar un backend utilizando una API REST o GraphQL y un frontend parcial con las siguientes caracterísitcas:

    El backend debe ser programado en JavaScript con NodeJS.
    Debe utilizar un framework/middleware. Se dará soporte sobre Express pero podrán utilizarse alternativas si así se prefiere.
    La persistencia debe realizarse utilizando un ODM/ORM con una base de datos acorde a la tecnología que se utilice.
    El frontend debe realizarse con un framework como Angular u otro seleccionado, html 5 y para CSS debe usarse un preprocessador o framework.
    El tema y alcance del trabajo debe ser propuesto por los alumnos y aprobado por los docentes de la cátedra (o utilizar el del año 2017)

1.2 - Funcionalidad
1.2.1 - Backend por API REST o GraphQL

    Debe permitir realizar uno o más ABMC por API. Los mismos dependen de la dificultad del trabajo propuesto y cantidad de integrantes. Los mismos deben ser acordados con los docentes.
    Al menos 1 listado, filtrado o no, por API ,el mismo debe listar al menos uno de los elementos creados en los ABMC y se recomienda que el listado incluya datos de al menos dos elementos o hacer dos listados.
    Presentar un detalle por API de alguno de los elementos en un listado, al solicitar el mismo utilizando un ID u otro identificador obtenido de un elemento del listado, deberán devolverse más datos sobre el mismo.
    
1.2.2 - Frontend

    El frontend al menos deberá permitir invocar a la API y mostrar los resultados de uno de los listados y el detalle del mismo.
    El resto de la funcionalidad puede utilizarse mediante una herramienta similar a postman, restclient, curl o wget.

1.3 - Planificación y documentación
1.3.1 - Entregas

El equipo deberá definir el alcance del trabajo práctico con el equipo docente. Indicando los criterios de aceptación.

Las mismas podrán volverse a pactar con los profesores enviando las correcciones a la misma indicando, causas, acciones correctivas que se tomarán.

1.3.2 - Reuniones de avance

A su vez deberán hacer reuniones periódicas para planificar las acciones a realizar y los responsables entre una reunión y otra. La periodicidad la definirán los miembros del equipo pero no podrá ser mayor a 1 por semana.

En la misma deberán indicar: fecha de la reunión, asistentes y por cada asistente:

    Tareas completadas desde la última reunión
    Blockers
    Tareas a realizar hasta la próxima reunión
    A su vez si no se alcanzó lo planificado en la reunión anterior las acciones correctivas que se tomarán.

2 - Criterio de correccion
2.1 - Sitio

    Diseño adecuado de la API REST.
    Diseño del modelo de datos adecuado.
    Usabilidad del sitio: debe ser fácil de usar, elegante y no tener contenido oculto o difícil de acceder
    Diseño adecuado de la interfaz: uso apropiado de los tags html y de los estilos, ya sea utilizando un FW CSS o un preprocesador.
    Calidad del código: uso adecuado de las características del FW y de la API.
    Completitud de los requerimientos.

2.2 - Planificación

    Progreso en las capacidades para planificar adecuadamente y tomar acciones correctivas.
    Adecuación de las entregas con tiempos y acciones.

2.3 - Repositorio

    El desarrollo deberá realizarse en una plataforma de git gratuita. Se recomienda GitHub o GitLab.
    Se evaluará el uso de git: Frecuencia y responsables de los commits, uso de branches y merge.

3 - Entrega final

La entrega final deberá hacerse enviando por email a los profesores la URL del repositorio de git. La fecha límite de entrega es dos días antes del cierre de regularidades, la misma debe incluir el código del trabajo y una defensa del mismo la cual debe haber sido pactada con anterioridad según la disponibilidad de los docente.

El archivo readme.md deberá ser modificado y deberá agregarse al final el tema del trabajo práctico y alcance pactado con el docente, el trabajo, año de cursado e integrantes (legajo, nombre y apellido).


# Tema: Juegos de mesa
La idea sería que cada usuario cargue los juegos que tenga.

Que se puedan armar grupos de usuarios.

Que se puedan cargar partidas (cualquiera del grupo), con el puntaje de cada uno, quien fue el ganador/es

Mostrar estadísticas del grupo

Comentarios en las partidas

Elección de juego al azar (según nro de jugadores y tiempo disponible para la partida)

Elección de juego en función de: tiempo transcurrido desde su última partida, puntuación de los usuarios, noción de rejugabilidad por parte de los miembros del grupo

Hay un admin del grupo que puede agregar/eliminar miembros.

Puede haber más de uno

Requerimientos:

- Cada usuario debería poder gestionar sus juegos de mesa.
 - Cada usuario podría formar un grupo (o muchos grupos) de juegos con otros usuarios y gestionarlo. Las acciones de baja y alta de usuarios al grupo son potestad de los administradores del grupo.
 - El usuario creador sería el administrador, teniendo la posibilidad de nombrar más personas para que lo sean. (para promoción, para regularidad devolver un link para unirse al grupo)
 - Cada usuario puede cargar partidas para un grupo determinado (ya sea un grupo al que pertenezca o un grupo creado en el momento (dar la posibilidad de formar un grupo de juegos obteniendo el resultado del punto anterior, pero que esto no pase por defecto). (invitado promoción)
 - Cada usuario puede ver las partidas en las que jugó y comentarlas, generando notificaciones para el resto de los usuarios. (comentarios y notificaciones promoción)

##Alcance del tp en endpoints:

Reunión con Adrián.
Definimos los endpoints y el frontend para la regularidad:

frontend:

listar grupos y aceptar solicitudes pendientes
Endpoints regularidad
ABM usuarios
GET /api/player/ ok
GET /api/player/:id ok
POST /api/player/ ok
*PUT /api/player/:id 
*DELETE /api/player/:id

ABM Grupos
GET /api/groups/:id ok
POST /api/groups/ ok
*PUT /api/groups/:id
*DELETE /api/groups/:id

Obtener grupos a los cuales pertenezco
GET /api/player/:id/groups ok

Obtener grupos de los cuales soy admin
GET /api/player/:id/groups?admin=true  ok

Aceptar un miembro
GET /api/groups ok
GET /api/groups/:id/members (listar) ok
GET /api/groups/:id/members?status=pending ok (miembros pendientes)
POST /api/groups/:idgroup/members/ ok (añadir miembros)
PUT /api/groups/:id/members/:idmember ok (aceptar un miembro)

** ver partidas y juegos
Partidas de un usuario
GET /api/player/:id/plays/ ok
GET /api/games/:id 
POST /api/player/:id/games/ ok
PUT /api/player/:id/games/
DELETE /api/games/:id

Agregar una partida
POST /api/plays/ ok

Los * no son necesarios para regularizar,
Los ** ver cómo llegamos con los demás y ahí vemos si es necesario hacer esto o no para regularidad

En este momento están todos los ítems solicitados para regularizar más tres endpoints que estaban en duda. (los de los dos **)