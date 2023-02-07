import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise(resolve => {
      bcrypt.compare(plainPassword, hashedPassword, function(err, res) {
          resolve(res);
      });
  })
}

export default handler = async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const faculty = await prisma.faculty.findFirst({
      where: {
        email: req.email
      }
    });

  if (faculty !== null)
    {
        //Compare the hash
        const matched = await confirmPasswordHash(req.password, faculty.password);
        if (matched)
        {
          res.status(200).json(faculty)   
        }
        else
        {
            throw new Error("Invalid Password")
        }
    }
    else {
        throw new Error("Faculty not found")
    }
  } catch (err) {
    throw new Error(err.message)
  }
}