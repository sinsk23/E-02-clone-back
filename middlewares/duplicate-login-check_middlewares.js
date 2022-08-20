module.exports = (req, res, next) => {
    if(!req.headers){
        next();
    };

    return res.status().json({
        ok: false,
        errorMessage: "이미 로그인 중입니다"
    });
};