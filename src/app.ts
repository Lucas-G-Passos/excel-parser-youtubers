import { getYtData } from "./scraper/collector";
import { loadRows } from "./scraper/xlsxLoader";

async function run() {
    const rows = loadRows();
    console.log(rows[0]);
}

run();
