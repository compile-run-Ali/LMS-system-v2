import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";
import AdmZip from 'adm-zip';

export default async function handler(req, res) {
  const paperId = req.query.paperId
  const studentIds = req.query.studentIds.split(",")

  console.log("req.query: ", req.query)
  console.log("paperId: ", paperId)
  console.log("studentIds: ", studentIds)

  try {
    // Retrieve the file details from the database
    const files = await prisma.sIA.findMany({
      where: {
        paperId: paperId,
        studentId: {in: studentIds}
      },
    });
    console.log("files from prisma: ", files)

    if ( files.length === 0 ) {
      return "No file uploaded"
    }


    let file;
    let filePath;
    let filePaths = [];
    for(let i = 0; i < files.length; i++){
        file = files[i]
        filePath = path.join(process.cwd(), file?.fileUrl); 
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found" });
        }
        filePaths = [...filePaths, filePath]
    }
    console.log("filePaths:", filePaths)

    // const archive = archiver('zip', {
    //     zlib: { level: 9 } // Sets the compression level.
    // });

    const zip = new AdmZip();
    
    res.setHeader('Content-Disposition', 'attachment; filename=IE_Exams.zip');
    res.setHeader('Content-Type', 'application/zip');

    // archive.pipe(res);
    // filePaths.forEach((file_path) => {
    //     let index = file_path.lastIndexOf("\\")
    //     let path = file_path.slice(index+1)
    //     console.log("path:", path)
    //     archive.append(fs.createReadStream(file_path), { name: path });
    // });
    // await archive.finalize();

    filePaths.forEach((file_path) => {
        zip.addLocalFile(file_path);
    });
    
    const zipBuffer = zip.toBuffer();
    res.send(zipBuffer);

  } catch (err) {
    console.error("Error downloading file:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
