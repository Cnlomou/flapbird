import { _decorator, Component, Node,Director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tap')
export class Tap extends Component {
    start() {

    }
    onLoad(){
        this.node.on(Node.EventType.TOUCH_START, this.tapTouch, this);
    }
    tapTouch() {
        Director.instance.loadScene('Game');
    }
    update(deltaTime: number) {
        
    }
}

