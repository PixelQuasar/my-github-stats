import { encodeHTML } from "../utils/utils";

export class SVGFrame {
    public width: number;
    public height: number;
    private border_radius: number;
    private css: string;
    private paddingX: number;
    private paddingY: number;

    constructor(width = 500, height = 250, border_radius = 4.5) {
        this.width = width;
        this.height = height;
        this.border_radius = border_radius;
        this.css = "";
        this.paddingX = 25;
        this.paddingY = 35;
    }

    public setCss(css: string) {
        this.css = css;
    }

    public getCss(): String {
        return this.css;
    }
}
