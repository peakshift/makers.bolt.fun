import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type Query = {
  __typename?: 'Query';
  backup: Maybe<Array<Maybe<Backup>>>;
  categories: Maybe<Array<Maybe<Categories>>>;
  categoryList: Maybe<Array<Maybe<CategoryList>>>;
  companies: Maybe<Array<Maybe<Companies>>>;
  funding: Maybe<Array<Maybe<Funding>>>;
  projects: Maybe<Array<Maybe<Projects>>>;
  stats: Maybe<Array<Maybe<Stats>>>;
  tags: Maybe<Array<Maybe<Tags>>>;
};


export type QueryBackupArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  assignedTo: InputMaybe<Scalars['String']>;
  categories: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categoriesCopy: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category: InputMaybe<Scalars['String']>;
  comment: InputMaybe<Scalars['String']>;
  companyName: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['String']>;
  dead: InputMaybe<Scalars['Boolean']>;
  description: InputMaybe<Scalars['String']>;
  endDate: InputMaybe<Scalars['String']>;
  forks: InputMaybe<Scalars['Float']>;
  id: InputMaybe<Scalars['String']>;
  language: InputMaybe<Scalars['String']>;
  license: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  openSource: InputMaybe<Scalars['String']>;
  projectProduct: InputMaybe<Scalars['String']>;
  repository: InputMaybe<Scalars['String']>;
  socialDiscord: InputMaybe<Scalars['String']>;
  socialLinkedIn: InputMaybe<Scalars['String']>;
  socialTwitter: InputMaybe<Scalars['String']>;
  stars: InputMaybe<Scalars['Float']>;
  status: InputMaybe<Scalars['String']>;
  subcategory: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  telegram: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['String']>;
  watchers: InputMaybe<Scalars['Float']>;
  website: InputMaybe<Scalars['String']>;
  websiteFunctionalLightningRelated: InputMaybe<Scalars['String']>;
  yearFounded: InputMaybe<Scalars['Float']>;
};


export type QueryCategoriesArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  description: InputMaybe<Scalars['String']>;
  example: InputMaybe<Scalars['String']>;
  featured: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  importedTableCopy: InputMaybe<Scalars['String']>;
  importedTableCopy2: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: InputMaybe<Scalars['String']>;
  projectProductFromFeatured: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryCategoryListArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  categoryId: InputMaybe<Scalars['String']>;
  data: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  description: InputMaybe<Scalars['String']>;
  icon: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  isHidden: InputMaybe<Scalars['Boolean']>;
  name: InputMaybe<Scalars['String']>;
  projectFromData: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  projectsCount: InputMaybe<Scalars['String']>;
};


export type QueryCompaniesArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  angelList: InputMaybe<Scalars['String']>;
  assignee: InputMaybe<Scalars['String']>;
  crunchbase: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  employees: InputMaybe<Scalars['Float']>;
  foundedDate: InputMaybe<Scalars['String']>;
  funding: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: InputMaybe<Scalars['String']>;
  industry: InputMaybe<Scalars['String']>;
  location: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  name: InputMaybe<Scalars['String']>;
  projects: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
  website: InputMaybe<Scalars['String']>;
};


export type QueryFundingArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  amount: InputMaybe<Scalars['Float']>;
  announcedDate: InputMaybe<Scalars['String']>;
  announcement: InputMaybe<Scalars['String']>;
  company: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: InputMaybe<Scalars['String']>;
  investors: InputMaybe<Scalars['String']>;
  roundName: InputMaybe<Scalars['String']>;
  type: InputMaybe<Scalars['String']>;
};


export type QueryProjectsArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  categories: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categoriesCopy: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  category: InputMaybe<Scalars['String']>;
  categoryId: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  categoryList: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  comment: InputMaybe<Scalars['String']>;
  company: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  companyName: InputMaybe<Scalars['String']>;
  createdAt: InputMaybe<Scalars['String']>;
  dead: InputMaybe<Scalars['Boolean']>;
  description: InputMaybe<Scalars['String']>;
  discord: InputMaybe<Scalars['String']>;
  editableFields: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  endDate: InputMaybe<Scalars['String']>;
  fieldGroups: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  forks: InputMaybe<Scalars['Float']>;
  id: InputMaybe<Scalars['String']>;
  language: InputMaybe<Scalars['String']>;
  license: InputMaybe<Scalars['String']>;
  linkedIn: InputMaybe<Scalars['String']>;
  logo: InputMaybe<Array<InputMaybe<Scalars['JSON']>>>;
  openSource: InputMaybe<Scalars['String']>;
  repository: InputMaybe<Scalars['String']>;
  stars: InputMaybe<Scalars['Float']>;
  status: InputMaybe<Scalars['String']>;
  subcategory: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  tags: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  telegram: InputMaybe<Scalars['String']>;
  title: InputMaybe<Scalars['String']>;
  twitter: InputMaybe<Scalars['String']>;
  updatedAt: InputMaybe<Scalars['String']>;
  watchers: InputMaybe<Scalars['Float']>;
  website: InputMaybe<Scalars['String']>;
  websiteFunctionalLightningRelated: InputMaybe<Scalars['String']>;
  yearFounded: InputMaybe<Scalars['Float']>;
};


