import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password } = req.body;
    // utiliza la biblioteca de bases de datos Prisma para buscar un usuario único con una dirección de correo electrónico específica
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    // verificar si existingUser es truthy. Si es así, significa que ya existe un usuario con esa dirección de correo electrónico en la base de datos,
    if (existingUser) {
      return res.status(422).json({ error: "Email taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
