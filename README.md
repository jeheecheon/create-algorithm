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
- JavaScript (partially unsupported - real-time test case testing unavailable)
- TypeScript (partially unsupported - real-time test case testing unavailable)

## Preview
![example](https://github.com/user-attachments/assets/ae39e704-9b58-43ef-b75a-41f0c0e44d4e)

## Installation Instructions
1. Install npm. Installation link: [Nodejs](https://nodejs.org/en)
2. In the terminal, navigate to the desired path for the project folder and enter the following command:
npm create algorithm@latest
3. Open the generated project folder 'algorithm' with your preferred IDE.

# Usage Instructions
## Automatic Re-execution / Example Input Auto-grading
These commands automatically execute the code and test cases upon modification.  
From the algorithm project folder, select and enter the command for your language:
- `npm run js`
- `npm run ts`
- `npm run cpp`
 
## Source Code
Enter your code in the source code file for your preferred language at the following paths.
_Ensure to enter the appropriate command for the language you are using to enable automatic re-execution._
- cpp: `src/main.cpp`
- javascript: `src/main.js`
- typescript: `src/main.ts`

## Custom Test Case
For custom example input, enter the input in src/input.txt. The process will automatically restart upon modification.

If you are a C++ user and do not have the GCC compiler installed, please install it from [MSYS2](https://www.msys2.org/).

# License
This project is licensed under the MIT License.
