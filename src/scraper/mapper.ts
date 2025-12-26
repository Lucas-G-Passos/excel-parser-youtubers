import Channel from "../types/channel";
import { YouTubeChannel } from "../types/channelResponse";
import { getYtData } from "./collector"


const regex = /(https?:\/\/[^\s]+)/g;

export const map = async (): Promise<Array<Channel>> => {
    const result: Array<Channel> = []
    const data = await getYtData();
    let counter = 0

    for (const d of data) {
        if (!d.items) continue;

        const mapped: Array<Channel> = d.items.map((channel: YouTubeChannel) => {
            const social = parseSocials(channel.snippet.description);
            const ytUrl = channel.snippet.customUrl
                ? `https://www.youtube.com/${channel.snippet.customUrl}`
                : `https://www.youtube.com/channel/${channel.id}`;

            return {
                external_channel_id: channel.id,
                vanity_name: channel.snippet.customUrl || channel.snippet.title,
                seguidores: parseInt(channel.statistics.subscriberCount),

                channel_link: ytUrl,
                YTUrl: ytUrl,
                YTSeguidores: channel.statistics.subscriberCount,

                TTKUrl: social.tiktok,
                InstaUrl: social.instagram,

                TTKSeguidores: "0",
                InstaSeguidores: "0",

                customUrl1: social.custom1,
                customUrl2: social.custom2
            }
        })

        result.push(...mapped)
    }

    return result;

}

//Função da ia
function parseSocials(desc: string): { instagram: string; tiktok: string; custom1: string; custom2: string } {
    const results = { instagram: "", tiktok: "", custom1: "", custom2: "" };

    const urlRegex = /((https?:\/\/)|(www\.))[^\s]+/gi;
    const urlMatches = desc.match(urlRegex) || [];

    for (let link of urlMatches) {
        link = link.replace(/[.,!)"]+$/, "");
        const lowerLink = link.toLowerCase();

        if (!results.instagram && (lowerLink.includes("instagram.com") || lowerLink.includes("instagr.am"))) {
            results.instagram = normalizeProtocol(link);
        }
        else if (!results.tiktok && lowerLink.includes("tiktok.com")) {
            results.tiktok = normalizeProtocol(link);
        }

        else {
            if (!results.custom1) {
                results.custom1 = normalizeProtocol(link);
            } else {
                results.custom2 = normalizeProtocol(link)
            }
        }
    }

    if (!results.instagram) {
        const igHandleRegex = /(?:instagram|insta|ig)\s*[:\-–]?\s*(?:on)?\s*@?([a-zA-Z0-9_.]+)/i;
        const match = desc.match(igHandleRegex);
        if (match && match[1]) {
            results.instagram = `https://instagram.com/${match[1]}`;
        }
    }

    if (!results.tiktok) {
        const tiktokHandleRegex = /(?:tiktok|tt)\s*[:\-–]?\s*(?:on)?\s*@?([a-zA-Z0-9_.]+)/i;
        const match = desc.match(tiktokHandleRegex);
        if (match && match[1]) {
            results.tiktok = `https://tiktok.com/@${match[1]}`;
        }
    }

    return results;
}


function normalizeProtocol(url: string): string {
    return url.startsWith("http") ? url : `https://${url}`;
}


//Minha função
// function parseSocials(desc: string): { instagram: string; tiktok: string } {
//     const results = { instagram: "", tiktok: "" };
//     const regex = /((https?:\/\/)|(www\.))[^\s]+/gi;

//     const matches = desc.match(regex);
//     if (!matches) return results;

//     for (let link of matches) {
//         const cleanLink = link.replace(/[.,!)"]+$/, "");
//         const lowerLink = cleanLink.toLowerCase();

//         if (!results.instagram && (lowerLink.includes("instagram.com") || lowerLink.includes("instagr.am"))) {
//             results.instagram = cleanLink;
//         }
//         else if (!results.tiktok && lowerLink.includes("tiktok.com")) {
//             results.tiktok = cleanLink;
//         }
//     }
//     return results;
// }

/*
const regex = /(https?:\/\/[^\s]+)/g;

const map = async (): Promise<Array<Channel>> => {
    const result: Array<Channel> = []
    const data = await getYtData();
    let counter = 0

    do {
        const mapped:Channel = data[counter].items.map(
            d => {
                return {
                    channel_id: d.id,
                    
                }
            }
        )
        counter++
    }
    while(data.length > counter)

    return result;

}

function parseDescription(desc: String): Array<string> {
    const matched = desc.match(regex);

    return matched;
} */