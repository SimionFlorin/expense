const request = require('supertest')


describe(' CategoryController ',()=>{
let app

    beforeEach(()=>{
         app = require('../../app')
    })

    const defaultCategories=[
        {
            CategoryId:1,
            Name:'Income'
        },
        {
            CategoryId:2,
            Name:'Expense'
        }
    ]
    it(' should get Income and Expense categories', async ()=>{
        await request(app)
        .get('/Categories')
        .then((res)=>{

            expect(res.status).toBe(200)
            expect(JSON.parse(res.text)).toStrictEqual(defaultCategories)
        })

    })
})