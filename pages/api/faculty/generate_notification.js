import { PrismaClient } from "@prisma/client"


const handler = async (req, res) => {
    const prisma = new PrismaClient()

    try {
        const newNotification = await prisma.notification.create({
            data: {
                notification: req.body.notification,
                faculty_id: req.body.faculty_id,
            }
        })
        res.status(200).json(newNotification)
    } catch (err) {
        throw new Error(err.message)
    }
}

export default handler;