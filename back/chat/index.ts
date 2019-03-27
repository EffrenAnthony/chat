import Server from './clases/server';
import { router } from './routes/route';

const server = new Server();

server.app.use('/',router);

server.start();