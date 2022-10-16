const { readFileSync } = require('fs')
const { resolve } = require('path')
const { createServer } = require('http')

/**
 * 判断是否 ESM 文件
 */
function isESM(url) {
  return String(url).endsWith('mjs')
}

/**
 * 获取 MIME Type 信息
 * @tips `.mjs` 和 `.js` 一样，都使用 JavaScript 的 MIME Type
 */
function mimeType(url) {
  return isESM(url) ? 'application/javascript' : 'text/html'
}

/**
 * 获取入口文件
 * @returns 存放在本地的文件路径
 */
function entryFile(url) {
  const file = isESM(url) ? `../src/esm${url}` : './index.html'
  return resolve(__dirname, file)
}

/**
 * 创建 HTTP 服务
 */
const app = createServer((request, response) => {
  // 获取请求时的相对路径，如网页路径、网页里的 JS 文件路径等
  const { url } = request

  // 转换成对应的本地文件路径并读取其内容
  const entry = entryFile(url)
  const data = readFileSync(entry, 'utf-8')

  // 需要设置正确的响应头信息，浏览器才可以正确响应
  response.writeHead(200, { 'Content-Type': mimeType(url) })
  response.end(data)
})

/**
 * 在指定的端口号启动本地服务
 */
const port = 8080
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at:`)
  console.log()
  console.log(`  ➜  Local:  http://localhost:${port}/`)
  console.log()
})
