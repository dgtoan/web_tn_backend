const constants = Object.freeze({
    PROFILES_COLLECTION_NAME: 'profiles',
    USERS_COLLECTION_NAME: 'users',
    ADMIN_COLLECTION_NAME: 'admin',
    EXAMS_COLLECTION_NAME: 'exams',
    EXAM_RESULTS_COLLECTION_NAME: 'exam_results',
    NAME_REGEX: /^[A-Za-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸưăạảấầẩẫậắằẳẵặẹẻẽềềểếệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/i
});

module.exports = constants;