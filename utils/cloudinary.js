const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config({ path: 'config.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//
const cloudinaryUploadImg = async (fileToUploads) => {
  try {
    // TODO: public_id and asset_id
    const result = await cloudinary.uploader.upload(fileToUploads); // Tải ảnh lên Cloudinary
    return result.url; //, result.public_id; // Gửi kết quả về cho client
  } catch (error) {
    console.error(error);
    throw new Error('Upload image failed: ' + error);
  }
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  try {
    // TODO: public_id and asset_id
    const result = await cloudinary.uploader.destroy(fileToUploads); // Tải ảnh lên Cloudinary
    return result.url, result.public_id; // Gửi kết quả về cho client
  } catch (error) {
    console.error(error);
    throw new Error('Upload image failed: ' + error);
  }
};
// };const cloudinaryUploadImg = async (fileToUploads) => {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(fileToUploads, (result) => {
//       console.log(result);
//       resolve(
//         {
//           url: result.secure_url,
//         },
//         {
//           resource_type: 'auto',
//         }
//       );
//     });
//   });
// };

// const uploadImageToCloudinary = async (req, res) => {
//   try {
//     //TODO: name folder
//     const imageFilePath = req.file.path; // Lấy đường dẫn tạm thời của ảnh từ req.file.path

//     const result = await cloudinary.uploader.upload(imageFilePath); // Tải ảnh lên Cloudinary

//     fs.unlinkSync(imageFilePath); // Xóa tệp tạm thời đã tải lên

//     console.log(result); // Kết quả từ Cloudinary

//     res.status(200).json({ status: 'success', data: result.url }); // Gửi kết quả về cho client
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', data: error });
//   }
// };

// module.exports = uploadImageToCloudinary;
module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
//
