// baekjoon 5525

// You must write a problem number like the one above to run the test cases.
// Modifying the source code file or the src/input.txt file will restart the process.

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;

public class Main {
  public static void main(String[] args) throws Exception {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    int n = Integer.parseInt(br.readLine());
    int m = Integer.parseInt(br.readLine());

    char[] arr = new char[m];
    arr = br.readLine().toCharArray();

    int tempCount = 0;
    int answer = 0;
    for (int i = 1; i < m - 1; i++) {
      if (arr[i - 1] == 'I' && arr[i] == 'O' && arr[i + 1] == 'I') {
        tempCount++;
        i += 1;
        if (tempCount == n) {
          answer++;
          tempCount -= 1;
        }
        continue;
      }
      tempCount = 0;
    }
    System.out.println(answer);
  }
}