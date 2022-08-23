//스웨거 모듈 관련 임포트
const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

//스웨거 메인페이지 정보입력
const options = {
    swaggerDefinition:{
        info:{
            title : 'Test API AirB&B',
            version : '1.1.0',
            description : `<br>'AirB&B 의 API입니다'<br/>` 
        },
        host : 'localhost:3000',
        basePath : '/api',//E-02-clone-back 의 app.use 기본경로
    },
    //내가 설정한 api들을 스웨거가 찾도록 명시
    apis: [
        './routes/comment.js',
        './routes/item.js',
        './routes/like.js',
        './routes/user.js'
    ],
};

 
const specs = swaggereJsdoc(options);
//위 해당 옵션들을 모듈로서 내보내줌
module.exports = {
    swaggerUi,
    specs

};