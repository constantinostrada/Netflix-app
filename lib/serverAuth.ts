import { NextApiRequest } from "next";
import {getSession} from 'next-auth/react'

import prismadb from '@/lib/prismadb';

const serverAuth =async (req: NextApiRequest) => {

    // Recupera la sesión de autenticación actual del usuario utilizando la función getSession de next-auth/react, que se pasa el objeto req de la solicitud actual como argumento. La sesión contiene información de usuario, como la dirección de correo electrónico.
    const session = await getSession({req});

    // Verifica que la sesión incluya un objeto de usuario y que el usuario tenga una dirección de correo electrónico válida
    if(!session?.user?.email){
        throw new Error('Not signed in')
    }

    // Utiliza la biblioteca prismadb para buscar un usuario único en la base de datos que tenga la dirección de correo electrónico de la sesión actual.
    const currentUser = await prismadb.user.findUnique({
        where :{
            email:session.user.email
        }
    })

    if(!currentUser){
        throw new Error('Not signed in')
    }
    return {currentUser}
}

export default serverAuth