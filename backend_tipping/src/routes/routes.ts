import express, { Router } from 'express';
import tippingController from '../controllers/controllers';

const router: Router = express.Router();

// Ruta para capturar el monto total de propinas
router.post('/capture', tippingController.captureTips);

// Ruta para decidir la división de propinas
router.post('/divide', tippingController.divideTips);

// Ruta para almacenar/recibir pagos de propinas
router.post('/recordPayment', tippingController.recordPayment);

// Ruta para obtener el historial de pagos de propinas
router.get('/tippingPayments', tippingController.getTippingData);

// Otras rutas y funcionalidades según sea necesario

export default router;
