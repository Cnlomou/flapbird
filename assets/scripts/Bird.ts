import { _decorator,PhysicsSystem2D, Component, Node, math, Collider2D, BoxCollider2D,Contact2DType,Quat, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {

    private speed: number = 0;
    private accel: number = 120;

    onLoad(){
        this.node.parent.on(Node.EventType.TOUCH_START, this.touchCallBack, this);
        
    }
    start() {
        this.getComponent(BoxCollider2D).on(Contact2DType.BEGIN_CONTACT,()=> console.log('collission ...'),this)
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, ()=>console.log('global pipe collision'), this);
        }
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
        console.log(pos )
        pos.y += -dist;
        this.node.setWorldPosition(pos);
    }
}

