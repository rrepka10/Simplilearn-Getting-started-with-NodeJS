// Sample express code from lms.simplilearn.com Getting-started-with-NodeJS
// https://lms.simplilearn.com/courses/4236/Getting-started-with-NodeJS/syllabus

// https://www.simplilearn.com/learn-nodejs-basics-free-course-skillup 

// all API's are non blocking
// core modules: http, util, fs, url (parsing), querystring, stream, zlib

// A cluster is a thread library - thread example 
// var cluster = require('cluster');
// if (cluster.isWorker) { console.log('Child thread');} 
// else {console.log('parent thread'); cluster.ford(); cluster.fork();}

// Globalobjects: __dirname, __filename, exports, module, require 
// Error handling:  JavaScript, system, user-specific, assertion, uses try/catch

// streams: readable, writable, duplex, transform
// buffer:  var buff = Buffer.alloc(100);
// Domain intercepts unhandled errors: internal, external 
// dns: dns.resolve();  dns.lookup();
// debugger:  node inspect  test.js     (see help), .help to exit

/*
-------------------------------------------------
debugger
run, restart, r       Run the application or reconnect
kill                  Kill a running application or disconnect

cont, c               Resume execution
next, n               Continue to next line in current file
step, s               Step into, potentially entering a function
out, o                Step out, leaving the current function
backtrace, bt         Print the current backtrace
list                  Print the source around the current line where execution
                      is currently paused
setContextLineNumber  Set which lines to check for context
setBreakpoint, sb     Set a breakpoint
clearBreakpoint, cb   Clear a breakpoint
breakpoints           List all known breakpoints
breakOnException      Pause execution whenever an exception is thrown
breakOnUncaught       Pause execution whenever an exception isn't caught
breakOnNone           Don't pause on exceptions (this is the default)

watch(expr)           Start watching the given expression
unwatch(expr)         Stop watching an expression
unwatch(index)        Stop watching an expression at specific index from watch list
watchers              Print all watched expressions and their current values

exec(expr), p(expr), exec expr, p expr
                      Evaluate the expression and print the value
repl                  Enter a debug repl that works like exec

scripts               List application scripts that are currently loaded
scripts(true)         List all scripts (including node-internals)

profile               Start CPU profiling session.
profileEnd            Stop current CPU profiling session.
profiles              Array of completed CPU profiling sessions.
profiles[n].save(filepath = 'node.cpuprofile')
                      Save CPU profiling session to disk as JSON.

takeHeapSnapshot(filepath = 'node.heapsnapshot')
                      Take a heap snapshot and save to disk as JSON.
.exit  

-------------------------------------------------
express - allows for middleware,
	defines routing tables based on http methods & url
	dynamically renders html based on a template
	
-------------------------------------------------
Single Event loop -  event queue, operation completed, threaded pool
npm:  search.nodejs.org  - to find modules
package.json - nodejs metadata: npm init 
	reinstalling a required package will automatically add to the package.json file
*/


// npm init - first time only
// npm install --save express
// npm install --save uuid
// run using:  node ./index.js

const express = require('express');
const app = express();

//app.get('/', (req, res) => {
//    res.send('Hello World! - VS Code'));
//});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/api/users'));



app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});

app.get('/health', (req, res) => res.send('OK'));
