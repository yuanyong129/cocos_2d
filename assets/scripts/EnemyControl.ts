import { _decorator, Component, Node, resources, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    isDead: boolean = false;
    deadImages: SpriteFrame[] = [];
    start() {
        this.loadImages();
    }

    update(deltaTime: number) {
        if(this.isDead) return;
        const { x, y } = this.node.getPosition();
        const moveY = y - 500 * deltaTime;
        this.node.setPosition(x, moveY);
        if(moveY < -900) {
            this.node.destroy();
        }
    }

    loadImages () {
        resources.loadDir('enemy-death', SpriteFrame, (_err, data: SpriteFrame[]) => {
            console.log(data)
            this.deadImages = data;
        })
    }

    playDead() {
        for(let i = 0; i < this.deadImages.length; i++) {
            setTimeout(() => {
                if(this.node?.getComponent) {
                    this.node.getComponent(Sprite).spriteFrame = this.deadImages[i]
                }
            }, i * 80);
        }
    }

    die() {
        if(this.isDead) return;
        this.isDead = true;
        this.playDead();
        setTimeout(() => {
            this.node?.destroy?.();
        }, 240);
    }
}


