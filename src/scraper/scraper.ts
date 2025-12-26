import { configDotenv } from "dotenv";
import { YouTubeChannelsResponse } from "../types/channelResponse";
import { fakedata } from "./fakeData";


configDotenv();
const APIKEY = process.env.GCLOUD;

const request = async (channelIds: Array<string>): Promise<YouTubeChannelsResponse> => {
    try {
        // const response = await fetch(
        //     `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds.join(",")}&key=${APIKEY}`
        // );

        // if (!response.ok) {
        //     const text = await response.text();
        //     throw new Error(`Body: ${text}, Status: ${response.status}`);
        // }

        // const data = await response.json();
        // return data;
        return fakedata;

    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default request;