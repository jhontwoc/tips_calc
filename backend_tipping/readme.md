<h1> Backend para el manejo de propinas </h1>


Historia de Usuario: Como gerente de un restaurante, quiero un sistema que me permita
gestionar el pago de propinas de manera eficiente, para que tanto los empleados como
los clientes tengan una experiencia satisfactoria y transparente


1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/jhontwoc/tips_calc.git

2. **Instalar Dependencias del Servidor**
    ```bash
    cd ../backend_tipping
    npm install

3. **Iniciar servidor**
    ```bash
    npx ts-node src/app.ts

## Tecnologías Utilizadas

- TypeScript
- Node.js
- Express.js
- Git

## Endpoints de la API (Express.js)

Parámetros de solicitud: { "totalAmount": number }
POST /api/tipping/capture: Captura o actualiza el monto total de propinas.

Parámetros de solicitud: { "numberOfEmployees": number }
POST /api/tipping/capture: Dividir el monto de propinas por X empleados.

Parámetros de solicitud: { "method": string, "amount": number }
POST /api/tipping/recordPayment: Registra un pago parcial.

Parámetros de solicitud: { NULL }
GET /api/tipping/tippingPayments: Obtiene el estado actual de los datos de propinas para pruebas.


Este proyecto está bajo la Licencia MIT - consulta el archivo LICENSE.md para más detalles.