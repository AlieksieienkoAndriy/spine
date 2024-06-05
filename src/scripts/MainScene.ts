import "pixi-spine";
import * as PIXI from "pixi.js";

import {ITrackEntry, Spine} from 'pixi-spine';

export class MainScene {
    container: PIXI.Container;
    app: PIXI.Application;
    bg!: PIXI.Sprite;
    playButton!: PIXI.Sprite;
    resetButton!: PIXI.Sprite;
    reverseButton!: PIXI.Sprite;
    animation!: Spine;
    trackEntry?: ITrackEntry;

    constructor(app: PIXI.Application) {
        this.app = app;

        this.container = new PIXI.Container();

        this.createBackground();
        this.createButtons();
        this.createSpineAnim();
    }

    createBackground() {        
        this.bg = new PIXI.Sprite(PIXI.Assets.get('bg'));
        this.container.addChild(this.bg);
    }

    createButtons() {
        this._createPlayButton();
        this._createPauseButton();
        this._createResumeButton();
        this._createResetButton();
        this._createReverseButton();
    }

    _createPlayButton() {
        this.playButton = new PIXI.Sprite(PIXI.Assets.get("restart_button"));
        this.playButton.anchor.set(0.5, 0.5);
        this.playButton.position.set(1250, 60);
        this.playButton.interactive = true;

        this.playButton.on('pointerdown', () => {
            console.log('Clicked');
              this.playAnimation();
        })

        const text = new PIXI.Text('Play');
        text.anchor.set(0.5, 0.5);
        this.playButton.addChild(text);

        this.container.addChild(this.playButton);
    }
    _createPauseButton() {
        this.playButton = new PIXI.Sprite(PIXI.Assets.get("restart_button"));
        this.playButton.anchor.set(0.5, 0.5);
        this.playButton.position.set(1250, 160);
        this.playButton.interactive = true;

        this.playButton.on('pointerdown', () => {
            console.log('Clicked');
            this.pauseAnimation();
        })

        const text = new PIXI.Text('Pause');
        text.anchor.set(0.5, 0.5);
        this.playButton.addChild(text);

        this.container.addChild(this.playButton);
    }
    _createResumeButton() {
        this.playButton = new PIXI.Sprite(PIXI.Assets.get("restart_button"));
        this.playButton.anchor.set(0.5, 0.5);
        this.playButton.position.set(1250, 260);
        this.playButton.interactive = true;

        this.playButton.on('pointerdown', () => {
            this.resumeAnimation();
        })

        const text = new PIXI.Text('Resume');
        text.anchor.set(0.5, 0.5);
        this.playButton.addChild(text);

        this.container.addChild(this.playButton);
    }
    _createResetButton() {
        this.resetButton = new PIXI.Sprite(PIXI.Assets.get("restart_button"));
        this.resetButton.anchor.set(0.5, 0.5);
        this.resetButton.position.set(1250, 360);
        this.resetButton.interactive = true;

        this.resetButton.on('pointerdown', () => {
            console.log('Clicked');
            this.resetAnimation();
        })

        const text = new PIXI.Text('Reset');
        text.anchor.set(0.5, 0.5);
        this.resetButton.addChild(text);

        this.container.addChild(this.resetButton);
    }
    _createReverseButton() {
        this.reverseButton = new PIXI.Sprite(PIXI.Assets.get("restart_button"));
        this.reverseButton.anchor.set(0.5, 0.5);
        this.reverseButton.position.set(1250, 460);
        this.reverseButton.interactive = true;

        this.reverseButton.on('pointerdown', () => {
            console.log('Clicked');
            // this.reverseAnimation();
        })

        const text = new PIXI.Text('Play reverse');
        text.anchor.set(0.5, 0.5);
        this.reverseButton.addChild(text);

        this.container.addChild(this.reverseButton);
    }

    createSpineAnim() {
        console.log(PIXI.Assets.get("spineboy"));
        this.animation = new Spine(PIXI.Assets.get("spineboy").spineData);
        this.container.addChild(this.animation);
        this.animation.position.set(500, 800);
    }

    playAnimation() {
        const anims = [
            'aim',
            'death',
            'hoverboard',
            'idle',
            'idle-turn',
            'jump',
            'portal',
            'run',
            'run-to-idle',
            'shoot',
            'walk'
        ];

        // console.log(this.animation);

        this.trackEntry = this.animation.state.setAnimation(0, 'hoverboard', false);
        console.log(this.trackEntry);
    }

    pauseAnimation() {
        this.animation.autoUpdate = false
    }

    resumeAnimation() {
        this.animation.lastTime = Date.now();
        this.animation.autoUpdate = true
    }

    resetAnimation() {
        this.animation.state.clearTrack(0);
        this.animation.skeleton.setToSetupPose();
    }

    reverseAnimation() {
        this.trackEntry = this.animation.state.setAnimation(0, 'hoverboard', false);
        console.log(this.trackEntry);
    }


    update() {

    };
};