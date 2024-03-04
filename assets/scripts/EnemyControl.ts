import { _decorator, Collider2D, Component, Contact2DType, find, IPhysics2DContact, Label, resources, Sprite, SpriteFrame } from 'cc';
import { BgControl } from './BgControl';
const { ccclass, property } = _decorator;

@ccclass('EnemyControl')
export class EnemyControl extends Component {
    // hp: number = 5;
    isDead: boolean = false;
    deadImages: SpriteFrame[] = [];
    bgControl: BgControl
    start() {
        const collider = this.getComponent(Collider2D);
        this.bgControl = find('Canvas/bg').getComponent(BgControl);
        if(collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        this.loadImages();
    }

    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if(otherCollider.tag === 0 || otherCollider.tag === 2) {
            this.die();
        }
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
        this.bgControl.addScore(100);
        this.playDead();
        setTimeout(() => {
            this.node?.destroy?.();
        }, 240);
    }
}


