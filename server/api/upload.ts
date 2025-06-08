import { defineEventHandler, readMultipartFormData } from "h3";
import { writeFile } from "fs/promises";
import { join } from "path";

export default defineEventHandler(async (event) => {
    try {
        const formData = await readMultipartFormData(event);
        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "application/pdf",
            "text/plain",
        ];
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const publicUploadPath = join(process.cwd(), "public", "uploads");
        const uploaded = {};
        if (!formData || formData.length === 0) {
            return { error: "No files uploaded" };
        }

        for (const file of formData) {
            const { name, filename, data, type } = file;
            console.log(file);

            if (!filename || !data) continue;

            if (data.length > MAX_FILE_SIZE) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `File ${filename} exceeds max size of 5MB`,
                });
            }

            if (!type || !allowedTypes.includes(type)) {
                throw createError({
                    statusCode: 400,
                    statusMessage: `File type ${
                        type || "unknown"
                    } not allowed. Allowed types: ${allowedTypes.join(", ")}`,
                });
            }

            const uniqueFilename = `${Date.now()}_${filename}`;
            await writeFile(join(publicUploadPath, uniqueFilename), data);

            // เก็บ URL โดยใช้ชื่อ field เป็น key
            uploaded[name] = `/uploads/${uniqueFilename}`;
        }

        return {
            message: "Upload successful",
            files: uploaded,
        };
    } catch (error) {
        throw error;
    }
});
