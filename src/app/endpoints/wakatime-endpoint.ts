import { Request, Response } from "express";
import { CONFIG, httpGetRequest } from "../../utils";
import { fetchWakatime } from "../../fetch";
import { renderPieChart } from "../../render";

const getWakatimeData = async () => {
    return httpGetRequest("https://wakatime.com/api/v1/users/Quasarity/stats", {});
};

export const wakatimeEndpoint = async (req: Request, res: Response) => {
    const stats = await getWakatimeData();
    const langs = fetchWakatime(stats.data);

    const cacheSeconds = parseInt(process.env.CACHE_SECONDS as string);

    res.setHeader("Content-Type", "image/svg+xml");
    const totalTime = stats.data.data.categories[0].digital.slice(0, 3);

    return res.send(renderPieChart(`Wakatime: top languages (${totalTime} h)`, langs, true));
};
