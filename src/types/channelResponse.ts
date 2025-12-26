export interface YouTubeChannelsResponse {
    kind: "youtube#channelListResponse";
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: YouTubeChannel[];
}

export interface YouTubeChannel {
    kind: "youtube#channel";
    etag: string;
    id: string;

    snippet: {
        title: string;
        description: string;
        customUrl?: string;
        publishedAt: string;
        thumbnails: {
            default?: Thumbnail;
            medium?: Thumbnail;
            high?: Thumbnail;
        };
        country?: string;
    };

    statistics: {
        viewCount?: string;
        subscriberCount?: string;
        hiddenSubscriberCount: boolean;
        videoCount?: string;
    };
}

export interface Thumbnail {
    url: string;
    width: number;
    height: number;
}
