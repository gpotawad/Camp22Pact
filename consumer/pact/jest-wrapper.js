beforeAll((done) => {
    global.provider.setup().then(() => done());
});

afterEach((done) => {
    global.provider.verify().then(() => done());
});

afterAll((done) => {
    global.provider.finalize().then(() => done());
});