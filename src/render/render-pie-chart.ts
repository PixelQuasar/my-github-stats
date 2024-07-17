import { LangInfo } from "../fetch";
import { SVGFrame } from "./SVGFrame";
import { defaultTheme } from "./themes";
import { math } from "../utils";

export const renderPieChart = (
    title: string,
    data: Array<LangInfo>,
    flip: boolean = false,
    theme = defaultTheme,
) => {
    const svgFrame = new SVGFrame();

    const r = 40;
    const circleLength = math.circleLength(r);
    let totalBytesCount = data.reduce((acc, item) => acc + item.size, 0);
    let circleIndent = 0;
    let circleWidth = 20;
    return `
    <svg
        width="${svgFrame.width}"
        height="${svgFrame.height}"
        viewBox="0 0 ${svgFrame.width} ${svgFrame.height}"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="descId"
    >
    <style>
.header {
    font: 700 18px 'Monaco';
    animation: fadeInAnimation 0.8s ease-in-out forwards;
}

.legend-block {
    font: 700 12px 'Andale Mono', Ubuntu, Sans-Serif;
}

.section {
    animation: rotate 40s linear infinite;
}

@supports(-moz-appearance: auto) {
    .header { 
        font-size: 15.5px; 
    }
}

@keyframes rotate {
    100% {
        transform: rotate(360deg);
    }
}
${svgFrame.getCss()}
</style>
    <rect 
        height="${svgFrame.height}" width="${svgFrame.width}" rx="2"
        fill="${theme.bg}" stroke="${theme.accentTwo}" stroke-width="5"
    />
    <g transform="${flip ? "translate(25 50)" : "translate(15 50)"}">
        <text x="0" y="0" class="header" data-testid="header" fill="${
            theme.title
        }"> ${title} </text>
    </g>
    <g transform="${flip ? "translate(180, 95)" : "translate(25, 95)"}" class="legend-block">
        <svg>
            ${data
                .map((item, index) => {
                    return `<g transform="translate(${((index / 5) >> 0) * 110}, ${
                        (index % 5) * 20
                    })">
                    <rect width="10" height="10" fill="${item.color}" rx="2"/>
                    <text x="18" y="11" fill="${theme.text}">${item.name}</text>
                </g>`;
                })
                .join("")}
        </svg>
    </g>
    <g transform="${flip ? "translate(-20 40)" : "translate(200 40)"}" class="chart-block">
        <svg>
        ${data
            .map((item) => {
                const sectionPercentage = (item.size / totalBytesCount) * 100;
                const sectionLength = (item.size / totalBytesCount) * circleLength;
                const content = `<g transform="translate(100, 100)">
                    <circle r="${r}" fill="transparent" stroke="${item.color}" class="section"  
                    size="${sectionPercentage}" stroke-width="${circleWidth}" 
                    stroke-dasharray="${circleLength}" stroke-dashoffset="${circleIndent}"/>
                </g>`;
                circleIndent += sectionLength;
                return content;
            })
            .join("")}
        </svg>
    </g>
</svg>`;
};
