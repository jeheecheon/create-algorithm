// baekjoon 5525

#include <stdio.h>

int N, M;
char S[1000001];
int sol;
int flag;

int Check(int idx)
{
    int i = idx;
    int n = N;
    for (;;)
    {
        if (S[i+1] == 'O' && S[i+2] == 'I')
        {
            n--;
            i += 2;
            if (n == 0) break;
        }
        else
        {
            break;
        }
    }
    if (n == 0)
    {
        sol++;
        flag = 1;
    }
    else flag = 0;

    return i;
}

void Solve(void)
{
    int i;
    flag = 0;
    for (i = 0; i < M; i++)
    {
        if (S[i] == 'I')
        {
            i = Check(i);
        }
        if (flag)
        {
            while (S[i+1] == 'O' && S[i+2] == 'I')
            {
                sol++;
                i += 2;
            }
            flag = 0;
        }
    }
}

void InputData(void)
{
    scanf("%d", &N);
    scanf("%d", &M);
    scanf("%s", S);
}
void OutputData(void)
{
    printf("%d\n", sol);
}
int main(void)
{
    InputData();
    Solve();
    OutputData();

	return 0;
}