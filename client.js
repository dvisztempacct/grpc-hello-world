const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader')
const helloProto = grpc.loadPackageDefinition(protoLoader.loadSync('hello.proto', {/* options */})).hello

const messages = [
  { name: "bono" },
  { name: null },
  { name: undefined },
  { },
]

const client = new helloProto.Greeter('localhost:12345', grpc.credentials.createInsecure());

function pump() {
  if (messages.length) {
    const message = messages.shift()
    console.log('sending', message)
    try {
      client.sayHello(message, function(err, res) {
        console.log('got reply')
        if (err) console.error(err)
        else console.log("Greeting:", res);
        process.nextTick(pump)
      })
    } catch(e) {
      console.error('error sending message', e.message)
      process.nextTick(pump)
    }
  }
}

pump()
