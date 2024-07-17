import { Request, Response } from "express";
import { CONFIG, httpGetRequest } from "../../utils";
import { fetchWakatime } from "../../fetch";
import { renderPieChart } from "../../render";

let wakatimeLangCache = "try again";

const getWakatimeData = async () => {
    return httpGetRequest("https://wakatime.com/api/v1/users/Quasarity/stats", {});
};

export const wakatimeEndpoint = async (req: Request, res: Response) => {
    res.setHeader("Content-Type", "image/svg+xml");
    res.send(wakatimeLangCache);

    const stats = await getWakatimeData();
    const langs = fetchWakatime(stats.data);
    const totalTime = stats.data.data.categories[0].digital.slice(0, 3);
    let content = renderPieChart(`Wakatime: top languages (${totalTime} h.)`, langs, true);
    wakatimeLangCache = content;
};
