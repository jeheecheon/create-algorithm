// baekjoon 5525

using System;

int n = int.Parse(Console.ReadLine());
int m = int.Parse(Console.ReadLine());
string s = Console.ReadLine();

int answer = 0;
for (int i = 0; i < m - 2 * n; i++)
{
    if (s[i] == 'O') continue;

    int cnt = 0;
    while (i < m - 2 && s[i + 1] == 'O' && s[i + 2] == 'I')
    {
        cnt++;
        if (cnt == n)
        {
            answer++;
            cnt--;
        }

        i += 2;
    }
}

Console.WriteLine(answer);
