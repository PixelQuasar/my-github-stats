// gets raw github graphql data for languages and returns prepared data.

type RawLangData = {
    data: {
        user: {
            repositories: {
                nodes: Array<{
                    name: string;
                    languages: {
                        edges: Array<{
                            size: number;
                            node: {
                                color: string;
                                name: string;
                            };
                        }>;
                    };
                }>;
            };
            repositoriesContributedTo: {
                nodes: Array<{
                    name: string;
                    languages: {
                        edges: Array<{
                            size: number;
                            node: {
                                color: string;
                                name: string;
                            };
                        }>;
                    };
                }>;
            };
        };
    };
};

export type LangInfo = {
    name: string;
    color: string;
    size: number;
};

export const fetchLangs = (rawData: RawLangData): Array<LangInfo> => {
    const repos = [
        ...(rawData.data.user.repositories ? rawData.data.user.repositories.nodes : []),
        ...(rawData.data.user.repositoriesContributedTo
            ? rawData.data.user.repositoriesContributedTo.nodes
            : []),
    ];

    const langs = repos
        .map((repo) =>
            repo.languages.edges.map((lang) => ({
                name: lang.node.name,
                color: lang.node.color,
                size: lang.size,
            })),
        )
        .flat();

    const langTable = Object.values(
        langs.reduce((acc, lang) => {
            if (lang.name == "Yacc") return acc; // ignore gamemaker studio config files
            if (acc[lang.name]) {
                acc[lang.name].size += lang.size;
            } else {
                acc[lang.name] = lang;
            }
            return acc;
        }, Object()),
    ).sort((a, b) => (b as LangInfo).size - (a as LangInfo).size);

    return langTable.slice(0, 10) as Array<LangInfo>;
};
