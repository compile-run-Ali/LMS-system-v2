// Get faculty by level
import { PrismaClient } from "@prisma/client"

const handler = async (req, res) => {
    const prisma = new PrismaClient()
    try {
        //Find Faculty
        const faculty = await prisma.faculty.findMany({
        where: {
            level:{
                gt: req.body.level
            } 
        },
        select: {
            faculty_id: true,
            name: true,
            email: true,
            phone_number: true,
            department: true,
            password: true,
            profile_picture: true,
            level: true,
            position: true,
        },
        })
        res.status(200).json(faculty)
    } catch (err) {
        throw new Error(err.message)
    }
    }