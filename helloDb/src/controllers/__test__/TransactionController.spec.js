const request = require('supertest');


describe(' Transactions test',()=>{
let app;

beforeEach(()=>{
    app = require('../../app');
})
    const transaction1={
            "TransactionDate": 1563808820440,
            "Sum": 213,
            "Remarks": "World"
        }
    
    
    it(' should get all transactions', async ()=>{
        await request(app)
        .get('/getTransactions')
        .then((res)=>{
            expect(res.status).toEqual(200)
            expect(res.text).toBeDefined()
            expect(JSON.parse(res.text)).toHaveLength(0)
            expect(JSON.parse(res.text)).toEqual([])
        })
    })
    
    it(' should get  transaction 1 ', async ()=>{
        await request(app)
        .get('/getTransaction/1')
        .then((res)=>{
            expect(res.status).toEqual(400)
            // expect(res.text).toBeDefined(null)

        })
    })

    it('should create a transaction', async()=>{

        const newTransaction={
            "Sum": 22,
            "Remarks": "ceva",
            "CategoryId": 1,
        }

        await request(app)
        .post('/Transaction')
        .send(newTransaction)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(200)
            const ResponseWithModifiedDateFormat=Object.assign({},JSON.parse(res.text),{TransactionDate:new Date(JSON.parse(res.text).TransactionDate).toDateString()})
            expect(ResponseWithModifiedDateFormat).toStrictEqual(Object.assign({},newTransaction,{TransactionDate:new Date().toDateString(),TransactionId:1}))
        })
    })

    it('should return an error', async()=>{

        const newTransaction={
            "Sum": 22,
            "Remarks": "ceva",
            "CategoryId": 100,
        }

        await request(app)
        .post('/Transaction')
        .send(newTransaction)
        .set('Accept','application/json')
        .then((res)=>{
            expect(res.status).toBe(500)
        })
    })


    
    




})