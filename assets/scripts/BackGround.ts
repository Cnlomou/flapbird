import { _decorator, Component,PhysicsSystem2D,IPhysics2DContact,Collider2D, Node,math,UITransform, Prefab, instantiate,NodePool, tween, BoxCollider, BoxCollider2D, Contact2DType} from 'cc';
const { _utils } = Prefab;
const { ccclass, property } = _decorator;

@ccclass('BackGround')
export class BackGround extends Component {

    @property({type: Node})
    private bg1: Node = null;
    @property({type: Node})
    private bg2: Node = null;
    @property({type: Node})
    private ground: Node = null;
    @property({type: Node})
    private ground2: Node =null;
    private pipes: Node[] = [];
    @property({type: Prefab})
    private pipePrefab: Prefab = null;
    private nodePool : NodePool = null;
    private weight: number = 720;
    private weight_ground: number = 840;
    private limit: number = 0;
    private limit_ground: number = 0;
    private init_ground: math.Vec3;
    private init: math.Vec3;
    private speed: number = 100;
    private jump: boolean = false;
    private speed_bird: number = 70;
    private speed_ground: number = 60;

    private mindis: number = 150;
    private maxdis: number = 200;
    private minY: number = -720;
    private maxY: number = -150;
    onLoad() {
        console.log(this.bg1.position);
        this.init = this.bg1.getPosition();
        this.init_ground = this.ground.getPosition();
        this.limit = this.init.x - this.weight;
        this.limit_ground = this.init_ground.x - this.weight_ground;
        this.nodePool = new NodePool()
        this.schedule(()=> {
            let pipe: Node = instantiate(this.pipePrefab);
            this.pipes.push(pipe)
            this.node.insertChild(pipe,3);
            tween(pipe).by(7,{position: new math.Vec3(-1000, 0, 0)})
            .call(() => {
                pipe.parent.removeChild(pipe);
                console.log('remove child from parent');
            }).start();
            this.setPipePositon(math.random() * (this.maxY - this.minY) + this.minY, math.random() *(this.maxdis - this.mindis) + this.mindis, pipe); 
        }, 5);

        
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
    }
    pipeschange(dt: number) {
        for (let idx in this.pipes) {
            this.pipes[idx].translate(new math.Vec3(-dt * this.speed_ground));
        }
    }
    start() {
        console.log(this.bg1, this.bg2);
        let bc: BoxCollider2D[]= this.getComponentsInChildren(BoxCollider2D);
        for (let idx in bc) {
            bc[idx].on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
        // if (PhysicsSystem2D.instance) {
        //     PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        // }
    }

    setPipePositon(y:number, gap: number, pipe: Node) {
        let v1: math.Vec3 = pipe.getPosition();
        v1.y = y;
        v1.x = 60;
        pipe.setPosition(v1);
        let tp: Node = pipe.getChildByName('top_pipe');
        let pos: math.Vec3 = tp.getPosition();
        tp.setPosition(pos.x, pos.y + gap);
    }

    groundScroll(dt: number) {
        let v1: math.Vec3 = this.ground.getPosition();
        let v2: math.Vec3 = this.ground2.getPosition();
        // console.log(v1,v2);
        if (v1.x <= this.limit_ground) {
            console.log("ssssssssssssssssss");
            this.ground.setPosition(new math.Vec3(v2.x + this.weight_ground,this.init_ground.y,this.init_ground.z))
        }
        if (v2.x <= this.limit_ground) {
            this.ground2.setPosition(new math.Vec3(v1.x + this.weight_ground, this.init_ground.y,this.init_ground.z))
        }
        this.ground.translate(new math.Vec3(-dt * this.speed_ground, 0, 0));        
        this.ground2.translate(new math.Vec3(-dt * this.speed_ground, 0, 0));
    }

    backgroundScroll(dt: number) {
        let v1: math.Vec3 = this.bg1.getPosition();
        let v2: math.Vec3 = this.bg2.getPosition();
        if (this.bg1.getPosition().x <= this.limit) {
            this.bg1.setPosition(new math.Vec3(v2.x + this.weight,this.init.y,this.init.z))
        }
        if (this.bg2.getPosition().x <= this.limit) {
            this.bg2.setPosition(new math.Vec3(v1.x + this.weight, this.init.y,this.init.z))
        }
        this.bg1.translate(new math.Vec3(-dt * this.speed, 0, 0));        
        this.bg2.translate(new math.Vec3(-dt * this.speed, 0, 0));
    }
    update(deltaTime: number) {
        // this.pipeschange(deltaTime)
        this.groundScroll(deltaTime);
        this.backgroundScroll(deltaTime);
        
    }
}

