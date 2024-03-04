import { _decorator, Collider2D, Component, Contact2DType, IPhysics2DContact, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {
	isDead: boolean = false

	start() {
		const collider = this.getComponent(Collider2D);
		if(collider) {
				collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
		}
	}

	onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
		if(otherCollider.tag === 0) {
			this.die();
			return;
		}
	}

	update(deltaTime: number) {
		if(this.isDead) return;
		const {x, y} = this.node.getPosition();
		const moveY = y + 600 * deltaTime;
		this.node.setPosition(x, moveY);
		if(moveY > 700) {
			this.node.destroy();
		}
	}

	die() {
			if(this.isDead) return;
			this.isDead = true;
			setTimeout(() => {
					this.node?.destroy?.();
			}, 200);
	}
}


