declare module '@studio-freight/lenis' {
  export default class Lenis {
    constructor(options?: {
      duration?: number;
      easing?: (t: number) => number;
      orientation?: 'vertical' | 'horizontal';
      gestureOrientation?: 'vertical' | 'horizontal';
      smoothWheel?: boolean;
      wheelMultiplier?: number;
      touchMultiplier?: number;
      infinite?: boolean;
      lerp?: number;
    });
    raf(time: number): void;
    destroy(): void;
    on(event: string, callback: (e: any) => void): void;
    stop(): void;
    start(): void;
    scrollTo(target: any, options?: any): void;
  }
}
