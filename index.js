// import the server and start it!
const server = require('./api/server')

//launch the server
server.listen(9000, () => {
   console.log(`Server started on http://localhost:9000`)
})

// cannot run http :9000/hello-world b/c I do not have httpie installed - need brew or macWorld first to install httpie for some reason