import sharp from "sharp";
import jimp from "jimp";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const UploadImageToServer = async (filename, base64) => {
  try {
    const imgBuffer = Buffer.from(base64, "base64");
    const imgName = `IMG-${Date.now()}-${filename}`;
    console.log(imgName);
    const imgPath = `${__dirname}/../../assets/images/${imgName}`;
    // Convert image to JPEG format using sharp
    const jpegBuffer = await sharp(imgBuffer).toBuffer();
    const image = await jimp.read(jpegBuffer);
    if (!image) {
      return "Error Covert files";
    }
    image.write(imgPath);
    return imgName;
  } catch (error) {
    console.log(error);
    return "";
  }
};
