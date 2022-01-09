import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyTopArtistsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MyTopArtistsQuery = { __typename?: 'Query', me?: { __typename?: 'Me', top_artists: { __typename?: 'Artists', limit: number, offset: number, next?: number | null | undefined, total: number, artists: Array<{ __typename?: 'Artist', name: string, id?: string | null | undefined, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> }> } } | null | undefined };


export const MyTopArtistsDocument = gql`
    query MyTopArtists($limit: Int, $offset: Int) {
  me {
    top_artists(limit: $limit, offset: $offset) {
      limit
      offset
      next
      total
      artists {
        name
        id
        images {
          url
          height
          width
        }
      }
    }
  }
}
    `;

/**
 * __useMyTopArtistsQuery__
 *
 * To run a query within a React component, call `useMyTopArtistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTopArtistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTopArtistsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useMyTopArtistsQuery(baseOptions?: Apollo.QueryHookOptions<MyTopArtistsQuery, MyTopArtistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTopArtistsQuery, MyTopArtistsQueryVariables>(MyTopArtistsDocument, options);
      }
export function useMyTopArtistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTopArtistsQuery, MyTopArtistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTopArtistsQuery, MyTopArtistsQueryVariables>(MyTopArtistsDocument, options);
        }
export type MyTopArtistsQueryHookResult = ReturnType<typeof useMyTopArtistsQuery>;
export type MyTopArtistsLazyQueryHookResult = ReturnType<typeof useMyTopArtistsLazyQuery>;
export type MyTopArtistsQueryResult = Apollo.QueryResult<MyTopArtistsQuery, MyTopArtistsQueryVariables>;