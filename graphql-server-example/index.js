const { ApolloServer, gql } = require('apollo-server');
const CategoryAPI= require('./datasource')
// // This is a (sample) collection of books we'll be able to query
// // the GraphQL server for.  A more complete example might fetch
// // from an existing data source like a REST API or database.
// let books = [
//   {
//     title: 'Harry Potter and the Chamber of Secrets',
//     author: 'J.K. Rowling',
//   },
//   {
//     title: 'Jurassic Park',
//     author: 'Michael Crichton',
//   },
// ];

// // Type definitions define the "shape" of your data and specify
// // which ways the data can be fetched from the GraphQL server.
// const typeDefs = gql`
//   # Comments in GraphQL are defined with the hash (#) symbol.

//   # This "Book" type can be used in other type declarations.
//   type Book {
//     title: String
//     author: Author
//   }
  
//   type Author {
//     name: String
//     books: [Book]
//   }
//   type TypeName {
//     fieldA: String
//     fieldB: Boolean
//     fieldC: Int
//     fieldD: CustomType
//   }
  
//   type CustomType {
//     circular: TypeName
//   }

//   # The "Query" type is the root of all GraphQL queries.
//   # (A "Mutation" type will be covered later on.)
//   type Query {
//     getBooks: [Book]
//     getAuthors: [Author]
//   }
//   type Mutation {
//     addBook(title: String, author: String): Book
//   }
// `;

// // Resolvers define the technique for fetching the types in the
// // schema.  We'll retrieve books from the "books" array above.
// const resolvers = {
//   Query: {
//     getBooks: () => books,
//     getAuthors:()=> books
//   },


// };

const typeDefs=gql`
query{
  getCategories:[Category]
}

type Category{
    categoryId:ID!
    name: String!
  }
 

`

const resolvers={
  Query: {
    getCategories:(_,__,{dataSources})=>dataSources.categoryAPI.getCategories()
  }
}

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers, 
dataSources:()=>({
  categoryAPI: new CategoryAPI()
})});

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});