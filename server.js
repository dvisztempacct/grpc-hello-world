const grpc = require('grpc');
const helloProto = grpc.load('hello.proto').hello;

function sayHello(call, callback) {
  console.log('got hello', call.request)
  callback(null, {message: "hello " + call.request.name, mood: call.request.mood})
  console.log('replied')
}

function main() {
  const server = new grpc.Server;
  server.addService(helloProto.Greeter.service, {
    sayHello
  })
  console.log('binding')
  server.bind('127.0.0.1:12345', grpc.ServerCredentials.createInsecure());
  console.log('bound')
  server.start()
  console.log('started')
}

main();
