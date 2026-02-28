import { Container, Graphics, Rectangle, FederatedPointerEvent } from "pixi.js";
import { sliderConfig } from "./Slider.config";

export class Slider extends Container {
  private track: Graphics;
  private thumb: Graphics;
  private min: number;
  private max: number;
  private _value: number;
  private onChange?: (v: number) => void;
  private dragging = false;

  constructor(
    width = sliderConfig.width,
    min = 0,
    max = 1,
    initial = 0.5,
    onChange?: (v: number) => void,
  ) {
    super();

    this.min = min;
    this.max = max;
    this._value = Math.max(min, Math.min(max, initial));
    this.onChange = onChange;

    // track
    this.track = new Graphics();
    this.track.rect(0, 0, width, sliderConfig.height);
    this.track.fill(sliderConfig.trackColor);

    // thumb
    this.thumb = new Graphics();
    this.thumb.circle(0, 0, sliderConfig.thumbRadius);
    this.thumb.fill(sliderConfig.thumbColor);

    this.thumb.y = sliderConfig.height / 2;
    this.thumb.x = this.valueToPosition(this._value, width);

    this.addChild(this.track, this.thumb);

    // interaction
    this.track.interactive = true;
    this.track.cursor = "pointer";
    this.track.hitArea = new Rectangle(0, 0, width, sliderConfig.height);
    this.track.on("pointerdown", this.onPointerDownTrack.bind(this));

    this.thumb.interactive = true;
    this.thumb.cursor = "pointer";
    this.thumb.on("pointerdown", this.onPointerDownThumb.bind(this));
    this.thumb.on("pointerup", this.onPointerUp.bind(this));
    this.thumb.on("pointerupoutside", this.onPointerUp.bind(this));
    this.thumb.on("pointermove", this.onDrag.bind(this));
  }

  private valueToPosition(value: number, width: number): number {
    const pct = (value - this.min) / (this.max - this.min);
    return pct * width;
  }

  private positionToValue(pos: number, width: number): number {
    const pct = pos / width;
    return this.min + pct * (this.max - this.min);
  }

  private updateThumb(pos: number) {
    const w = this.track.width;
    pos = Math.max(0, Math.min(pos, w));
    this.thumb.x = pos;
    const newVal = this.positionToValue(pos, w);
    if (newVal !== this._value) {
      this._value = newVal;
      this.onChange?.(this._value);
    }
  }

  private onPointerDownTrack(e: FederatedPointerEvent) {
    const local = e.data.getLocalPosition(this.track);
    this.updateThumb(local.x);
  }

  private onPointerDownThumb(_e: FederatedPointerEvent) {
    this.dragging = true;
  }

  private onDrag(e: FederatedPointerEvent) {
    if (!this.dragging) return;
    const local = e.data.getLocalPosition(this.track);
    this.updateThumb(local.x);
  }

  private onPointerUp() {
    this.dragging = false;
  }

  set value(v: number) {
    this._value = Math.max(this.min, Math.min(this.max, v));
    this.updateThumb(this.valueToPosition(this._value, this.track.width));
  }

  get value(): number {
    return this._value;
  }

  static async create(
    width = sliderConfig.width,
    min = 0,
    max = 1,
    initial = 0.5,
    onChange?: (v: number) => void,
  ): Promise<Slider> {
    // no async work, kept for API consistency
    return new Slider(width, min, max, initial, onChange);
  }
}
