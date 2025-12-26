import { getYtData } from "./scraper/collector";
import buildXlsx from "./scraper/outputter";

async function run() {
    await buildXlsx()
}

run();
