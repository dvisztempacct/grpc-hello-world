const grpc = require('grpc');
const helloProto = grpc.load("hello.proto").hello;

function main() {
  const client = new helloProto.Greeter('localhost:12345', grpc.credentials.createInsecure());
  console.log('saying hello')
  client.sayHello({name: "Donald", mood:'Happy'}, function(err, res) {
    console.log('got reply')
    if (err) console.error(err)
    else console.log("Greeting:", res);
  })
  console.log('said hello')
}

main()
