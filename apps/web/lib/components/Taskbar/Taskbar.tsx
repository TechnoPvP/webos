import {
  Toolbar,
  ToolbarButton
} from '@fluentui/react-components';
import { Album24Regular } from '@fluentui/react-icons';
import { NeutralColors } from '@fluentui/theme';
import { FC } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TaskbarProps {}

const Taskbar: FC<TaskbarProps> = ({ ...props }) => {
  return (
    <>
      <div className="taskbar-wrapper">
        <Toolbar size="large" style={{ width: '100%' }}>
          <div className="taskbar">
            <div className="taskbar__left">
              <ToolbarButton icon={<Album24Regular />} />
              <ToolbarButton icon={<Album24Regular />} />
              <ToolbarButton icon={<Album24Regular />} />
              <ToolbarButton icon={<Album24Regular />} />
              <ToolbarButton icon={<Album24Regular />} />
            </div>

            <div className="taskbar__right">
              <ToolbarButton icon={<Album24Regular />} />
            </div>
          </div>
        </Toolbar>
      </div>

      <style jsx>{`
        .taskbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }

        .taskbar-wrapper {
          display: flex;
          position: absolute;
          bottom: 0;
          width: 100%;
          background-color: ${NeutralColors.gray190};
          border-top: 1px solid #464646;
        }
      `}</style>
    </>
  );
};

export default Taskbar;
