require('dotenv').config();

const constants = Object.freeze({
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,

    PROFILES_COLLECTION_NAME: 'profiles',
    USERS_COLLECTION_NAME: 'users',
    ADMIN_COLLECTION_NAME: 'admin',
    EXAMS_COLLECTION_NAME: 'exams',
    EXAM_RESULTS_COLLECTION_NAME: 'exam_results',
    REFRESH_TOKENS_COLLECTION_NAME: "refreshTokens",
    NAME_REGEX: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸưăạảấầẩẫậắằẳẵặẹẻẽềềểếệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/i
});

module.exports = constants;