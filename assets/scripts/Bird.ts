import { _decorator,PhysicsSystem2D, Component, Node, math,EPhysics2DDrawFlags,IPhysics2DContact, Collider2D, BoxCollider2D,Contact2DType,Quat, Vec2, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    private speed: number = 0;
    private accel: number = 120;
    @property({type: Label})
    private label: Label = null;
    private score: number = 0;
    private gameOver: boolean = false;
    onLoad(){
        this.node.parent.on(Node.EventType.TOUCH_START, this.touchCallBack, this);
       
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        // if (otherCollider.group == ) {
        //     this.gameOver = true;
        // }
        console.log(otherCollider.group)
        if (otherCollider.group == 16){
            this.score += 5;
            this.label.string = 'score:' + this.score;
            this.label.updateRenderData(true);
        }
    }
    start() {

    }

    touchCallBack() {
        this.speed = -120;
    }
    update(deltaTime: number) {
        if (!this.gameOver) {
            this.speed += this.accel * deltaTime;
            // console.log(this.speed* deltaTime);
            let dist = this.speed * deltaTime;
            if (this.node.angle <= 30 && this.node.angle >= -30){
                this.node.angle += -dist / Math.sqrt(dist * dist);
            }else if( this.node.angle > 30)
                this.node.angle = 30;
            else if( this.node.angle < -30)
                this.node.angle = -30;
            // this.node.translate(new math.Vec3(0,-dist, 0));
            let pos: math.Vec3 = this.node.getWorldPosition()
            pos.y += -dist;
            this.node.setWorldPosition(pos);
        }
    }
}

