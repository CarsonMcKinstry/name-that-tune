import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type TrackQueryVariables = Types.Exact<{
  trackId: Types.Scalars['ID'];
}>;


export type TrackQuery = { __typename?: 'Query', track?: { __typename?: 'Track', id: string, name: string, preview_url?: string | null | undefined, album?: { __typename?: 'Album', id?: string | null | undefined, name: string, images: Array<{ __typename?: 'Image', url: string, height?: number | null | undefined, width?: number | null | undefined }> } | null | undefined, artists: Array<{ __typename?: 'Artist', id?: string | null | undefined, name: string }> } | null | undefined };


export const TrackDocument = gql`
    query Track($trackId: ID!) {
  track(id: $trackId) {
    id
    name
    preview_url
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
  }
}
    `;

/**
 * __useTrackQuery__
 *
 * To run a query within a React component, call `useTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackQuery({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useTrackQuery(baseOptions: Apollo.QueryHookOptions<TrackQuery, TrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackQuery, TrackQueryVariables>(TrackDocument, options);
      }
export function useTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackQuery, TrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackQuery, TrackQueryVariables>(TrackDocument, options);
        }
export type TrackQueryHookResult = ReturnType<typeof useTrackQuery>;
export type TrackLazyQueryHookResult = ReturnType<typeof useTrackLazyQuery>;
export type TrackQueryResult = Apollo.QueryResult<TrackQuery, TrackQueryVariables>;