export type QueryStatsArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  id: InputMaybe<Scalars['String']>;
  stat: InputMaybe<Scalars['String']>;
  totalProjects: InputMaybe<Scalars['String']>;
};


export type QueryTagsArgs = {
  _filter: InputMaybe<Scalars['JSON']>;
  _order_by: InputMaybe<Scalars['JSON']>;
  _page: InputMaybe<Scalars['JSON']>;
  _page_size: InputMaybe<Scalars['JSON']>;
  description: InputMaybe<Scalars['String']>;
  example: InputMaybe<Scalars['String']>;
  featured: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  icon: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  importedTableCopy: InputMaybe<Scalars['String']>;
  importedTableCopy2: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: InputMaybe<Scalars['String']>;
  projectProductFromFeatured: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  projects: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  projectsCount: InputMaybe<Scalars['String']>;
};

export type Backup = {
  __typename?: 'backup';
  assignedTo: Maybe<Scalars['String']>;
  categories: Maybe<Array<Maybe<Categories>>>;
  categoriesCopy: Maybe<Array<Maybe<Tags>>>;
  category: Maybe<Scalars['String']>;
  comment: Maybe<Scalars['String']>;
  companyName: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  dead: Maybe<Scalars['Boolean']>;
  description: Maybe<Scalars['String']>;
  endDate: Maybe<Scalars['String']>;
  forks: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
  license: Maybe<Scalars['String']>;
  logo: Maybe<Array<Maybe<Scalars['JSON']>>>;
  openSource: Maybe<Scalars['String']>;
  projectProduct: Maybe<Scalars['String']>;
  repository: Maybe<Scalars['String']>;
  socialDiscord: Maybe<Scalars['String']>;
  socialLinkedIn: Maybe<Scalars['String']>;
  socialTwitter: Maybe<Scalars['String']>;
  stars: Maybe<Scalars['Float']>;
  status: Maybe<Scalars['String']>;
  subcategory: Maybe<Array<Maybe<Scalars['String']>>>;
  telegram: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  watchers: Maybe<Scalars['Float']>;
  website: Maybe<Scalars['String']>;
  websiteFunctionalLightningRelated: Maybe<Scalars['String']>;
  yearFounded: Maybe<Scalars['Float']>;
};

