import { _decorator, Component, Node, Button,Director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {

    @property({type: Button})
    private btnStart: Button = null;
    
    onLoad(){
        this.btnStart.node.on(Button.EventType.CLICK, this.clickcallback, this);
    }
    start() {
    }

    clickcallback(){
        console.log('click on');
        Director.instance.loadScene('notice');
    }
    update(deltaTime: number) {
        
    }
}
