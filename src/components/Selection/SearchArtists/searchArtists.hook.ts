import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchArtistsQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SearchArtistsQuery = { __typename?: 'Query', searchArtists: { __typename?: 'Artists', offset: number, limit: number, total: number, next?: number | null | undefined, artists: Array<{ __typename?: 'Artist', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> }> } };


export const SearchArtistsDocument = gql`
    query SearchArtists($query: String!, $limit: Int, $offset: Int) {
  searchArtists(query: $query, limit: $limit, offset: $offset) {
    offset
    limit
    total
    next
    artists {
      id
      name
      images {
        url
        height
        width
      }
    }
  }
}
    `;

/**
 * __useSearchArtistsQuery__
 *
 * To run a query within a React component, call `useSearchArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchArtistsQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchArtistsQuery(baseOptions: Apollo.QueryHookOptions<SearchArtistsQuery, SearchArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchArtistsQuery, SearchArtistsQueryVariables>(SearchArtistsDocument, options);
      }
export function useSearchArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchArtistsQuery, SearchArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchArtistsQuery, SearchArtistsQueryVariables>(SearchArtistsDocument, options);
        }
export type SearchArtistsQueryHookResult = ReturnType<typeof useSearchArtistsQuery>;
export type SearchArtistsLazyQueryHookResult = ReturnType<typeof useSearchArtistsLazyQuery>;
export type SearchArtistsQueryResult = Apollo.QueryResult<SearchArtistsQuery, SearchArtistsQueryVariables>;