export type Categories = {
  __typename?: 'categories';
  description: Maybe<Scalars['String']>;
  example: Maybe<Scalars['String']>;
  featured: Maybe<Array<Maybe<Projects>>>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  importedTableCopy: Maybe<Scalars['String']>;
  importedTableCopy2: Maybe<Array<Maybe<Backup>>>;
  name: Maybe<Scalars['String']>;
  projectProductFromFeatured: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CategoryList = {
  __typename?: 'categoryList';
  categoryId: Maybe<Scalars['String']>;
  data: Maybe<Array<Maybe<Projects>>>;
  description: Maybe<Scalars['String']>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  isHidden: Maybe<Scalars['Boolean']>;
  name: Maybe<Scalars['String']>;
  projectFromData: Maybe<Array<Maybe<Scalars['String']>>>;
  projectsCount: Maybe<Scalars['String']>;
};

export type Companies = {
  __typename?: 'companies';
  angelList: Maybe<Scalars['String']>;
  assignee: Maybe<Scalars['String']>;
  crunchbase: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  employees: Maybe<Scalars['Float']>;
  foundedDate: Maybe<Scalars['String']>;
  funding: Maybe<Array<Maybe<Funding>>>;
  id: Maybe<Scalars['String']>;
  industry: Maybe<Scalars['String']>;
  location: Maybe<Scalars['String']>;
  logo: Maybe<Array<Maybe<Scalars['JSON']>>>;
  name: Maybe<Scalars['String']>;
  projects: Maybe<Array<Maybe<Projects>>>;
  status: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
  website: Maybe<Scalars['String']>;
};

export type Funding = {
  __typename?: 'funding';
  amount: Maybe<Scalars['Float']>;
  announcedDate: Maybe<Scalars['String']>;
  announcement: Maybe<Scalars['String']>;
  company: Maybe<Array<Maybe<Companies>>>;
  id: Maybe<Scalars['String']>;
  investors: Maybe<Scalars['String']>;
  roundName: Maybe<Scalars['String']>;
  type: Maybe<Scalars['String']>;
};

export type Projects = {
  __typename?: 'projects';
  categories: Maybe<Array<Maybe<Categories>>>;
  categoriesCopy: Maybe<Array<Maybe<Tags>>>;
  category: Maybe<Scalars['String']>;
  categoryId: Maybe<Array<Maybe<Scalars['String']>>>;
  categoryList: Maybe<Array<Maybe<CategoryList>>>;
  comment: Maybe<Scalars['String']>;
  company: Maybe<Array<Maybe<Companies>>>;
  companyName: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  dead: Maybe<Scalars['Boolean']>;
  description: Maybe<Scalars['String']>;
  discord: Maybe<Scalars['String']>;
  editableFields: Maybe<Array<Maybe<Scalars['String']>>>;
  endDate: Maybe<Scalars['String']>;
  fieldGroups: Maybe<Array<Maybe<Scalars['String']>>>;
  forks: Maybe<Scalars['Float']>;
  id: Maybe<Scalars['String']>;
  language: Maybe<Scalars['String']>;
  license: Maybe<Scalars['String']>;
  linkedIn: Maybe<Scalars['String']>;
  logo: Maybe<Array<Maybe<Scalars['JSON']>>>;
  openSource: Maybe<Scalars['String']>;
  repository: Maybe<Scalars['String']>;
  stars: Maybe<Scalars['Float']>;
  status: Maybe<Scalars['String']>;
  subcategory: Maybe<Array<Maybe<Scalars['String']>>>;
  tags: Maybe<Array<Maybe<Tags>>>;
  telegram: Maybe<Scalars['String']>;
  title: Maybe<Scalars['String']>;
  twitter: Maybe<Scalars['String']>;
  updatedAt: Maybe<Scalars['String']>;
  watchers: Maybe<Scalars['Float']>;
  website: Maybe<Scalars['String']>;
  websiteFunctionalLightningRelated: Maybe<Scalars['String']>;
  yearFounded: Maybe<Scalars['Float']>;
};

export type Stats = {
  __typename?: 'stats';
  id: Maybe<Scalars['String']>;
  stat: Maybe<Scalars['String']>;
  totalProjects: Maybe<Scalars['String']>;
};

export type Tags = {
  __typename?: 'tags';
  description: Maybe<Scalars['String']>;
  example: Maybe<Scalars['String']>;
  featured: Maybe<Array<Maybe<Projects>>>;
  icon: Maybe<Scalars['String']>;
  id: Maybe<Scalars['String']>;
  importedTableCopy: Maybe<Scalars['String']>;
  importedTableCopy2: Maybe<Array<Maybe<Backup>>>;
  name: Maybe<Scalars['String']>;
  projectProductFromFeatured: Maybe<Array<Maybe<Scalars['String']>>>;
  projects: Maybe<Array<Maybe<Projects>>>;
  projectsCount: Maybe<Scalars['String']>;
};

export type AllCategoriesQueryVariables = Exact<{
  filter: InputMaybe<Scalars['JSON']>;
}>;


export type AllCategoriesQuery = { __typename?: 'Query', categoryList: Array<{ __typename?: 'categoryList', projectsCount: string | null, id: string | null, name: string | null, description: string | null, icon: string | null } | null> | null };

export type GetFiltersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFiltersQuery = { __typename?: 'Query', categoryList: Array<{ __typename?: 'categoryList', id: string | null, name: string | null, icon: string | null, projectsCount: string | null, isHidden: boolean | null } | null> | null, tags: Array<{ __typename?: 'tags', id: string | null, name: string | null, icon: string | null } | null> | null };

export type ExplorePageQueryVariables = Exact<{
  filter: InputMaybe<Scalars['JSON']>;
  page: InputMaybe<Scalars['JSON']>;
  pageSize: InputMaybe<Scalars['JSON']>;
}>;


export type ExplorePageQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'projects', id: string | null, title: string | null, logo: Array<any | null> | null, dead: boolean | null, tags: Array<{ __typename?: 'tags', id: string | null, name: string | null, icon: string | null } | null> | null } | null> | null };

export type ProjectDetailsQueryVariables = Exact<{
  projectsId: InputMaybe<Scalars['String']>;
}>;


export type ProjectDetailsQuery = { __typename?: 'Query', getProject: Array<{ __typename?: 'projects', id: string | null, title: string | null, dead: boolean | null, createdAt: string | null, companyName: string | null, category: string | null, description: string | null, discord: string | null, endDate: string | null, twitter: string | null, updatedAt: string | null, watchers: number | null, website: string | null, yearFounded: number | null, telegram: string | null, stars: number | null, repository: string | null, openSource: string | null, logo: Array<any | null> | null, linkedIn: string | null, license: string | null, language: string | null, forks: number | null, categoryList: Array<{ __typename?: 'categoryList', name: string | null } | null> | null, tags: Array<{ __typename?: 'tags', id: string | null, name: string | null, icon: string | null } | null> | null } | null> | null };


