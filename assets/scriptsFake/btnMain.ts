import { _decorator, Color, Component, EventTouch, log, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btnMain')
export class btnMain extends Component {

    @property({ type: [Node] })
    listBtn: Node[] = []



    start() {
        let t = this;
        t.resgeterEvent();
    }

    resgeterEvent() {
        let t = this;
        t.listBtn.forEach(e => {
            e.on(Node.EventType.TOUCH_START, t.eventUI, t);
            let sprite = e.getComponent(Sprite);
            if (sprite) {
                sprite.color = new Color(255, 255, 255, e.name == "map" ? 255 : 170);
            }
        })
    }

    eventUI(e: any) {
        let t = this;

        let nameBtn = e.target.name;
        t.listBtn.forEach(e => {
            let sprite = e.getComponent(Sprite);
            if (sprite) {
                sprite.color = new Color(255, 255, 255, e.name == nameBtn ? 255 : 170);
            }
        })


        // call direct làm sau


    }



    update(deltaTime: number) {

    }
}

