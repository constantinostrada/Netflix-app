import { PrismaClient } from "@prisma/client";

const client = global.prismadb || new PrismaClient();
if(process.env.NODE_ENV == 'production') global.prismadb = client;
// crea un montos de instancias prismaclient, lo que genera un error, es por ello que
// guardamos prisma client en un archivo global, el cual no es afectado
export default client;