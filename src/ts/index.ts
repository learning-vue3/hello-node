// 对单人或者多人打招呼
function greet(name: string | string[]): string | string[] {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}

// 单个问候语
const greeting = greet('Petter') as string
console.log(greeting) // Welcome, Petter!

// 多个问候语
const greetings = greet(['Petter', 'Tom', 'Jimmy']) as string[]
console.log(greetings) // [ 'Welcome, Petter!', 'Welcome, Tom!', 'Welcome, Jimmy!' ]
