export type HttpMethods =
  | 'get'
  | 'post'
  | 'put'
  | 'patch'
  | 'delete'
  | 'options';

export interface HttpServer {
  register(method: HttpMethods, url: string, callback: Function): Promise<void>;
  listen(port: number, host: string): Promise<void>;
}
