# baekjoon 5525

# You must write a problem number like the one above to run the test cases.
# Modifying the source code file or the src/input.txt file will restart the process.

import sys
input=sys.stdin.readline
n=int(input())
m=int(input())
s=input()
answer=0
i=0
c=0
while i<m-1:
    if s[i:i+3]=='IOI':
        i+=2
        c+=1
        if c==n:
            answer+=1
            c-=1
    else:
        i+=1
        c=0
print(answer)