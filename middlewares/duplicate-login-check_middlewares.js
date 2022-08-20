module.exports = (req, res, next) => {
  //   const { token } = req.header;
  //   console.log(token);

  const { authorization } = req.headers;
  //   console.log(authorization);

  if (authorization) {
    return res.status(409).json({
      ok: false,
      do: authorization,
      errorMessage: "이미 로그인 중입니다",
    });
  }

  next();
};
