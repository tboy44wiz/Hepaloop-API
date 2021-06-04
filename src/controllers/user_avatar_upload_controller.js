import multer from 'multer';

import Response from '../utils/response';
import path from "path";


// Multer Storage Method.
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './public/uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '_' + Date.now() + '_' + 'profile_photo' + path.extname(file.originalname));
    }
});

//  Multer File Filter.
const fileFilter = (req, file, callback) => {
    //  Allowed Extensions.
    const fileType = /jpg|jpeg|png|gif/;

    //  Check Extensions.
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());

    //  Check for Mime Type.
    // const mimeType = fileType.test(file.mimetype);

    if(extName) {
        return callback(null, true);
    }
    return callback('Error; Please select images only.', false);
} ;

// Multer Object.
const upload = multer({
    storage: storage,
    limits: {fileSize: 100000},
    fileFilter: fileFilter,
}).single('avatar');

//  Uploading Image Function
const userAvatarUpload = (req, res, next) => {
    upload(req, res, (error) => {
        if(error) {
            const response = new Response(
                false,
                400,
                (error.message) ? `Error: ${error.message}` : error
            );
            return res.status(response.code).json(response);
        }
        return next();
    });
};

export default userAvatarUpload
