import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

let apiClientUri = '/.netlify/functions/graphql';

if (process.env.REACT_APP_API_END_POINT)
    apiClientUri = process.env.REACT_APP_API_END_POINT

const httpLink = new HttpLink({
    uri: apiClientUri
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );

    if (networkError) console.log(`[Network error]: ${networkError}`);
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
    link: from([
        retryLink,
        errorLink,
        httpLink
    ]),
    cache: new InMemoryCache()
});
