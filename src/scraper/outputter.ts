import Channel from "../types/channel";
import { getYtData } from "./collector";
import { map } from "./mapper";
const XLSX = require("xlsx") as typeof import("xlsx");


//Essa pagina foi em sua maioria AI
const COLUMNS: { key: keyof Channel; header: string }[] = [
    { key: "external_channel_id", header: "External Channel ID" },
    { key: "vanity_name", header: "Vanity Name" },
    { key: "channel_link", header: "Channel Link" },
    { key: "seguidores", header: "Seguidores" },
    { key: "YTUrl", header: "YouTube URL" },
    { key: "YTSeguidores", header: "YouTube Seguidores" },
    { key: "TTKUrl", header: "TikTok URL" },
    { key: "TTKSeguidores", header: "TikTok Seguidores" },
    { key: "InstaUrl", header: "Instagram URL" },
    { key: "InstaSeguidores", header: "Instagram Seguidores" },
    { key: "customUrl1", header: "Custom URL 1" },
    { key: "customUrl2", header: "Custom URL 2" }
];

const buildXlsx = async() => {
    const channels = await map();

    const rows = channels.map(c =>
        COLUMNS.map(col => c[col.key] ?? "")
    );

    const sheet = XLSX.utils.aoa_to_sheet([
        COLUMNS.map(c => c.header),
        ...rows
    ]);

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Channels");

    XLSX.writeFile(wb, "channels.xlsx");
};


export default buildXlsx;