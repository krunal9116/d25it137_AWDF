const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, headers: res.headers, body: data });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function runTests() {
  console.log("=== STARTING API TEST SUITE ===");

  try {
    // 1. GET /tasks
    console.log("\n1. Testing GET /tasks...");
    let res = await makeRequest({ host: 'localhost', port: 5000, path: '/tasks', method: 'GET' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 2. GET /tasks/1 (Valid ID)
    console.log("\n2. Testing GET /tasks/1...");
    res = await makeRequest({ host: 'localhost', port: 5000, path: '/tasks/1', method: 'GET' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 3. POST /tasks without Content-Type header (Supplementary)
    console.log("\n3. Testing POST /tasks without Content-Type header (Expected 400)...");
    res = await makeRequest({
      host: 'localhost',
      port: 5000,
      path: '/tasks',
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }
    }, 'raw string');
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 4. POST /tasks with application/json (Valid creation)
    console.log("\n4. Testing POST /tasks (Create Task)...");
    const newTask = JSON.stringify({ title: 'Complete Practical 4 Assignment', completed: false });
    res = await makeRequest({
      host: 'localhost',
      port: 5000,
      path: '/tasks',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(newTask) }
    }, newTask);
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 5. PUT /tasks/4 (Update Task)
    console.log("\n5. Testing PUT /tasks/4 (Update Task)...");
    const updateTask = JSON.stringify({ completed: true });
    res = await makeRequest({
      host: 'localhost',
      port: 5000,
      path: '/tasks/4',
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(updateTask) }
    }, updateTask);
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 6. DELETE /tasks/2 (Delete Task)
    console.log("\n6. Testing DELETE /tasks/2...");
    res = await makeRequest({ host: 'localhost', port: 5000, path: '/tasks/2', method: 'DELETE' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 7. Route-specific ID validation check GET /tasks/abc (Expected 400)
    console.log("\n7. Testing GET /tasks/abc (Invalid ID parameter - Expected 400)...");
    res = await makeRequest({ host: 'localhost', port: 5000, path: '/tasks/abc', method: 'GET' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 8. 404 Handler test for undefined route (Expected 404)
    console.log("\n8. Testing GET /invalid-route (Expected 404)...");
    res = await makeRequest({ host: 'localhost', port: 5000, path: '/invalid-route', method: 'GET' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    // 9. Global Error Handler test (Expected 500 without stack trace leaks)
    console.log("\n9. Testing GET /cause-error (Global error handler - Expected 500)...");
    res = await makeRequest({ host: 'localhost', port: 5000, path: '/cause-error', method: 'GET' });
    console.log(`Status: ${res.status}`);
    console.log("Response:", res.body);

    console.log("\n=== ALL TESTS COMPLETED SUCCESSFULLY ===");
    process.exit(0);
  } catch (err) {
    console.error("Test execution error:", err);
    process.exit(1);
  }
}

runTests();
