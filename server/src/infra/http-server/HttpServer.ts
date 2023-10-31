export interface HttpServer {
  listen(port: number, host: string): Promise<void>;
}
