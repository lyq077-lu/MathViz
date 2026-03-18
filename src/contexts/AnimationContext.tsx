import { createContext, useContext, useState, type ReactNode } from 'react';

// Define state for each topic
export interface TrigonometryState {
  angle: number;
  setAngle: (angle: number | ((prev: number) => number)) => void;
  showSine: boolean;
  setShowSine: (show: boolean) => void;
  showCosine: boolean;
  setShowCosine: (show: boolean) => void;
}

export interface LinearState {
  slope: number;
  setSlope: (slope: number | ((prev: number) => number)) => void;
  intercept: number;
  setIntercept: (intercept: number) => void;
}

export interface QuadraticState {
  a: number;
  setA: (a: number) => void;
  b: number;
  setB: (b: number) => void;
  c: number;
  setC: (c: number) => void;
  showVertex: boolean;
  setShowVertex: (show: boolean) => void;
  showRoots: boolean;
  setShowRoots: (show: boolean) => void;
  showAxis: boolean;
  setShowAxis: (show: boolean) => void;
}

export interface PythagoreanState {
  a: number;
  setA: (a: number) => void;
  b: number;
  setB: (b: number) => void;
  animationStep: number;
  setAnimationStep: (step: number) => void;
}

export interface CircleState {
  h: number;
  setH: (h: number) => void;
  k: number;
  setK: (k: number) => void;
  r: number;
  setR: (r: number) => void;
  showRadius: boolean;
  setShowRadius: (show: boolean) => void;
  pointP: { x: number; y: number };
  setPointP: (p: { x: number; y: number }) => void;
}

interface AnimationContextType {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  reset: () => void;
  registerReset: (resetFn: () => void) => void;
  activeTopic: string;
  setActiveTopic: (topic: string) => void;
  // Topic states
  trigState: TrigonometryState;
  linearState: LinearState;
  quadraticState: QuadraticState;
  pythagoreanState: PythagoreanState;
  circleState: CircleState;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTopic, setActiveTopic] = useState('trigonometry');
  const [resetFn, setResetFn] = useState<(() => void) | null>(null);

  // Trigonometry state
  const [trigAngle, setTrigAngle] = useState(0);
  const [trigShowSine, setTrigShowSine] = useState(true);
  const [trigShowCosine, setTrigShowCosine] = useState(true);

  // Linear state
  const [linearSlope, setLinearSlope] = useState(1);
  const [linearIntercept, setLinearIntercept] = useState(0);

  // Quadratic state
  const [quadA, setQuadA] = useState(1);
  const [quadB, setQuadB] = useState(0);
  const [quadC, setQuadC] = useState(0);
  const [quadShowVertex, setQuadShowVertex] = useState(true);
  const [quadShowRoots, setQuadShowRoots] = useState(true);
  const [quadShowAxis, setQuadShowAxis] = useState(true);

  // Pythagorean state
  const [pythA, setPythA] = useState(3);
  const [pythB, setPythB] = useState(4);
  const [pythStep, setPythStep] = useState(0);

  // Circle state
  const [circleH, setCircleH] = useState(0);
  const [circleK, setCircleK] = useState(0);
  const [circleR, setCircleR] = useState(3);
  const [circleShowRadius, setCircleShowRadius] = useState(true);
  const [circlePointP, setCirclePointP] = useState({ x: 2, y: 2 });

  const reset = () => {
    setIsPlaying(false);
    // Reset all topic states
    setTrigAngle(0);
    setTrigShowSine(true);
    setTrigShowCosine(true);
    setLinearSlope(1);
    setLinearIntercept(0);
    setQuadA(1);
    setQuadB(0);
    setQuadC(0);
    setQuadShowVertex(true);
    setQuadShowRoots(true);
    setQuadShowAxis(true);
    setPythA(3);
    setPythB(4);
    setPythStep(0);
    setCircleH(0);
    setCircleK(0);
    setCircleR(3);
    setCircleShowRadius(true);
    setCirclePointP({ x: 2, y: 2 });
    if (resetFn) {
      resetFn();
    }
  };

  const registerReset = (fn: () => void) => {
    setResetFn(() => fn);
  };

  const trigState: TrigonometryState = {
    angle: trigAngle,
    setAngle: setTrigAngle,
    showSine: trigShowSine,
    setShowSine: setTrigShowSine,
    showCosine: trigShowCosine,
    setShowCosine: setTrigShowCosine,
  };

  const linearState: LinearState = {
    slope: linearSlope,
    setSlope: setLinearSlope,
    intercept: linearIntercept,
    setIntercept: setLinearIntercept,
  };

  const quadraticState: QuadraticState = {
    a: quadA, setA: setQuadA,
    b: quadB, setB: setQuadB,
    c: quadC, setC: setQuadC,
    showVertex: quadShowVertex, setShowVertex: setQuadShowVertex,
    showRoots: quadShowRoots, setShowRoots: setQuadShowRoots,
    showAxis: quadShowAxis, setShowAxis: setQuadShowAxis,
  };

  const pythagoreanState: PythagoreanState = {
    a: pythA, setA: setPythA,
    b: pythB, setB: setPythB,
    animationStep: pythStep, setAnimationStep: setPythStep,
  };

  const circleState: CircleState = {
    h: circleH, setH: setCircleH,
    k: circleK, setK: setCircleK,
    r: circleR, setR: setCircleR,
    showRadius: circleShowRadius, setShowRadius: setCircleShowRadius,
    pointP: circlePointP, setPointP: setCirclePointP,
  };

  return (
    <AnimationContext.Provider value={{
      isPlaying, setIsPlaying, reset, registerReset,
      activeTopic, setActiveTopic,
      trigState, linearState, quadraticState, pythagoreanState, circleState,
    }}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
}
