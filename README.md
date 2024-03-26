# Desafio-Coder


## Características principales

- Crear usuarios y productos fácilmente de forma asincrona y archivados en una carpeta de formato JSON.
- Uso de Fs y Crypyo
- Todas las creaciones tienen un ID aleatorio.
- Asignar condiciones estrictas para la creacion de usuarios y productos.
- Logs para mantener a los usuarios informados sobre sus usuarios y tareas creadas.
- Busqueda de productos y usuarios a travez de id, categoria y rol


## Instalación

Para instalar sigue estos pasos:

1. Clona el repositorio desde GitHub: `git clone https://github.com/estebanmaoloni/Desafio1-Coder.git`



## Datos a tener en cuenta

1. Todo debe ser probado en la ruta http://localhost:8080/api de ahi en adelante se le agregan el user o el product y la categoria el rol o el id

## Ejemplos


# Visualizacion

- http://localhost:8080/api/users
- http://localhost:8080/api/products

# Creaacion

- http://localhost:8080/api/users/usuario1@gmail.com
- http://localhost:8080/api/products/lentes/200

# Filtrado por categoria on rol
- http://localhost:8080/api/users?role=administrador
- http://localhost:8080/api/products?category=to do

# Filtrado por id
- http://localhost:8080/api/users/65ac8f2097638b59157e1a2a
- http://localhost:8080/api/products/087acdbd852d2d6635498092




