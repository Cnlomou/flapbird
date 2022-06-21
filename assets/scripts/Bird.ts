import { _decorator,PhysicsSystem2D, Component, Node, math,EPhysics2DDrawFlags,IPhysics2DContact, Collider2D, BoxCollider2D,Contact2DType,Quat, Vec2, Label, Director, game } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('Bird')
export class Bird extends Component {

    private speed: number = 0;
    private accel: number = 120;
    onLoad(){
        this.node.parent.on(Node.EventType.TOUCH_START, this.touchCallBack, this);
    }
    
    start() {

    }

    touchCallBack() {
        this.speed = -120;
    }
    update(deltaTime: number) {
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

