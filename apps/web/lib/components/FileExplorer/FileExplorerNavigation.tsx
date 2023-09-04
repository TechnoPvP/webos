import { SearchBox, TextField } from '@fluentui/react';
import { Button } from '@fluentui/react-components';
import React, { FC } from 'react';
import { ArrowLeft16Regular, ArrowRight16Regular } from '@fluentui/react-icons';
import FileExplorerPath from './FileExplorerPath';

export interface FileExplorerNavigationProps {
  path: string
}

const FileExplorerNavigation: FC<FileExplorerNavigationProps> = ({
  path,
  ...props
}) => {
  return (
    <>
      <nav>
        <div className="directions">
          <Button icon={<ArrowLeft16Regular />} appearance="subtle" />
          <Button icon={<ArrowRight16Regular />} appearance="subtle" />
        </div>

        <div className="path">
          <FileExplorerPath path={path} />
        </div>

        <div className="search">
          <TextField
            placeholder="Search Desktop"
            styles={{
              fieldGroup: { backgroundColor: 'transparent' },
            }}
          />
        </div>
      </nav>

      <style jsx>{`
        nav {
          display: grid;
          grid-template-columns: auto 1fr 1fr;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default FileExplorerNavigation;
