import { _decorator, Component, log, Node, RigidBody2D, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('gamePlay')
export class gamePlay extends Component {

    dataCha: any = null;

    @property({ type: Node })
    charater: Node | null = null;

    @property({ type: Node })
    btn: Node | null = null;

    @property
    powerJump: number = 8;

    @property
    runSpeed: number = 400;

    @property
    walkSpeed: number = 150;

    start() {
        let t = this;
        t.setEventBtn(true)

    }



    setEventBtn(isAct: boolean) {
        let t = this;

        if (isAct) {
            t.btn?.getChildByName("btn_jump")?.on(Node.EventType.TOUCH_START, t.actionJump, t);
        } else {
            t.btn?.getChildByName("btn_jump")?.off(Node.EventType.TOUCH_START, t.actionJump, t);
        }


    }


    actionRun() {
        let t = this;
        let powerJump = new Vec3(50, 0, 0);
        // t.charater.getComponent(RigidBody2D).applyForce()
        console.log("run")

    }

    actionJump() {
        let t = this;
        let powerJump = new Vec3(0, 50, 0);
        let poOrigin = t.charater?.position;
        t.charater?.setPosition(Vec3.add(new Vec3, poOrigin, powerJump))
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

