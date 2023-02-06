import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient();


export default handler = async (req, res) => {
    if (req.method === "POST")
    {
      
        const {P_number, name, phone_number, email, CGPA, password, DOB } = req.body;

        try
        {
            const hash = await bcrypt.hash(password, 0);
            const newStudent = await prisma.student.create({
                data: {
                  P_number,
                  name,
                  phone_number,
                  email,
                  CGPA,
                  DOB,
                  password: hash
                }
            });

            return res.status(200).json(newStudent);
        }
        catch (err)
        {
            return res.status(503).json({err: err.toString()});
        }
    }
    else
    {
        return res.status(405).json({error: "This request only supports POST requests"})
    }
}