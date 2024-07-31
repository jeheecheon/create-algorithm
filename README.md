# create-backjoon

백준 알고리즘 문제를 세팅없이 곧바로 시작할 수 있는 템플릿입니다.  
코드, 예제입력 수정 시 자동 재실행.

## 주요 기능
- 문법+스타일 검사 (prettier, eslint).
- 파일 변화 추적 및 재실행 (nodemon).
- 예제 입력 파일 변화 시에도 재실행.

## 설치 방법
1. npm 설치 안 되어있는 경우 [Nodejs](https://nodejs.org/en) 설치.

2. 터미널을 켜고 아래 명령어로 yarn package manager 설치.  
   `npm install --global yarn`  

3. 원하는 경로에서 아래 커맨드로 템플릿 설치 및 다운로드.  
   backjoon 폴더가 생성됩니다.  
   `yarn create backjoon`

4. `cd backjoon` 으로 설치된 폴더로 경로 이동.

5. 마지막으로 아래 커맨드 입력.  
   `yarn install`

# 사용 방법
## 소스코드 입력
원하는 언어에 따라 아래 파일 중 선택 후 코딩.

- javascript: `src/main.js`
- typescript: `src/main.ts`
- cpp: `src/main.cpp`

## 커맨드

사용하시는 언어에 맞는 커맨드를 입력해주시면 코드/입력파일 변화에 따라 프로세스가 재시작됩니다.

- `yarn run js`
- `yarn run ts`
- `yarn run cpp`

## 예제 입력
`src/input.txt` 에 입력해주시면 됩니다.  
벡준 문제의 예제 입력을 그대로 복사&붙여넣기 해주세요

# License
This project is licensed under the MIT License.
