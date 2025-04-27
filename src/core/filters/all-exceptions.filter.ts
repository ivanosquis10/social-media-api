// src/filters/all-exceptions.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { type Request, type Response } from 'express';

@Catch() // Captura todas las excepciones no manejadas
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Valores por defecto para errores no controlados (generalmente 500 Internal Server Error)
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    // Si la excepción es una instancia de HttpException (incluye tus excepciones personalizadas que la extiendan)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();

      // HttpException.getResponse() puede devolver un string o un objeto.
      // Si es un objeto, intentamos obtener el mensaje de ahí.
      if (typeof responseBody === 'object' && responseBody !== null) {
        message = responseBody['message'] || message;
      } else if (typeof responseBody === 'string') {
        message = responseBody;
      }
      // Nota: Aquí no incluimos errorCode ni details para ajustarnos a tu formato deseado.
      // Si en el futuro quieres más info, puedes añadirla aquí.
    } else {
      // Aquí manejas excepciones que no son HttpExceptions (ej: errores de programación inesperados)
      // Generalmente, estos son errores 500 y es buena práctica loggearlos.
      console.error('Unhandled Exception:', exception);
      message = 'An unexpected error occurred.'; // Mensaje genérico para errores 500 desconocidos
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    // Formatea la respuesta según el formato deseado
    response.status(status).json({
      status: status, // Usamos el valor numérico del status
      message: message,
      timestamp: new Date().toISOString(),
    });
  }
}
