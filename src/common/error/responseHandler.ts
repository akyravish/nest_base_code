import { HttpStatus } from '@nestjs/common';

/*
 * @desc: success response handler
 * @param: { message: string, data: any }
 * @return: { error: boolean, statusCode: number, timestamp: string, path: string, method: string, message: string, data: any }
 */
export const successResponse = (message: string, data: any) => {
  return {
    error: false,
    statusCode: HttpStatus.OK,
    timestamp: new Date().toISOString(),
    message: message,
    data: data,
  };
};
