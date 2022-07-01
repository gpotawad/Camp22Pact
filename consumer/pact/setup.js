const path = require('path');
const Pact = require('@pact-foundation/pact').Pact;
const Publisher = require('@pact-foundation/pact').Publisher
global.port = 8080;
global.provider = new Pact({
    cors: true,
    port: global.port,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    loglevel: 'debug',
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    pactfileWriteMode: 'update',
    consumer: 'todo-consumer',
    provider: 'todo-provider',
    host: 'localhost'
});
const opts = {
    publishVerificationResult: true, //recommended to only publish from CI by setting the value to `process.env.CI === 'true'`
};

new Publisher(opts)
    .publishPacts()
    .then(() => {
        console.log("published");
    })