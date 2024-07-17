import axios from "axios";

export const graphqlRequest = (data: any, headers: any) => {
    return axios({
        url: "https://api.github.com/graphql",
        method: "post",
        headers,
        data,
    });
};

export const httpGetRequest = (url: string, headers: any) => {
    return axios({
        url,
        method: "get",
        headers,
    });
};

export const encodeHTML = (str: String) => {
    return str
        .replace(/[\u00A0-\u9999<>&](?!#)/gim, (i) => {
            return "&#" + i.charCodeAt(0) + ";";
        })
        .replace(/\u0008/gim, "");
};

export const math = {
    circleLength: (r: number) => 2 * Math.PI * r,
};
