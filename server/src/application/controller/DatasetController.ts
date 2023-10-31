import { HttpServer } from '../../infra/http-server/HttpServer';

export class DatasetController {
  constructor(readonly httpServer: HttpServer) {
    this.httpServer.register('get', '/', async (params: any, body: any) => {
      return { ok: true };
    });
  }
}
