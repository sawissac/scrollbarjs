export interface scrollBar {
  onScroll(callback: (e: -1 | 0 | 1) => void): void;
  getScrollPosY(): number;
  getScrollPosX(): number;
  scrollTo(options: "x" | "y", pos: number, behavior: "smooth" | "auto"): void;
  removeScrollBarAction(): void;
}

export class ScrollDetect implements scrollBar {
  private direction: -1 | 0 | 1;
  private position: { pre: number; cur: number };
  private targetElement: { target: Document | Element; root: boolean };
  private scrollAction: () => void;
  constructor(option?: { target: string }) {
    this.position = {
      pre: 0,
      cur: 0,
    };
    if (option === undefined) {
        this.targetElement = {
            target: document,
            root: true,
        };
    }else{
        this.targetElement.target = document.querySelector(option.target);
        this.targetElement.root = false;
    }
}
  public onScroll(callback: (direction: 0 | 1 | -1) => void): void {
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
  public removeScrollBarAction(){
      this.targetElement.target.removeEventListener("scroll",this.scrollAction,true); 
  }
}

