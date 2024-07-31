# create-algorithm

알고리즘 코드, 예제입력 수정 시 자동으로 재실행되도록 세팅된 템플렛입니다.
알고리즘 문제를 세팅없이 곧바로 시작을 도와줍니다. 

## 주요 기능
- js, ts 문법+스타일 검사 (prettier, eslint)
- 파일 변화 추적 및 재실행 (nodemon)
- 예제 입력 파일 변화 시에도 재실행

## 설치 방법
1. npm 설치 안 되어있는 경우 [Nodejs](https://nodejs.org/en) 설치해주세요.

2. 원하는 경로에서 아래 커맨드 입력해주세요.
   `npm create algorithm`

4. 위 커맨드를 통해 생성된 프로젝트 폴더 'algorithm' 을 주로 사용하시는 IDE 로 오픈 후 사용해주세요.

# 사용 방법
## 소스코드 입력
원하는 언어에 따라 아래 경로의 소스코드 파일을 선택 후 코드를 입력하세요.  
- javascript: `src/main.js`
- typescript: `src/main.ts`
- cpp: `src/main.cpp`

## 커맨드
사용하시는 언어에 맞는 커맨드를 입력해주시면 코드/입력파일 변화에 따라 프로세스가 재시작됩니다.  
- `npm run js`
- `npm run ts`
- `npm run cpp`  

c++ 사용자는 gcc 컴파일러가 설치되어 있지 않다면 [MSYS2](https://www.msys2.org/) 에서 설치해주세요.

## 예제 입력
예제 입력은 `src/input.txt` 에 입력해주시면 됩니다.  
벡준 문제의 예제 입력을 그대로 복사&붙여넣기 해주세요.

# License
This project is licensed under the MIT License.
