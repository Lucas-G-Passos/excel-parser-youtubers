import Channel from "../types/channel";
import { YouTubeChannelsResponse } from "../types/channelResponse";
import request from "./scraper";
import { loadRows } from "./xlsxLoader";

export const getYtData = async () => {
    try {
        const rows = loadRows().slice(0, 50);
        let counter = 0;
        const data: Array<YouTubeChannelsResponse> = []

        while (counter < rows.length) {
            const stored: Array<Channel> = [];

            while (stored.length < 50 && counter < rows.length) {
                stored.push(rows[counter])
                counter++
            }

            const ids = stored.map(channel => channel.external_channel_id);
            const response = await request(ids);
            data.push(response);
        }
        return data;
    } catch (error) {
        console.error(error)
    }

}



