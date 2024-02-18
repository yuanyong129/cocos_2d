import { _decorator, Component, EventTouch, Prefab, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('player')
export class player extends Component {
  @property(Prefab)
  bullet: Prefab = null;
    x: number
    y: number

    start() {
      // this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
      // this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
      this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      // this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

      this.schedule(() => {
        const { x, y } = this.node.getPosition();
        const nodeLeft = instantiate(this.bullet);
        nodeLeft.setParent(this.node.parent);
        nodeLeft.setPosition(x - 30, y + 30);
        const nodeRight = instantiate(this.bullet);
        nodeRight.setParent(this.node.parent);
        nodeRight.setPosition(x + 30, y + 30);
      }, 0.2)
    }

    // onTouchStart(event: EventTouch) {
    //   console.log(event, 'event-touch-start')
    // }

    // onTouchEnd(event: EventTouch) {
    //   console.log(event, 'event-touch-end')
    // }

    onTouchMove(event: EventTouch) {

      const d = event.getUIDelta();
      this.x = this.node.position.x;
      this.y = this.node.position.y;
      if(this.x > 286) {
        this.node.setPosition(286, this.y + d.y);
      } else if(this.x < -286) {
        this.node.setPosition(-286, this.y + d.y);
      } else {
        this.node.setPosition(this.x + d.x, this.y + d.y);
      }
    }

    // onTouchCancel(event: EventTouch) {
    //   console.log(event, 'event-touch-cancel')
    // }

    update(deltaTime: number) {
        
    }
}


