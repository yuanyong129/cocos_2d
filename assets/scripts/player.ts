import { _decorator, Component, EventTouch, Prefab, Node, instantiate, Label, Collider2D, Contact2DType, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

enum BulletNum {
  one,
  two,
  three
}

@ccclass('player')
export class player extends Component {
    @property(Prefab)
    bullet: Prefab = null;
    bulletNum: BulletNum = BulletNum.one;
    @property(Label)
    hpLabel: Label = null;
    hp: number = 20;
    isDead: boolean = false;
    x: number;
    y: number;

    start() {
      // this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
      // this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
      this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      // this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);

      this.schedule(() => {
        const { x, y } = this.node.getPosition();
        if(this.bulletNum === BulletNum.one) {
          const node = instantiate(this.bullet);
          node.setParent(this.node.parent);
          node.setPosition(x, y + 70);
        } else if (this.bulletNum === BulletNum.two) {
          const nodeLeft = instantiate(this.bullet);
          nodeLeft.setParent(this.node.parent);
          nodeLeft.setPosition(x - 30, y + 30);
          const nodeRight = instantiate(this.bullet);
          nodeRight.setParent(this.node.parent);
          nodeRight.setPosition(x + 30, y + 30);
        }
      }, 0.3);

      const collider = this.getComponent(Collider2D);
		  if(collider) {
				collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		  }
    }

  onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
    if(otherCollider.tag !== 0) {
      this.hp -= 1;
      this.renderHp();
      if(this.hp <= 0) {
        this.die();
      }
    }
  }

  renderHp () {
    this.hpLabel.string = `HP:${this.hp}`;
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
    die () {
      if(this.isDead) { return; }
      this.isDead = true;
    }
}


