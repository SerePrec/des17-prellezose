# Desafío 17 - Programación Backend

### CoderHouse

## DESPLEGAR NUESTRO PROYECTO EN LA NUBE

Retomemos nuestro trabajo para implementar nuestro proyecto en Heroku

### Consigna

Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

El servidor debe seguir funcionando en forma local.

Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

### Deploy en Heroku (Temporal):

https://des17-prellezose.herokuapp.com/
### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm run dev`. De lo contrario, para ejecutarlo en "modo producción", utilizar `npm start`.

Se puede pasar por parámetros de argumento dos opciones:
| Opción | Valor | Defecto |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-p --port --PORT` | Número de puerto de escucha del servidor | 8080 |
| `-m --mode --MODE` | Módo de ejecución del servidor. `fork` o `cluster` | fork |

Se puede seleccionar entre dos métodos de persistencia de **datos y sesiones** a través de la variable de entorno `PERS`. El modo `PERS=mongodb_atlas` **(DEFECTO)** para persistir en **MongoDB Atlas** y el modo `PERS=mongodb` para hacer lo mismo en **MongoDB local**

### Vistas

Existen las siguientes vistas que proveen una manera amena de probar el desafío.
Estas vistas se encuentran en las rutas:

- **/** : es la vista principal en donde se encuentra el formulario de carga de productos y el centro de mensajes (chat). Utiliza **websockets**. Requiere autenticación.

- **/login** : formulario de login.

- **/login-error** : vista a la que redirige tras un error en el login.

- **/register** : formulario de registro.

- **/register-error** : vista a la que redirige tras un error en el login.

- **/logout** : vista a la que se accede tras hacer el logout y luego de 5 segundos redirige a home.

- **/productos-mock** : es donde se muestra en una tabla el mock de productos devueltos por la llamada a la API en la ruta de test. Requiere autenticación

- **/info**: muestra información relativa a la app

### API

Consiste en las siguientes rutas:

#### Router /api/productos

| Método | Endpoint                | Descripción                                                                                                                                                                                                                 |
| ------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET    | **/api/productos/**     | Me permite listar todos los productos disponibles                                                                                                                                                                           |
| POST   | **/api/productos/**     | Para incorporar productos al listado                                                                                                                                                                                        |
| GET    | **/api/productos/:id**  | Me permite listar un producto por su id                                                                                                                                                                                     |
| PUT    | **/api/productos/:id**  | Actualiza un producto por su id. Admite actualizaciones parciales                                                                                                                                                           |
| DELETE | **/api/productos/:id**  | Borra un producto por su id                                                                                                                                                                                                 |
| GET    | **/api/productos-test** | Devuelve un listado de 5 productos mock generados con **Faker.js**                                                                                                                                                          |
| GET    | **/api/randoms**        | Devuelve una cantidad de números aleatorios en el rango del 1 al 1000 especificada por parámetros de consulta (query). Por ej: `/api/randoms?cant=20000`. Si dicho parámetro no se ingresa, calcula 100.000.000 de números. |

### Detalles y comentarios

Se utilizó `heroku logs --tail` para observar los logs de heroku en nuestra consola. 
