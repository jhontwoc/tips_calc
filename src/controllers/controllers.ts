import { Request, Response } from 'express';

// Objeto para almacenar temporalmente los datos de propinas
const tippingData: { totalAmount?: number } = {};

class TippingController {
  // Capturar el monto total de propinas
  captureTips(req: Request, res: Response): void {
    try {
        const { totalAmount } = req.body;

        // Validar que el monto total sea un número positivo
        if (typeof totalAmount !== 'number' || totalAmount <= 0) {
          res.status(400).json({ success: false, error: 'El monto total debe ser un número positivo.' });
          return;
        }

        // Almacenar el monto total temporalmente
        tippingData.totalAmount = totalAmount;
  
        res.status(200).json({ success: true, message: `Monto total de ${totalAmount}$ capturado correctamente.` });
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Error interno del servidor al capturar propinas.' });
      }
  }

  // Decidir la división de propinas
  divideTips(req: Request, res: Response): void {
    try {
      // Obtener el número de empleados y la lógica de división desde la solicitud
      const { numberOfEmployees } = req.body;

      // Validar que numberOfEmployees sea un número positivo
      if (typeof numberOfEmployees !== 'number' || numberOfEmployees <= 0) {
        res.status(400).json({ success: false, error: 'Parámetros inválidos para la división de propinas.' });
        return;
      }

      // Obtener el monto total almacenado temporalmente
      const totalAmount = tippingData.totalAmount;

      // Validar que el monto total esté disponible
      if (typeof totalAmount !== 'number' || totalAmount <= 0) {
        res.status(400).json({ success: false, error: 'El monto total de propinas no está disponible.' });
        return;
      }

      // Aplicar la lógica de división y calcular las propinas por empleado aplicando math.floor para obtener el entero más bajo.
      const tipsPerEmployee = Math.floor(totalAmount / numberOfEmployees);

      res.status(200).json({ success: true, tipsPerEmployee, message: `El monto de propina por empleado: ${tipsPerEmployee}` });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error interno del servidor al dividir propinas.' });
    }
  }

  // Otras funciones del controlador según sea necesario
}

const tippingController = new TippingController();
export default tippingController;
