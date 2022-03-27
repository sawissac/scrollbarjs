export class ScrollDetect {
    constructor(option) {
        this.position = {
            pre: 0,
            cur: 0,
        };
        if (option === undefined) {
            this.targetElement = {
                target: document,
                root: true,
            };
        }
        else {
            this.targetElement.target = document.querySelector(option.target);
            this.targetElement.root = false;
        }
    }
    onScroll(callback) {
        let scrollAction = () => {
            this.position.cur = this.getScrollPosY();
            if (this.position.cur > this.position.pre) {
                this.direction = 1;
                this.position.pre = this.position.cur;
            }
            if (this.position.cur < this.position.pre) {
                this.direction = -1;
                this.position.pre = this.position.cur;
            }
            if (this.position.cur === 0) {
                this.direction = 0;
            }
            callback(this.direction);
        };
        this.scrollAction = scrollAction;
        this.targetElement.target.addEventListener("scroll", scrollAction, true);
    }
    getScrollPosY() {
        if (this.targetElement.root === true) {
            let ele = this.targetElement.target;
            return ele.scrollingElement.scrollTop;
        }
        if (this.targetElement.root === false) {
            let ele = this.targetElement.target;
            return ele.scrollTop;
        }
    }
    getScrollPosX() {
        if (this.targetElement.root === true) {
            let ele = this.targetElement.target;
            return ele.scrollingElement.scrollLeft;
        }
        if (this.targetElement.root === false) {
            let ele = this.targetElement.target;
            return ele.scrollLeft;
        }
    }
    scrollTo(options, pos, behavior) {
        if (options === "y") {
            document.scrollingElement.scrollTo({
                top: pos,
                left: this.getScrollPosX(),
                behavior: behavior === undefined ? "smooth" : "auto",
            });
        }
        if (options === "x") {
            document.scrollingElement.scrollTo({
                top: this.getScrollPosY(),
                left: pos,
                behavior: behavior === undefined ? "smooth" : "auto",
            });
        }
    }
    removeScrollBarAction() {
        this.targetElement.target.removeEventListener("scroll", this.scrollAction, true);
    }
}
