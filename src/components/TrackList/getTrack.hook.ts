import * as Types from '@packages/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetTrackQueryVariables = Types.Exact<{
  trackId: Types.Scalars['ID'];
}>;


export type GetTrackQuery = { __typename?: 'Query', track?: { __typename?: 'Track', id: string, name: string, preview_url?: string | null | undefined, artists: Array<{ __typename?: 'Artist', name: string, id?: string | null | undefined, images: Array<{ __typename?: 'Image', width?: number | null | undefined, height?: number | null | undefined, url: string }> }>, album?: { __typename?: 'Album', name: string, id?: string | null | undefined, images: Array<{ __typename?: 'Image', width?: number | null | undefined, height?: number | null | undefined, url: string }> } | null | undefined } | null | undefined };


export const GetTrackDocument = gql`
    query GetTrack($trackId: ID!) {
  track(id: $trackId) {
    id
    name
    artists {
      name
      id
      images {
        width
        height
        url
      }
    }
    album {
      name
      images {
        width
        height
        url
      }
      id
    }
    preview_url
  }
}
    `;

/**
 * __useGetTrackQuery__
 *
 * To run a query within a React component, call `useGetTrackQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrackQuery({
 *   variables: {
 *      trackId: // value for 'trackId'
 *   },
 * });
 */
export function useGetTrackQuery(baseOptions: Apollo.QueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
      }
export function useGetTrackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrackQuery, GetTrackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrackQuery, GetTrackQueryVariables>(GetTrackDocument, options);
        }
export type GetTrackQueryHookResult = ReturnType<typeof useGetTrackQuery>;
export type GetTrackLazyQueryHookResult = ReturnType<typeof useGetTrackLazyQuery>;
export type GetTrackQueryResult = Apollo.QueryResult<GetTrackQuery, GetTrackQueryVariables>;