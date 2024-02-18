import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartControl')
export class StartControl extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart() {

    }

    onTouchEnd() {
        director.loadScene('scene')
    }

    update(deltaTime: number) {
        
    }
}


