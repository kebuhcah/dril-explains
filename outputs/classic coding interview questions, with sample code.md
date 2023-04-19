THREAD: diving deep into coder's twisted hellscape of sublime interview questions. Prepare for blasts of knowledge that'll make ur head spin

1) FIZZBUZZ - cruel pranks conjured by unhinged programmers. If divisible by 3 & 5, tweet "FizzBuzz"; if not, Wall Punch. Chk this gem:
```
for i in range(1, 101):
  if i % 15 == 0:
    print("FizzBuzz")
  elif i % 3 == 0:
    print("Fizz")
  elif i % 5 == 0:
    print("Buzz")
  else:
    print(i)
```

2) REVERSE STRINGS - Turn innocent phrases into twisted chaos lines. "hello world"–> "dlrow olleh". sickos use two approaches: 
Approach 1:
``` 
def rev_str(s):
  return s[::-1]
```   
Approach 2:
```
def rev_str(s):
  return "".join(reversed(s))
```

3) PALINDROME DEMON - word or str8 up letter combo reads same 4wards and BackWrards. These dark incantations reveal truth:
```
def is_palindrome(s):
  return s == s[::-1]
```

4) FIBONACCI? More like FIB-IN-YOUR-FACE-i. The sequence ruining lives & crushing dreams. Cursed math, fib(n) = fib(n-1) + fib(n-2)
```
def fibonacci(n):
  if n <= 1:
    return n
  else:
    return fibonacci(n-1) + fibonacci(n-2)
```

5) FACTORIAL FUN-TIME: Multiply all integers <= n. Screams, "recursive!", but here's a weak ITERATIVE novice version, 4 cowards.
```
def factorial(n):
  result = 1
  for i in range(2, n+1):
    result *= i
  return result
```

6) BINARY SEARCH: Divide & conquer ur sanity by seeking deviously hidden target in a gnarled list. classic Performance Anxiety.
```
def binary_search(arr, target):
  left, right = 0, len(arr) - 1
  while left <= right:
    mid = left + (right - left) // 2
    if arr[mid] == target:
      return mid
    elif arr[mid] < target:
      left = mid + 1
    else:
      right = mid - 1
  return -1
```
Welcome to the wild world of code interrogation; where Knowledge is Power & Power is terrifyingly corrupt. never stop learning, gamers