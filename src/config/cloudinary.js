import cloudinary from "cloudinary";
import {
  API_KEY_CLOUDINARY,
  API_SECRET_CLOUDINAY,
  CLOUDNAME_CLOUDINARY,
} from "./globalkey.js";

cloudinary.config({
  cloud_name: CLOUDNAME_CLOUDINARY,
  api_key: API_KEY_CLOUDINARY,
  api_secret: API_SECRET_CLOUDINAY,
});

const UploadImageToCloud = async (files, filename, oldImage) => {
  try {
    if (!files) return "";
    if (oldImage) {
      const spliturl = oldImage.split("/");
      const img_id = oldImage.spliturl[(spliturl, length - 1)].split(".")[0];
      await cloudinary.uploader.destroy(img_id);
    }
    const base64 = files.toString("base64");
    const imgPath = `data:image/jpeg;base64,${base64}`;
    const cloudinaryUpload = await cloudinary.uploader.upload(imgPath, {
      pubilce_id: `${filename}`,
      resource_type: "auto",
    });
    return cloudinaryUpload.url;
  } catch (error) {
    console.log(error);
    return "";
  }
};
export default UploadImageToCloud;
