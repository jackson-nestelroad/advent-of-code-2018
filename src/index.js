// import http from 'http'
import Result from './classes/result'
import Solution from './days/1/A'

const PORT = 4000;

let startTime = new Date();
let solution = Solution.solve();
let endTime = new Date();

let result = new Result(solution, `${endTime - startTime}ms`);

console.log(result);

// http.createServer((req, res) => {
//   res.writeHead(200, {'Content-Type': 'application/json'});
//   res.end(JSON.stringify(result.getJSON()));
// }).listen(PORT, '127.0.0.1');

// console.log(`Server running at http://127.0.0.1:${PORT}/`);