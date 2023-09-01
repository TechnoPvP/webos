import { DndContext } from '@dnd-kit/core';
import Image from 'next/image';
import {
  DragEvent,
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Taskbar from '../Taskbar/Taskbar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ScreenProps extends PropsWithChildren {}

const DESKTOP_ICON_SIZE = 48;

const Box: FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // const { attributes, listeners, setNodeRef, transform } = useDraggable({
  //   id: 'draggable',
  // });

  // const style = transform
  //   ? {
  //       transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //     }
  //   : undefined;

  const handleDragStart = () => {
    console.log('Drag start');
  };

  const handleDragEnd = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleDragEnter = () => {
    console.log('Drag enter');
  };

  const handleDrag = (event: DragEvent) => {
    const target = event.target as HTMLElement;
    const clientX = event.clientX;
    const clientY = event.clientY;

    const targetWidth = target.clientWidth;
    const targetHeight = target.clientHeight;

    if (!boxRef.current) return;

    setOffset((prev) => ({
      x: clientX - targetWidth / 2,
      y: clientY - targetHeight / 2,
    }));
  };

  return (
    <>
      <div
        ref={boxRef}
        className="box"
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragEnter={handleDragEnter}
        onDrag={handleDrag}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        // style={style}
        // ref={setNodeRef}
        // {...listeners}
        // {...attributes}
      ></div>

      <style jsx>{`
        .box {
          position: relative;
          width: 30px;
          height: 30px;
          background-color: red;
          z-index: 10;
        }
      `}</style>
    </>
  );
};

interface CellProps extends PropsWithChildren {
  id: string;
}

const Cell: FC<CellProps> = ({ children, id, ...props }) => {
  // const { isOver, setNodeRef } = useDroppable({
  //   id,
  // });
  // const style = {
  //   color: isOver ? 'green' : undefined,
  // };

  return (
    <>
      <div className="cell">{children}</div>

      <style jsx>{`
        .cell {
          position: relative;
          outline: 1px solid rgba(255, 255, 255, 0.237);
          z-index: 1;
          width: 48px;
          height: 48px;
          background-color: #ffffffd;
        }
      `}</style>
    </>
  );
};

const Screen: FC<ScreenProps> = ({ children, ...props }) => {
  const [gridSpaces, setGridSpaces] = useState({ gridRows: 0, gridColumn: 0 });

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const gridColumn = Math.floor(windowWidth / DESKTOP_ICON_SIZE);
    const gridRows = Math.floor(windowHeight / DESKTOP_ICON_SIZE);

    console.log(
      { columns: gridColumn, width: windowWidth },
      { rows: gridRows, height: windowWidth }
    );

    setGridSpaces({
      gridColumn,
      gridRows,
    });
  }, []);

  return (
    <>
      <div className="screen">
        {/* <DndContext
          onDragEnd={(event) => {
            console.log('end', event.over);
            if (event.over && event.over.id === 'droppable') {
              console.log('Dropped', event);
            }
          }}
        > */}
        {/* <Box /> */}

        {/* <Cell /> */}

        {/* <div
            className="children"
            style={{
              gridTemplateColumns: `repeat(${gridSpaces.gridColumn}, 48px)`,
              gridTemplateRows: `repeat(${gridSpaces.gridRows}, 48px)`,
            }}
          > */}
        {/* {Array.from({
              length: gridSpaces.gridColumn * gridSpaces.gridRows,
            }).map((cell, index) => {
              return <Cell id={String(index)} key={index} />;
            })} */}
        {/* </div> */}

        {children}
        {/* </DndContext> */}

        <Taskbar />
      </div>

      <style jsx>{`
        .screen {
          width: 100%;
          height: 100%;
          background-image: url('/images/wave_background.jpg');
          background-position: 50%;
          background-repeat: no-repeat;
        }

        .cells {
          position: absolute;
          display: flex;
          align-items: center;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          border: 1px solid red;
        }

        .children {
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          display: grid;
          position: relative;
        }

        .background-image {
          top: 0;
          left: 0;
          z-index: 0;
          position: absolute;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default Screen;
