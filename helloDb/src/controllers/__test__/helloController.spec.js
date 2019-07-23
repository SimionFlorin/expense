const request = require('supertest');
const app = require('../../app');

describe('[getHostConnections]', () => {
    beforeEach(() => {
    });

    it('should return hello', async () => {
        await request(app)
            .get('/')
            .then((res) => {
                expect(res.status).toEqual(200);
                expect(res.text).toEqual('Hello World');
            });
    });
});