export const AllCategoriesDocument = gql`
    query AllCategories($filter: JSON) {
  categoryList(isHidden: false, _filter: $filter) {
    projectsCount
    id
    name
    description
    icon
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
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
      }
export function useAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllCategoriesQuery, AllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllCategoriesQuery, AllCategoriesQueryVariables>(AllCategoriesDocument, options);
        }
export type AllCategoriesQueryHookResult = ReturnType<typeof useAllCategoriesQuery>;
export type AllCategoriesLazyQueryHookResult = ReturnType<typeof useAllCategoriesLazyQuery>;
export type AllCategoriesQueryResult = Apollo.QueryResult<AllCategoriesQuery, AllCategoriesQueryVariables>;
export const GetFiltersDocument = gql`
    query GetFilters {
  categoryList {
    id
    name
    icon
    projectsCount
    isHidden
  }
  tags {
    id
    name
    icon
  }
}
    `;

/**
 * __useGetFiltersQuery__
 *
 * To run a query within a React component, call `useGetFiltersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFiltersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFiltersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFiltersQuery(baseOptions?: Apollo.QueryHookOptions<GetFiltersQuery, GetFiltersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFiltersQuery, GetFiltersQueryVariables>(GetFiltersDocument, options);
      }
export function useGetFiltersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFiltersQuery, GetFiltersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFiltersQuery, GetFiltersQueryVariables>(GetFiltersDocument, options);
        }
export type GetFiltersQueryHookResult = ReturnType<typeof useGetFiltersQuery>;
export type GetFiltersLazyQueryHookResult = ReturnType<typeof useGetFiltersLazyQuery>;
export type GetFiltersQueryResult = Apollo.QueryResult<GetFiltersQuery, GetFiltersQueryVariables>;
export const ExplorePageDocument = gql`
    query ExplorePage($filter: JSON, $page: JSON, $pageSize: JSON) {
  projects(
    _order_by: ["dead", "title"]
    _filter: $filter
    _page: $page
    _page_size: $pageSize
  ) {
    id
    title
    logo
    dead
    tags {
      id
      name
      icon
    }
  }
}
    `;

/**
 * __useExplorePageQuery__
 *
 * To run a query within a React component, call `useExplorePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useExplorePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExplorePageQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *   },
 * });
 */
export function useExplorePageQuery(baseOptions?: Apollo.QueryHookOptions<ExplorePageQuery, ExplorePageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExplorePageQuery, ExplorePageQueryVariables>(ExplorePageDocument, options);
      }
export function useExplorePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExplorePageQuery, ExplorePageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExplorePageQuery, ExplorePageQueryVariables>(ExplorePageDocument, options);
        }
export type ExplorePageQueryHookResult = ReturnType<typeof useExplorePageQuery>;
export type ExplorePageLazyQueryHookResult = ReturnType<typeof useExplorePageLazyQuery>;
export type ExplorePageQueryResult = Apollo.QueryResult<ExplorePageQuery, ExplorePageQueryVariables>;
export const ProjectDetailsDocument = gql`
    query ProjectDetails($projectsId: String) {
  getProject: projects(id: $projectsId) {
    id
    title
    dead
    createdAt
    companyName
    category
    categoryList {
      name
    }
    description
    discord
    endDate
    twitter
    updatedAt
    watchers
    website
    yearFounded
    telegram
    tags {
      id
      name
      icon
    }
    stars
    repository
    openSource
    logo
    linkedIn
    license
    language
    forks
  }
}
    `;

/**
 * __useProjectDetailsQuery__
 *
 * To run a query within a React component, call `useProjectDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectDetailsQuery({
 *   variables: {
 *      projectsId: // value for 'projectsId'
 *   },
 * });
 */
export function useProjectDetailsQuery(baseOptions?: Apollo.QueryHookOptions<ProjectDetailsQuery, ProjectDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectDetailsQuery, ProjectDetailsQueryVariables>(ProjectDetailsDocument, options);
      }
export function useProjectDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectDetailsQuery, ProjectDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectDetailsQuery, ProjectDetailsQueryVariables>(ProjectDetailsDocument, options);
        }
export type ProjectDetailsQueryHookResult = ReturnType<typeof useProjectDetailsQuery>;
export type ProjectDetailsLazyQueryHookResult = ReturnType<typeof useProjectDetailsLazyQuery>;
export type ProjectDetailsQueryResult = Apollo.QueryResult<ProjectDetailsQuery, ProjectDetailsQueryVariables>;