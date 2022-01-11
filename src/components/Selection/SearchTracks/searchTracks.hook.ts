import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type SearchTracksQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SearchTracksQuery = { __typename?: 'Query', searchTracks: { __typename?: 'Tracks', limit: number, offset: number, total: number, next?: number | null | undefined, tracks: Array<{ __typename?: 'Track', id: string, name: string, preview_url?: string | null | undefined, is_local: boolean, artists: Array<{ __typename?: 'Artist', name: string, id?: string | null | undefined }>, album?: { __typename?: 'Album', name: string, id?: string | null | undefined, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> } | null | undefined }> } };


export const SearchTracksDocument = gql`
    query SearchTracks($query: String!, $limit: Int, $offset: Int) {
  searchTracks(query: $query, limit: $limit, offset: $offset) {
    limit
    offset
    total
    next
    tracks {
      id
      name
      artists {
        name
        id
      }
      preview_url
      is_local
      album {
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
 * __useSearchTracksQuery__
 *
 * To run a query within a React component, call `useSearchTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTracksQuery({
 *   variables: {
 *      query: // value for 'query'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useSearchTracksQuery(baseOptions: Apollo.QueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, options);
      }
export function useSearchTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTracksQuery, SearchTracksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTracksQuery, SearchTracksQueryVariables>(SearchTracksDocument, options);
        }
export type SearchTracksQueryHookResult = ReturnType<typeof useSearchTracksQuery>;
export type SearchTracksLazyQueryHookResult = ReturnType<typeof useSearchTracksLazyQuery>;
export type SearchTracksQueryResult = Apollo.QueryResult<SearchTracksQuery, SearchTracksQueryVariables>;