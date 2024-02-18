import { _decorator, Component, Prefab, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('EnemyManager')
export class EnemyManager extends Component {
    @property(Prefab)
    enemy: Prefab = null;
    start() {
        const { x, y } = this.node.getPosition();
        this.schedule(() => {
            const node = instantiate(this.enemy);
            node.setPosition(Math.random() * 300 + 40, y);
            this.node.addChild(node);
        }, 0.5);
    }

    update(deltaTime: number) {
        
    }
}


