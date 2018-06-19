# Node's "grpc" and "@grpc/proto-loader" packages

Running client reveals weaknesses in the older version of protobufjs used by default by grpc-node (simply "grpc" on npm.)

Here is our `sayHello` RPC implementation:

```
function sayHello(call, callback) {
  console.log('got hello', call.request)
  const message = 'name' in call.request
  ? "hello " + call.request.name
  : "uhhhh...."
  callback(null, { message })
}
```

With the above implementation, we should expect that when we omit our optional
field `name` that we should receive `{message:"uhhhh...."}` back from the
server.

Here are the messages we're going to send. I've included a few intuitive
representations of omission in Javascript:

```
const messages = [
  { name: "bono" },
  { name: null },
  { name: undefined },
  { },
]
```

Let's run our client and see what happens:

```
donviszneki@Lilys-MBP grpc-hello-world$ node client.js
sending { name: 'bono' }
got reply
Greeting: { message: 'hello bono' }
sending { name: null }
error sending message Illegal value for Message.Field .hello.HelloRequest.name of type string: object (proto3 field without field presence cannot be null)
sending { name: undefined }
got reply
Greeting: { message: 'hello ' }
sending {}
got reply
Greeting: { message: 'hello ' }
```

We never got `{message:"uhhhh...."}`! So what happened? Somehow, any way we try
to omit the `name` field, we either got an error, or sent a blank string.

This can, of course, be fixed by using a newer version of protobufjs. Check out
this repo for an example of use. To see an example of how to convert to using
the newer version, see this diff:

https://github.com/dvisztempacct/grpc-hello-world/commit/37e80029dfd94e5aaa7e95e0406249a917344bd4
