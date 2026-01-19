import { _decorator, Component, log, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gamePlay')
export class gamePlay extends Component {

    dataCha: any = null;

    @property({ type: Node })
    charater = null;

    @property({ type: Node })
    btn = null;


    start() {
        let t = this;
        t.setEventBtn(true)

    }



    setEventBtn(isAct: boolean) {
        let t = this;

        if (isAct) {
            t.btn.getChildByName("btn_jump").on(Node.EventType.TOUCH_START, t.actionJump, t);
        } else {
            t.btn.getChildByName("btn_jump").off(Node.EventType.TOUCH_START, t.actionJump, t);
        }


    }


    actionRun() {
        let t = this;

        // t.charater.getComponent(RigidBody2D).applyForce()
        console.log("run")

    }

    actionJump() {
        let t = this;
        let rigi = t.charater.getComponent(RigidBody2D);
        rigi ?
            rigi.applyForce(new Vec2(0, 100), new Vec2(0, 0), false) : log("WTF");

        console.log("jump")


    }
    actionSit() {
        let t = this;


    }
    actionBack() {
        let t = this;


    }



    update(deltaTime: number) {

    }
}

