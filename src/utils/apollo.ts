import { ApolloClient, HttpLink, InMemoryCache, from, Reference, FieldPolicy } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RetryLink } from "@apollo/client/link/retry";

let apiClientUri = "https://lightning-landscape.stellate.sh";


const httpLink = new HttpLink({
    uri: apiClientUri,
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
        typePolicies: {
            Query: {
                fields: {
                    projects: offsetLimitPagination(['_filter'])
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
                // Assume an _page of 0 if args._page omitted.
                const { _page = 1, _page_size = 20 } = args;
                const offset = (_page - 1) * _page_size;
                for (let i = 0; i < incoming.length; ++i) {
                    merged[offset + i] = incoming[i];
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