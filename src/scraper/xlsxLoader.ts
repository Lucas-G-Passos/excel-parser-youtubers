import Channel from "../types/channel";

const XLSX = require("xlsx") as typeof import("xlsx")

export function loadRows(): Channel[] {
    const file = XLSX.readFile("./input.xlsx");

    const screenName = file.SheetNames[0];
    if (!screenName) {
        throw new Error("no sheets");
    }

    const screen = file.Sheets[screenName];
    if (!screen) {
        throw new Error(`Sheet "${screenName}" not found`);
    }

    const rows = XLSX.utils.sheet_to_json<Record<string, any>>(screen, {
        defval: null,
        range: 1
    });

    const channels: Channel[] = rows.map(row => ({
        external_channel_id: row["external_channel_id"] || "",
        vanity_name: row["vanity_name"] || "",
        channel_link: row["channel_link"] || "",
        seguidores: parseInt(row["Seguidores"] || row["seguidores"] || "0") || 0,
        YTUrl: row["URL "] || "",
        YTSeguidores: row["Seguidores "] || "",
        TTKUrl: row["URL Tiktok"] || "",
        TTKSeguidores: row["Seguidoes "] || "",
        InstaSeguidores: row["__EMPTY_1"] || "",
        InstaUrl: row["URL _1"] || ""
    }));

    return channels;
}
