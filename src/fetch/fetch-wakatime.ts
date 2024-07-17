import * as stream from "stream";
import { colors } from "../utils";
import { LangInfo } from "./fetch-langs";

export type WakatimeData = {
    name: string;
    total_seconds: number;
    percent: number;
    digital: string;
    decimal: string;
    text: string;
    hours: number;
    minutes: number;
};

export const fetchWakatime = (rawData: any): Array<LangInfo> => {
    const rawLangs: Array<WakatimeData> = rawData.data.languages;

    const langs = rawLangs.map((lang) => ({
        name: lang.name,
        color: colors[lang.name] || "#858585",
        size: ((arr) => arr[0] * 60 + arr[1])(lang.decimal.split(".").map((x) => parseInt(x))),
    }));

    return langs.slice(0, 10) as Array<LangInfo>;
};
