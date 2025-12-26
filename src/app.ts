import { getYtData } from "./scraper/collector";

async function run() {
    const rows = await getYtData();
    console.log(rows[0].items);
}

run();
