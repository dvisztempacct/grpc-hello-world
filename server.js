const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')
const helloProto = grpc.loadPackageDefinition(protoLoader.loadSync('hello.proto', {/* options */})).hello

function sayHello(call, callback) {
  console.log('got hello', call.request)
  const message = 'name' in call.request
  ? "hello " + call.request.name
  : "uhhhh...."
  callback(null, { message })
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
