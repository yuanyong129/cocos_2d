import { _decorator, Component, EventTouch, Node, CCString, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelControl')
export class LevelControl extends Component {
    @property(CCString)
    tag: string;

    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this)
    }

    onTouchStart (e: EventTouch) {
        console.log('touch-start', e)
    }

    onTouchEnd (e: EventTouch) {
        director.loadScene(`scene${this.tag}`)
    }

    update(deltaTime: number) {
        
    }
}
