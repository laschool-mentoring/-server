const express = require('express') //익스프레스 모듈 불러오기
const morgan = require('morgan'); // 콘솔창에 요청에 대한 추가로그를 기록
const dotenv = require('dotenv'); // .env 파일에 적혀있는 환경변수를 사용 가능하게

dotenv.config(); // .env 파일에서 변수 불러오기
const app = express(); //express 내부에 http 모듈 내장
app.set('port', process.env.PROT || 8080); //서버가 실행될 포트 설정, app.set(키, 값) -> 데이터 짱,  port -> 8080, app.get('port') -> 8080

//써드파티 미들웨어 선언부분
app.use(morgan('dev'));


//애플리케이션 레벨 미들웨어
app.use((req, res, next) => {
    console.log('모든 요청에서 실행되는지 확인');
    next();
})

app.get('/', (req, res) => {
   console.log('GET / 요청에 대해서만 실행 확인');
});

app.get('/error', (req, res, next) => {
    console.log('에러 발생');
    throw new Error('하단 에러 미들웨어로 이동');
})

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중입니다');
});

//미들웨어란 요청을 받았을 때, 응답을 해주기까지 중간에서 처리하는 과정을 말함.
//request -> 정보를 추출하기 위해 하는 모든 활동들? 로그인을 했는지 진실 여부 판단 -> 정보를 데이터베이스에서 뽑아서 원하는 형식 -> 응답
