import { Request, Response } from "express";
import { graphqlRequest } from "../../utils/utils";
import * as dotenv from "dotenv";
import { LangInfo, fetchLangs } from "../../fetch";
import { renderPieChart } from "../../render";
import { CONFIG } from "../../utils";

dotenv.config();

let langCache = {
    data: Array<LangInfo>,
    dateTime: Date,
};

const publicRepositoriesQuery = `
          repositories( 
            isFork: false
            ownerAffiliations: [OWNER]
            first: 100
          ) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }
`;

const contributedRepositoriesQuery = `repositoriesContributedTo( 
            first: 100,
          ) {
            nodes {
              name
              languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
                edges {
                  size
                  node {
                    color
                    name
                  }
                }
              }
            }
          }`;

const queryData = (
    publicRepos: boolean = true,
    contributedRepos: boolean = false,
) => `query userInfo($login: String!) 
      {
        user(login: $login) {
          ${publicRepos ? publicRepositoriesQuery : ""}
          ${contributedRepos ? contributedRepositoriesQuery : ""}
        }
      }`;

export const getGithubRepos = () => {
    return graphqlRequest(
        {
            query: queryData(),
            variables: JSON.stringify({ login: process.env.GITHUB_USERNAME }),
        },
        {
            Authorization: `token ${process.env.GITHUB_PAT}`,
        },
    );
};

export const langEndpoint = async (req: Request, res: Response) => {
    const repos = await getGithubRepos();
    const langs = fetchLangs(repos.data);

    const cacheSeconds = parseInt(process.env.CACHE_SECONDS as string);

    res.setHeader("Content-Type", "image/svg+xml");
    const totalBytesCount = langs.reduce((acc, lang) => acc + lang.size, 0);

    return res.send(renderPieChart(`GitHub: top languages (${totalBytesCount} b.)`, langs));
};
