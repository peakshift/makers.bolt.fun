import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  project?: Maybe<Array<Project>>;
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmVote: Vote;
  vote: Vote;
};


export type MutationConfirmVoteArgs = {
  payment_request: Scalars['String'];
  preimage: Scalars['String'];
};


export type MutationVoteArgs = {
  amount_in_sat: Scalars['Int'];
  project_id: Scalars['Int'];
};

export type Project = {
  __typename?: 'Project';
  category: Category;
  cover_image: Scalars['String'];
  id: Scalars['Int'];
  lightning_address: Scalars['String'];
  thumbnail_image: Scalars['String'];
  title: Scalars['String'];
  votes_count: Scalars['Int'];
  website: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allCategories: Array<Category>;
  allProjects: Array<Project>;
  getCategory: Category;
  getProject: Project;
  newProjects: Array<Maybe<Project>>;
  projectsByCategory: Array<Maybe<Project>>;
};


export type QueryAllProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCategoryArgs = {
  id: Scalars['Int'];
};


export type QueryGetProjectArgs = {
  id: Scalars['Int'];
};


export type QueryNewProjectsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryProjectsByCategoryArgs = {
  category_id: Scalars['Int'];
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type Vote = {
  __typename?: 'Vote';
  amount_in_sat: Scalars['Int'];
  id: Scalars['Int'];
  paid: Scalars['Boolean'];
  payment_hash: Scalars['String'];
  payment_request: Scalars['String'];
  project: Project;
};

export type AllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesQuery = {
  __typename?: 'Query',
  allCategories: Array<{ __typename?: 'Category', id: number, title: string }>
};

export type AllCategoriesProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllCategoriesProjectsQuery = {
  __typename?: 'Query',
  allCategories: Array<{ __typename?: 'Category', id: number, title: string, project?: Array<{ __typename?: 'Project', id: number, thumbnail_image: string, title: string, votes_count: number }> | null | undefined }>, newProjects: Array<{ __typename?: 'Project', id: number, title: string, thumbnail_image: string, votes_count: number, category: { __typename?: 'Category', title: string, id: number } }>
};

export type GetProjectQueryVariables = Exact<{
  getProjectId: Scalars['Int'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject: { __typename?: 'Project', id: number, cover_image: string, thumbnail_image: string, title: string, website: string, votes_count: number, category: { __typename?: 'Category', id: number, title: string } } };


export const AllCategoriesDocument = gql`
    query AllCategories {
  allCategories {
    id
    title
  }
}
    `;

/**
 * __useAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
}
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
}
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const AllCategoriesProjectsDocument = gql`
    query AllCategoriesProjects {
  allCategories {
    id
    title
    project {
      id
      thumbnail_image
      title
      votes_count
    }
  }
  newProjects {
    id
    title
    thumbnail_image
    votes_count
    category {
      title
      id
    }
  }
}
    `;

/**
 * __useAllCategoriesProjectsQuery__
 *
 * To run a query within a React component, call `useAllCategoriesProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllCategoriesProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllCategoriesProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllCategoriesProjectsQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesProjectsQuery, AllCategoriesProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AllCategoriesProjectsQuery, AllCategoriesProjectsQueryVariables>(AllCategoriesProjectsDocument, options);
}
export function useAllCategoriesProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesProjectsQuery, AllCategoriesProjectsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AllCategoriesProjectsQuery, AllCategoriesProjectsQueryVariables>(AllCategoriesProjectsDocument, options);
}
export type AllCategoriesProjectsQueryHookResult = ReturnType<typeof useAllCategoriesProjectsQuery>;
export type AllCategoriesProjectsLazyQueryHookResult = ReturnType<typeof useAllCategoriesProjectsLazyQuery>;
export type AllCategoriesProjectsQueryResult = Apollo.QueryResult<AllCategoriesProjectsQuery, AllCategoriesProjectsQueryVariables>;
export const GetProjectDocument = gql`
    query GetProject($getProjectId: Int!) {
  getProject(id: $getProjectId) {
    id
    cover_image
    thumbnail_image
    title
    website
    votes_count
    category {
      id
      title
    }
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      getProjectId: // value for 'getProjectId'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
}
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
}
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;