// baekjoon 5525

// You must write a problem number like the one above to run the test cases.
// Modifying the source code file or the src/input.txt file will restart the process.

#include <iostream>

using namespace std;

int N, M;
string str;

int solve(bool shouldI, int i)
{
    if (i >= str.length() || (shouldI && str[i] == 'O') || (!shouldI && str[i] == 'I'))
        return 0;

    return solve(!shouldI, i + 1) + 1;
}

int main(void)
{
    cin.tie(0)->tie(0)->sync_with_stdio(0);

    cin >> N >> M >> str;

    int sum = 0;
    for (int i = 0; i < str.length();) {

        if (str[i] != 'I')
            ++i;

        int len = solve(true, i);
        i += len;

        if (str[i - 1] == 'O') {
            --len;
        }

        len /= 2;

        if (len >= N) {
            sum += len - N + 1;
        }
    }

    cout << sum;
}