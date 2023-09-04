import React, {
  FC,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import TileBar from './Tilebar';
import { styled } from '@fluentui/react';

export interface WindowProps extends PropsWithChildren {
  label: string;
  screenState?: 'maximized' | 'minimized';
  defaultWindowWidth?: number;
  defaultWindowHeight?: number;
  isOpen?: boolean;
  backgroundColor?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

interface WindowPosition {
  x: number;
  y: number;
}

/**
 * Window container
 */
const Window: FC<WindowProps> = ({
  label,
  defaultWindowHeight = 500,
  defaultWindowWidth = 600,
  screenState,
  children,
  backgroundColor = '#191919',
  onClose,
  onMaximize,
  onMinimize,
  ...props
}) => {
  const [windowWidth, setWindowWidth] = useState<number>(defaultWindowWidth);
  const [windowHeight, setWindowHeight] = useState<number>(defaultWindowHeight);
  const [position, setPosition] = useState<WindowPosition>({ x: 0, y: 0 });

  const windowRef = useRef<HTMLDivElement | null>(null);
  const isMovingWindow = useRef(false);
  const initialPos = useRef({ mouseX: 0, mouseY: 0, windowX: 0, windowY: 0 });

  const handleWindowMouseDown: MouseEventHandler = (event) => {
    isMovingWindow.current = true;

    initialPos.current = {
      mouseX: event.clientX,
      mouseY: event.clientY,
      windowX: position.x,
      windowY: position.y,
    };
  };

  const handleWindowMouseUp = () => {
    isMovingWindow.current = false;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isMovingWindow.current) return;

    const deltaX = event.clientX - initialPos.current.mouseX;
    const deltaY = event.clientY - initialPos.current.mouseY;

    setPosition((pos) => {
      return {
        x: initialPos.current.windowX + deltaX,
        y: initialPos.current.windowY + deltaY,
      };
    });
  };

  useEffect(() => {
    addEventListener('mousemove', handleMouseMove);
    addEventListener('mouseup', handleWindowMouseUp);

    setPosition({
      x: (window.innerWidth - windowWidth) / 2,
      y: (window.innerHeight - windowHeight) / 2,
    });

    return () => {
      removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={windowRef}
        className="window"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <TileBar onMouseDown={handleWindowMouseDown} />
        <div
          className="content no-select"
          onDrag={(event) => event.preventDefault()}
        >
          {children}
        </div>
      </div>

      <style jsx>{`
        .window {
          position: fixed;
          top: 0px;
          left: 0px;
          width: ${windowWidth}px;
          height: ${windowHeight}px;
          background-color: ${backgroundColor};
        }
      `}</style>
    </>
  );
};

export default Window;
