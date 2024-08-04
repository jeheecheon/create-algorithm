// baekjoon 5525

// You must write a problem number like the one above to run the test cases.
// Modifying the source code file or the src/input.txt file will restart the process.

import java.io.*

fun main() {
    val br = BufferedReader(InputStreamReader(System.`in`))
    val n = br.readLine().toInt()
    val m = br.readLine().toInt()
    val c = br.readLine().toCharArray()

    var cnt = 0
    var res = 0
    var i = 1

    while (i < m - 1) {
        if (c[i - 1] == 'I' && c[i] == 'O' && c[i + 1] == 'I') {
            cnt++
            i++
        } else {
            cnt = 0
        }

        if (cnt >= n) {
            res++
        }
        i++
    }
    println(res)
}
