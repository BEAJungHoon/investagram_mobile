# investagram_mobile

 Visual Studio 무료버전을 사용 ##

1. 프로잭트 실행전 node.js / npm 최신버전 또는 추천버전 다운로드
2. node.js / npm 다운로드가 완료 후 cmd에서 npm install expo-cli --global 명령어를 실행 expo 다운로드 / expo 홈페이지에서도 다운로드 가능
3. expo 다운로드가 완료되면 커맨드창에서 npm run ios /npm run android 또는 expo start명령어로 expo실행(현 프로젝트는 아이폰 기반으로 개발)
4. module에러로 빨간화면이 나올 경우 화면 맨 상위에 있는 npm으로 modules다운로드
    ex) jwt-decode(cmd: npm install jwt-decode)
            axios(cmd: npm install axios) 등등..
5. 모든 modules가 다운로드 완료되었으면 expo(cmd: expo start)로 재실행

 시연전에 간단한 업데이트 예정 ##
1. 로그인화면에 아이콘 삽입
2. 로그인창 Sign up을 눌렀을시 Sign up페이지로 이동x

 현재 핸드폰 expo 실행시 로그인 해도 로그인이 되지 않음, 이 외엔 전부 작동 ##
 노트북 또는 데스크탑 virtual machine phone 에서는 작동 ##
