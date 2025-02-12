const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList } = require("graphql");
const Booking = require("../models/Booking");

const BookingType = new GraphQLObjectType({
    name: "Booking",
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        destination: { type: GraphQLString },
        date: { type: GraphQLString },
    }
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        bookings: {
            type: new GraphQLList(BookingType),
            resolve() {
                return Booking.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBooking: {
            type: BookingType,
            args: {
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                destination: { type: GraphQLString },
                date: { type: GraphQLString },
            },
            resolve(parent, args) {
                const booking = new Booking(args);
                return booking.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
