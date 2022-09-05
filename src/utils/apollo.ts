import { ApolloClient, HttpLink, InMemoryCache, from, Reference, FieldPolicy } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";
import { CONSTS } from "src/utils";

let apiClientUri = CONSTS.apiEndpoint + '/graphql';


const httpLink = new HttpLink({
    uri: apiClientUri,
    credentials: "include"
});

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
    }
});


const retryLink = new RetryLink({
    delay: {
        initial: 100,
        max: 2000,
        jitter: true,
    },
    attempts: {
        max: 5,
        retryIf: (error, operation) => {
            const doNotRetryCodes = [500, 400];
            return !!error && !doNotRetryCodes.includes(error.statusCode);
        },
    },
});


export const apolloClient = new ApolloClient({
    connectToDevTools: true,
    link: from([
        retryLink,
        errorLink,
        httpLink
    ]),
    cache: new InMemoryCache({
        possibleTypes: {
            BaseUser: ['User', 'MyProfile']
        },
        typePolicies: {
            Query: {
                fields: {
                    getFeed: offsetLimitPagination(['sortBy', 'tag'])
                },
            },
        },
    })
});

type KeyArgs = FieldPolicy<any>["keyArgs"];

function offsetLimitPagination<T = Reference>(
    keyArgs: KeyArgs = false,
): FieldPolicy<T[]> {
    return {
        keyArgs,
        merge(existing, incoming, { args }) {
            const merged = existing ? existing.slice(0) : [];

            if (args) {
                // Assume an skip of 0 if args.skip omitted.
                const { skip = 0 } = args;
                for (let i = 0; i < incoming.length; ++i) {
                    merged[skip + i] = incoming[i];
                }
            } else {
                // It's unusual (probably a mistake) for a paginated field not
                // to receive any arguments, so you might prefer to throw an
                // exception here, instead of recovering by appending incoming
                // onto the existing array.
                merged.push.apply(merged, [...incoming]);
            }
            return merged;
        },
    };
}