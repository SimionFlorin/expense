const {ApolloServer, gql} = require('apollo-server');
const request = require('request-promise');

const typeDefs = gql`

    type Todo{
        id: Int,
        text: String,
        description: String,
        date: String
    }

    type Query {
        hello: String,
        todos: [Todo]
    }

    type Mutation{
        todo(text: String!, date: String): Todo
    }
`;

const resolvers = {
    Query: {
        hello: () => request('http://localhost:8080/', {method: 'GET'}).then(response => response),
        todos: async () => await request('http://localhost:8081/todo', {
            method: 'GET',
            json: true
        }).then(response => response)
    },
    Todo: {
        description: () => {
            console.log('this is called only when description is defined in query');
            return request('http://localhost:8080/', {method: 'GET'})
        },
    },

    Mutation: {
        todo: (_, {text, date}) => {
            return request('http://localhost:8081/todo', {method: 'POST', json: true, body: {text, date}});
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});
