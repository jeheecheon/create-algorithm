# create-algorithm
Project Generator  
TLDR: Automatically re-execute algorithm problem source code / Automatically grade example input and output

## Key Features
- Automatic validation of example test cases
- Track changes in source code files and automatically re-execute (nodemon)
- Automatically re-execute the process when the custom test case input file (src/input.txt) is modified
- JavaScript and TypeScript syntax + style checking and automatic formatting (prettier, eslint)
  
## Supported Languages:
- C++
- C#
- C
- Python
- Java
- Kotlin
- JavaScript (partially unsupported - real-time test case testing unavailable)
- TypeScript (partially unsupported - real-time test case testing unavailable)

## Preview
![example](https://github.com/user-attachments/assets/ef653ec8-cbaf-4e85-a958-ff9a492fd459)

## Installation Instructions
1. Install npm. Installation link: [Nodejs](https://nodejs.org/en)
2. In the terminal, navigate to the desired path for the project folder and enter the following command:  
`npm create algorithm@latest`
3. Open the generated project folder `algorithm` with your preferred IDE.

# Usage Instructions
## Commands
These commands automatically execute the code and test cases upon modification.  
From the algorithm project folder, select and enter the command for your language:
- `npm run cpp`
- `npm run cs`
- `npm run c`
- `npm run py`
- `npm run java`
- `npm run kotlin`
- `npm run js`
- `npm run ts`

If you are a C++ user and do not have the GCC compiler installed, please install it from [MSYS2](https://www.msys2.org/).
 
## Source Code
Enter your code in the source code file for your preferred language at the following paths.
_Ensure to enter the appropriate command for the language you are using to enable automatic re-execution._
- C++: `src/cpp/main.cpp`
- C#: `src/cs/Program.cs`
- C: `src/c/main.c`
- Python: `src/py/main.py`
- Java: `src/java/Main.java`
- Kotlin: `src/kt/Main.kt`
- Javascript: `src/js/main.js`
- Typescript: `src/ts/main.ts`

## Enable automatic re-grading feature
To enable the automatic re-grading feature, you must enter  
`// baekjoon problem_number` at the very top of the source code. Please see the preview.  

Currently, only [boj](https://www.acmicpc.net/) is supported for this feature. Other platforms are not supported at this time. The following identifiers are treated the same:
- [boj](https://www.acmicpc.net/): (boj | baekjoon | 벡준 | acmicpc)

## Custom Test Case
You can also add custom test case for each run! Enter your input in `src/input.txt` file. The process will automatically restart upon modification.

# License
This project is licensed under the MIT License.
