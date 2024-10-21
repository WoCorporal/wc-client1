# Wo-Corporal

## Descripción
Wo-Corporal es una aplicación diseñada para gestionar ejercicios físicos, permitiendo a los entrenadores personales agregar, actualizar y eliminar ejercicios de una base de datos. La aplicación utiliza tecnologías modernas como Next.js, React y MongoDB, y está estructurada para facilitar la validación y gestión de datos.

## Dependencias

1. **@hookform/resolvers**: `^3.9.0`  
   Proporciona resolutores para la biblioteca React Hook Form, permitiendo la validación de formularios.

2. **mongoose**: `^8.7.0`  
   Una biblioteca de modelado de objetos MongoDB para Node.js que proporciona una solución basada en esquemas para modelar los datos de tu aplicación.

3. **next**: `14.2.13`  
   Framework de React para la creación de aplicaciones web y sitios estáticos, con funciones de renderizado del lado del servidor.

4. **react**: `^18`  
   Biblioteca de JavaScript para construir interfaces de usuario.

5. **react-dom**: `^18`  
   Paquete que proporciona métodos específicos de la DOM para trabajar con React.

6. **react-hook-form**: `^7.53.0`  
   Biblioteca para la gestión de formularios en React, que permite un manejo sencillo y eficiente de formularios.

7. **zod**: `^3.23.8`  
   Biblioteca para la validación de esquemas y tipos de datos, que permite la creación de validaciones en tiempo de ejecución.

### Dependencias de Desarrollo

1. **@types/node**: `^20`  
   Proporciona tipos de TypeScript para Node.js.

2. **@types/react**: `^18`  
   Proporciona tipos de TypeScript para React.

3. **@types/react-dom**: `^18`  
   Proporciona tipos de TypeScript para React DOM.

4. **eslint**: `^8`  
   Herramienta de análisis de código para identificar patrones problemáticos en el código JavaScript.

5. **eslint-config-next**: `14.2.13`  
   Configuración de ESLint específica para aplicaciones Next.js.

6. **postcss**: `^8`  
   Herramienta para transformar CSS con JavaScript.

7. **tailwindcss**: `^3.4.1`  
   Framework CSS de utilidad para construir interfaces personalizadas rápidamente.

8. **typescript**: `^5`  
   Lenguaje de programación que es un superconjunto de JavaScript, permitiendo la adición de tipos estáticos.


# Documentación de la API de Ejercicios

## Endpoints

### 1. Obtener todos los ejercicios
- **Ruta**: `/api/exercise`
- **Método**: `GET`
- **Descripción**: Devuelve todos los ejercicios de la base de datos.
- **Parámetros**: Ninguno
- **Respuesta**:
  - **200 OK**: Lista de ejercicios
  - **500 Internal Server Error**: Error al obtener los ejercicios.

### 2. Filtrar ejercicios por categoría y/o dificultad
- **Ruta**: `/api/exercise?category={category}&difficulty={difficulty}`
- **Método**: `GET`
- **Descripción**: Filtra los ejercicios por categoría y/o dificultad.
- **Parámetros**:
  - `category` (opcional): Filtra los ejercicios por categoría.
  - `difficulty` (opcional): Filtra los ejercicios por nivel de dificultad.
- **Ejemplo de uso**:
  - Obtener ejercicios de la categoría "resistencia":
    ```
    GET /api/exercise?category=resistencia
    ```
  - Obtener ejercicios de dificultad 3:
    ```
    GET /api/exercise?difficulty=3
    ```
- **Respuesta**:
  - **200 OK**: Lista de ejercicios filtrados
  - **500 Internal Server Error**: Error al filtrar los ejercicios.
