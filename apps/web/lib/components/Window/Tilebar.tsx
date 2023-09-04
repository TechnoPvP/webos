import { Button, makeStyles } from '@fluentui/react-components';
import React, { ComponentPropsWithRef, FC, PropsWithChildren, forwardRef } from 'react';
import {
  Dismiss16Regular,
  LineHorizontal116Regular,
  Square16Regular,
} from '@fluentui/react-icons';
import { IconButton, styled } from '@fluentui/react';
import { SharedColors } from '@fluentui/theme';

export type TileBarProps = PropsWithChildren & ComponentPropsWithRef<'div'>;

const CustomButton = styled(Button, (props) => ({
  'fui-Button': { backgroundColor: 'red' },
}));

const useButtonStyles = makeStyles<'exitButton' | 'standard'>({
  exitButton: {
    minWidth: '45px',
    height: '35px',
    color: 'rgba(255, 255, 255, 0.543)',
    ':hover': {
      color: 'white',
      backgroundColor: 'red',
    },
    '& .fui-Button__icon': {
      color: 'inherit !important',
    },
  },
  standard: {
    minWidth: '45px',
    height: '35px',
    color: 'rgba(255, 255, 255, 0.543)',
    '& .fui-Button__icon': {
      color: 'inherit !important',
    },
  },
});

const TileBar = forwardRef<HTMLButtonElement, TileBarProps>(
  ({ children, ...props }, ref) => {
    const buttonClasses = useButtonStyles();
    return (
      <>
        <div className="tile-bar" {...props}>
          <div className="left-items">{children}</div>

          <div className="window-actions">
            <Button
              appearance="subtle"
              className={buttonClasses.standard}
              size="medium"
              icon={<LineHorizontal116Regular />}
            ></Button>
            <Button
              appearance="subtle"
              className={buttonClasses.standard}
              size="medium"
              icon={<Square16Regular />}
            ></Button>
            <Button
              appearance="subtle"
              className={buttonClasses.exitButton}
              size="medium"
              icon={<Dismiss16Regular />}
            ></Button>
          </div>
        </div>

        <style jsx>{`
          .tile-bar {
            display: flex;
            width: 100%;
            margin-left: auto;
          }

          .left-items {
            width: 100%;
          }

          .window-actions {
            display: flex;
            align-items: center;
          }
        `}</style>
      </>
    );
  }
);

TileBar.displayName = 'TileBar';

export default TileBar;
