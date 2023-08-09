import { Button } from '@fluentui/react-components';
import React, { FC, ReactNode } from 'react';
import SlackIcon from '../AppIcons/SlackIcon';
import {
  MotionAnimations,
  MotionDurations,
  MotionTimings,
} from '@fluentui/theme';

export interface AppTileProps {
  icon?: ReactNode;
}

const AppTile: FC<AppTileProps> = ({ icon, ...props }) => {
  return (
    <>
      <div className="tile">{icon}</div>

      <style jsx>{`
        .tile {
          width: min-content;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color ${MotionTimings.accelerate}
            ${MotionAnimations.fadeIn};
          cursor: pointer;

          &:hover {
            background-color: rgba(255, 255, 255, 0.158);
          }
        }
      `}</style>
    </>
  );
};

export default AppTile;
