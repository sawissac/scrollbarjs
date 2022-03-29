export interface scrollBar {
  onScroll(
    callback: (direction: { scrollY: -1 | 0 | 1; scrollX: -1 | 0 | 1 }) => void
  ): void;
  getScrollPosY(): number;
  getScrollPosX(): number;
  scrollTo(options: "x" | "y", pos: number, behavior: "smooth" | "auto"): void;
  removeScrollBarAction(): void;
}

export class ScrollDetect implements scrollBar {
  private direction: { scrollY: -1 | 0 | 1; scrollX: -1 | 0 | 1 };
  private positionY: { pre: number; cur: number };
  private positionX: { pre: number; cur: number };
  private targetElement: { target: Document | Element; root: boolean };
  private scrollAction: () => void;
  constructor(option?: { target: string }) {
    this.direction = {
      scrollX: 0,
      scrollY: 0
    }
    this.positionY = {
      pre: 0,
      cur: 0,
    };
    this.positionX = {
      pre: 0,
      cur: 0,
    };
    if (option === undefined) {
      this.targetElement = {
        target: document,
        root: true,
      };
    } else {
      this.targetElement.target = document.querySelector(option.target);
      this.targetElement.root = false;
    }
  }
  public onScroll(
    callback: (direction: { scrollY: -1 | 0 | 1; scrollX: -1 | 0 | 1 }) => void
  ): void {
    let scrollAction = () => {
      this.positionY.cur = this.getScrollPosY();

      if (this.positionY.cur > this.positionY.pre) {
        this.direction.scrollY = 1;
        this.positionY.pre = this.positionY.cur;
      }
      if (this.positionY.cur < this.positionY.pre) {
        this.direction.scrollY = -1;
        this.positionY.pre = this.positionY.cur;
      }
      if (this.positionY.cur === 0) {
        this.direction.scrollY = 0;
      }

      this.positionX.cur = this.getScrollPosX();

      if (this.positionX.cur > this.positionX.pre) {
        this.direction.scrollX = 1;
        this.positionX.pre = this.positionX.cur;
      }
      if (this.positionX.cur < this.positionX.pre) {
        this.direction.scrollX = -1;
        this.positionX.pre = this.positionX.cur;
      }
      if (this.positionX.cur === 0) {
        this.direction.scrollX = 0;
      }

      callback(this.direction);
    };
    this.scrollAction = scrollAction;
    this.targetElement.target.addEventListener("scroll", scrollAction, true);
  }
  public getScrollPosY(): number {
    if (this.targetElement.root === true) {
      let ele = this.targetElement.target as Document;
      return ele.scrollingElement!.scrollTop;
    }
    if (this.targetElement.root === false) {
      let ele = this.targetElement.target as Element;
      return ele.scrollTop;
    }
  }
  public getScrollPosX(): number {
    if (this.targetElement.root === true) {
      let ele = this.targetElement.target as Document;
      return ele.scrollingElement!.scrollLeft;
    }
    if (this.targetElement.root === false) {
      let ele = this.targetElement.target as Element;
      return ele.scrollLeft;
    }
  }
  public scrollTo(
    options: "x" | "y",
    pos: number,
    behavior?: "smooth" | "auto"
  ): void {
    if (options === "y") {
      document.scrollingElement!.scrollTo({
        top: pos,
        left: this.getScrollPosX(),
        behavior: behavior === undefined ? "smooth" : "auto",
      });
    }
    if (options === "x") {
      document.scrollingElement!.scrollTo({
        top: this.getScrollPosY(),
        left: pos,
        behavior: behavior === undefined ? "smooth" : "auto",
      });
    }
  }
  public removeScrollBarAction() {
    this.targetElement.target.removeEventListener(
      "scroll",
      this.scrollAction,
      true
    );
  }
}
