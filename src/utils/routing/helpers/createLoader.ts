import { ApolloClient, QueryOptions } from "@apollo/client";
import { LoaderFunctionArgs } from "react-router-dom";

export function createLoader<TQueryVars>(
  createQueryOptions: (args: LoaderFunctionArgs) => QueryOptions<TQueryVars>
): (
  queryClient: ApolloClient<object>
) => (args: LoaderFunctionArgs) => Promise<any>;

export function createLoader<TQueryVars, TProps>(
  createQueryOptions: (
    args: LoaderFunctionArgs,
    props: TProps
  ) => QueryOptions<TQueryVars>
): (
  queryClient: ApolloClient<object>,
  props: TProps
) => (args: LoaderFunctionArgs) => Promise<any>;

export function createLoader<TQueryVars, TProps>(
  createQueryOptions: (
    args: LoaderFunctionArgs,
    props?: TProps
  ) => QueryOptions<TQueryVars>
) {
  return (queryClient: ApolloClient<object>, props: TProps) =>
    async (args: LoaderFunctionArgs) => {
      const queryOptions = props
        ? createQueryOptions(args, props)
        : createQueryOptions(args);
      return (await queryClient.query(queryOptions)).data;
    };
}
