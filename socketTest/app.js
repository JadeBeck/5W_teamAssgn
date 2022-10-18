const express = require("express");  //express 앱을 생성
const { createServer } = require("http");   //http 모듈로 서버 생성

const app = express();  //express 앱을 생성. app객체는 express로 기존처럼 API를 개발하거나 프엔 파일을 서빙하는 용도로 사용할 수 있음.
const http = createServer(app);  //http 모듈로 서버 생성


const io = require("socket.io")(http, {  //3000자리에 http 서버 객체 삽입해서 express와 socket.io를 동시에 사용할 수 있게 해줌. 그리고 맨 밑에 http.listen(3000~으로 포트 열어줌)
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {  //io객체도 기존처럼 클라와 데이터를 주고 받는 용도로 사용할 수 있음.
    console.log("새로운 소켓이 연결됐어요!");  //특정 사용에게 소켓이 전달되면,  "새로운~"이걸 로그에 하나 찍고!

    socket.on("message", (data) => {  //①의 메세지(fro.client) 받아서
        console.log(data);  //그 ①의 메세지를 출력함
    });

    socket.emit("customEventName", "this is custom event data");  //②서버에서 커스텀 이벤트로 데이터 발행하기(사용자가 서버에 접속했을 때, customEventName에 해당하는 커스텀 이벤트가 전달됨): socket.emit("이벤트 이름", "데이터") 이렇게 함수를 호출. customEventName이라는 이름의 특정 이벤트로, this is custom event data라는 특정 데이터를 브라우저에 보낼 수 있음.
});

http.listen(3000, () => {
    console.log("서버가 요청을 받을 준비가 됐어요");
});