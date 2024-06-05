import * as PIXI from "pixi.js";
import { MainScene } from "./MainScene";

export class App {
    // static assets: any; 
    canvas!: PIXI.ICanvas | HTMLElement;
    app!: PIXI.Application
    scenes: any[] = [];

    async run() {
        this.canvas = document.getElementById("canvas") as HTMLElement;
        this.app = new PIXI.Application({
            view: this.canvas,
            width: 1440,
            height: 810,

            // width: window.innerWidth,
            // height: window.innerWidth * 9 / 16,

            // resizeTo: window,
            // transparent: true,
        });
        globalThis.__PIXI_APP__ = this.app;
        window.onresize = this.onResize;
        this.onResize();

        const manifest: PIXI.AssetInitOptions = {
            manifest: {
                bundles: [
                    {
                        name: "images",
                        assets: {
                            "bg": "assets/sprites/background.png",
                            "restart_button": "assets/sprites/restart_button.png"                            
                        }
                    },
                    {
                        name: "fonts",
                        assets: {
                            "DoHyeon": "assets/fonts/DoHyeon-Regular.ttf"
                        }
                    },
                    {
                        name: "spines",
                        assets: {
                            "spineboy": "./assets/spine/boy/spineboy-pro.json"
                        }
                    },
                ]
            }
        }
        
        await PIXI.Assets.init(manifest);
        await PIXI.Assets.loadBundle(["images", "fonts", "spines"]);
        const mainScene = new MainScene(this.app);
        this.scenes.push(mainScene);

        this.app.stage.addChild(mainScene.container);
        this.app.ticker.add(() => mainScene.update());
    }

    onResize() {
        console.log(this.canvas);
        const style = this.canvas!.style;
        
        let width;
        let height;
        let margin;

        if (window.innerWidth > (window.innerHeight * 1440) / 810) {
            width = (window.innerHeight / 810) * 1440;
            height = window.innerHeight;
            margin = (window.innerWidth - width) / 2;

            style!.width = `${width}px`;
            style!.height = `${height}px`;
            style!.marginTop = `0`;
            style!.marginLeft = `${margin}px`;
        } else {
            width = window.innerWidth;
            height = (window.innerWidth / 1440) * 810;
            margin = (window.innerHeight - height) / 2;

            style!.width = `${width}px`;
            style!.height = `${height}px`;
            style!.marginTop = `${margin}px`;
            style!.marginLeft = `0`;
        }
    }
}
