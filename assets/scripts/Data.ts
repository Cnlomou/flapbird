import { _decorator, Component, Node, Label } from 'cc';
import { g_score } from './Score';
const { ccclass, property } = _decorator;

@ccclass('Data')
export class Data extends Component {
    
    onLoad() {
        let score:Label = this.node.getChildByName('score').getComponent(Label);
        let best:Label = this.node.getChildByName('best').getComponent(Label);
        console.log(g_score)
        score.string = String(g_score.curScore);
        best.string = String(g_score.maxScore);
        score.updateRenderData(true)
        score.updateRenderData(true)
    }
    start() {
       
    }

    update(deltaTime: number) {
        
    }
}

