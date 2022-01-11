import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type MyTopTracksQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type MyTopTracksQuery = { __typename?: 'Query', me?: { __typename?: 'Me', top_tracks: { __typename?: 'Tracks', limit: number, offset: number, next?: number | null | undefined, total: number, tracks: Array<{ __typename?: 'Track', id: string, name: string, is_local: boolean, preview_url?: string | null | undefined, album?: { __typename?: 'Album', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> } | null | undefined, artists: Array<{ __typename?: 'Artist', id?: string | null | undefined, name: string }> }> } } | null | undefined };


export const MyTopTracksDocument = gql`
    query MyTopTracks($limit: Int, $offset: Int) {
  me {
    top_tracks(limit: $limit, offset: $offset) {
      limit
      offset
      next
      total
      tracks {
        id
        name
        album {
          id
          name
          images {
            url
            height
            width
          }
        }
        artists {
          id
          name
        }
        is_local
        preview_url
      }
    }
  }
}
    `;

/**
 * __useMyTopTracksQuery__
 *
 * To run a query within a React component, call `useMyTopTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTopTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTopTracksQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useMyTopTracksQuery(baseOptions?: Apollo.QueryHookOptions<MyTopTracksQuery, MyTopTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyTopTracksQuery, MyTopTracksQueryVariables>(MyTopTracksDocument, options);
      }
export function useMyTopTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyTopTracksQuery, MyTopTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyTopTracksQuery, MyTopTracksQueryVariables>(MyTopTracksDocument, options);
        }
export type MyTopTracksQueryHookResult = ReturnType<typeof useMyTopTracksQuery>;
export type MyTopTracksLazyQueryHookResult = ReturnType<typeof useMyTopTracksLazyQuery>;
export type MyTopTracksQueryResult = Apollo.QueryResult<MyTopTracksQuery, MyTopTracksQueryVariables>;