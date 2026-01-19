import { _decorator, Component, Input, input, KeyCode, Node, RigidBody2D, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('playerCtl')
export class playerCtl extends Component {
   @property(Node)
    charater: null|Node = null;

    @property
    runSpeed: number = 400;      // Tốc độ chạy (pixel/s)

    @property
    walkSpeed: number = 150;     // Tốc độ đi bộ chậm (bước ngắn)

    @property
    jumpImpulse: number = 8;     // Impulse nhảy (nhân với mass)

    private rigidbody: null|RigidBody2D = null;
    private isGrounded: boolean = false;
    private isWalking: boolean = false;  // Trạng thái đi bộ chậm

    onLoad() {
        if (this.charater) {
            this.rigidbody = this.charater.getComponent(RigidBody2D);
        }
        if (!this.rigidbody) {
            console.error("Không tìm thấy RigidBody2D!");
        }

        // Đăng ký input (ví dụ: Shift để đi bộ chậm)
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: any) {
        if (event.keyCode === KeyCode.SHIFT_LEFT || event.keyCode === KeyCode.SHIFT_RIGHT) {
            this.isWalking = true;
            console.log("Chuyển sang đi bộ chậm");
        }
    }

    onKeyUp(event: any) {
        if (event.keyCode === KeyCode.SHIFT_LEFT || event.keyCode === KeyCode.SHIFT_RIGHT) {
            this.isWalking = false;
            console.log("Chuyển sang chạy bình thường");
        }
    }

    // Hàm chạy (gọi trong update khi giữ phím trái/phải)
    actionRun(direction: number = 1) {  // direction: 1 phải, -1 trái
        if (!this.rigidbody) return;

        // Chọn tốc độ dựa trên trạng thái isWalking
        const currentSpeed = this.isWalking ? this.walkSpeed : this.runSpeed;

        // Set velocity trực tiếp → mượt, không bị ma sát cản, tốc độ cố định
        const targetVel = new Vec2(currentSpeed * direction, this.rigidbody.linearVelocity.y);
        this.rigidbody.linearVelocity = targetVel;

        console.log(this.isWalking ? "Đi bộ chậm" : "Chạy", "tốc độ:", currentSpeed);
    }

    // Hàm nhảy (giữ nguyên như cũ, nhưng có thể thêm nếu muốn nhảy thấp hơn khi đi bộ)
    actionJump() {
        if (!this.rigidbody || !this.isGrounded) return;

        let impulseY = this.jumpImpulse;
        // Optional: Nhảy thấp hơn khi đi bộ chậm (thêm realism)
        if (this.isWalking) {
            impulseY *= 0.7;  // Giảm 30% lực nhảy khi đi bộ
        }

        const impulse = new Vec2(0, impulseY * 1);
        this.rigidbody.applyLinearImpulseToCenter(impulse, true);

        this.isGrounded = false;
        console.log("Nhảy", this.isWalking ? "(chế độ đi bộ)" : "");
    }

    // Update để xử lý input liên tục
    update(dt: number) {
        let direction = 0;


    }

    // Xử lý chạm đất (giữ nguyên như trước)
    onBeginContact(selfCollider: any, otherCollider: any) {
        // Giả sử tag hoặc layer của sàn là "Ground" (tag=100 ví dụ)
        if (otherCollider.tag === 100 || otherCollider.node.name.includes("Ground")) {
            this.isGrounded = true;
        }
    }

    onEndContact(selfCollider: any, otherCollider: any) {
        if (otherCollider.tag === 100 || otherCollider.node.name.includes("Ground")) {
            this.isGrounded = false;
        }
    }
}

