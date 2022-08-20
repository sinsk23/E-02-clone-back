module.exports = (req, res, next) => {
    const {token} = req.header;

    if(token){
        return res.status(409).json({
            ok: false,
            do: token,
            errorMessage: "이미 로그인 중입니다"
        });
    };

    next();    
};