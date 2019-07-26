const {ApolloServer ,gql} = require('apollo-server')
const request=require('request-promise')

const typeDefs = gql`
    type Category{
        categoryId:Int
        name:String
        types:[CategoryType]
    }

    type Transaction{
        transactionId:Int!
        transactionDate: String!
        sum: Int!
        remarks: String
        typeId:Int!
    }
    type CategoryType{
        typeId:Int!
        name:String!
        description:String
        categoryId:Int!
    }
    type Response{
        text:String
    }
   

    type Query{
        getCategories:[Category],
        getTransactions:[Transaction],
        getTransactionById(transactionId:Int!):Transaction,
        getCategoryTypeById(typeId:Int!):CategoryType,
        getCategoryTypes:[CategoryType]
    }

    type Mutation {
        postTransaction(sum:Int,remarks:String,typeId:Int,transactionDate:String):Transaction,
        postCategoryType(name:String!,description:String,categoryId:Int!):CategoryType,
        updateCategoryType(typeId:Int!,name:String!,description:String,categoryId:Int!):CategoryType,
        deleteCategoryType(typeId:Int!):Response
    }

`

const resolvers={
    Query:{
        getCategories: ()=>{
            return request('http://localhost:8080/Categories',{method:'GET', json:true}).then((response)=>{
                console.log(response)
                return response
            })
        },
        getTransactions: ()=>{
            return request('http://localhost:8080/getTransactions',{method:'GET', json:true}).then((response)=>{
                console.log(response)
                return response
            })
        },
        getTransactionById:async (parent,args,context,info)=>{
            console.log(args.transactionId)
            const response = await request(`http://localhost:8080/getTransaction/`+args.transactionId, { method: 'GET', json: true });
            console.log(response);
            return response;
        },
       getCategoryTypeById:async (parent,args,context,info)=>{
            console.log(args.typeId)
            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'GET', json: true });
            console.log(response);
            return response;
        },
        getCategoryTypes: ()=>{
            return request('http://localhost:8080/CategoryTypes',{method:'GET', json:true}).then((response)=>{
                console.log(response)
                return response
            })
        },
    },
    Mutation: {
        postTransaction: async(parent,args,context,info)=>{
            console.log(args)
            const response = await request(`http://localhost:8080/Transaction/`, { method: 'POST', json: true , body:args});
            console.log(response);
            return response;
        },
        postCategoryType: async(parent,args,context,info)=>{
            console.log(args)
            const response = await request(`http://localhost:8080/CategoryType/`, { method: 'POST', json: true , body:args});
            console.log(response);
            return response;
        },
        updateCategoryType: async(parent,args,context,info)=>{
            console.log(args)

            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'PUT', json: true ,
                body:{name:args.name,description:args.description,categoryId:args.categoryId}});
            console.log(response);
            return response;
        },
        deleteCategoryType: async (parent,args,context,info)=>{
            console.log(args.typeId)
            const response = await request(`http://localhost:8080/CategoryType/`+args.typeId, { method: 'DELETE', json: true });
            console.log(response);
            return {text:response};
        },
    },
    
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url})=>{
    console.log(`listening on port ${url}`)
})









































// type Category{
//     categoryId:ID!
//     name:String!
//     types:[CategoryType]
// }

// type Transaction{
//     transactionId:ID!
//     transactionDate: String!
//     sum: INT!
//     remarks: String
//     type:CategoryType
// }
// type CategoryType{
//     typeId:ID!
//     name:String!
//     description:String
//     category:Category
//     transactions:[Transaction]
// }