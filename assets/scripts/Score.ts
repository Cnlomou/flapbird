import { _decorator, Component, Node, BoxCollider,Collider2D, Contact2DType,IPhysics2DContact, Label,Director, sys } from 'cc';
const { ccclass, property } = _decorator;

export let g_score = {
    curScore: 0,
    maxScore: 0
};
@ccclass('Score')
export class Score extends Component {

    
    @property({type: Label})
    private label: Label = null;
    start() {
        let collider = this.node.parent.getChildByName("bird").getComponent(Collider2D);
        console.log(collider)
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    onLoad() {
       
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        console.log('onBeginContact');
        // if (otherCollider.group == ) {
        //     this.gameOver = true;
        // }
        console.log(otherCollider.group)
        if (otherCollider.group == 16){
            g_score.curScore += 5;
            this.label.string = 'score:' + g_score.curScore;
            this.label.updateRenderData(true);
        }else {
            Director.instance.pause();
            let item:string = sys.localStorage.getItem("maxScore");
            g_score.maxScore = !item ? 0 : parseInt(item);
            if (g_score.maxScore < g_score.curScore) {
                g_score.maxScore = g_score.curScore;
                sys.localStorage.setItem("maxScore", String(g_score.maxScore))
            }
            Director.instance.loadScene('GameOver');
        }
    }
    update(deltaTime: number) {
        
    }
}

