import { Divider } from '@fluentui/react-components';
import { Drive, FileSystemItem as FileSystemItemType, Folder } from '@webos/filesystem';
import React, { FC } from 'react';
import FileSystemItem from './FileSystemItem';

// TODO: Consider technical name (Navigation Pane)
export interface FileExplorerSidebarProps {
  items: FileSystemItemType[];
  onClickDirectory: (item: Folder) => void;
}

const FileExplorerSidebar: FC<FileExplorerSidebarProps> = ({
  items,
  onClickDirectory: onClickDirectory,
  ...props
}) => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-group"></div>
        <div className="sidebar-group">
          {items.map((item) => {
            if (item instanceof Folder)
              return (
                <FileSystemItem
                  key={item.name}
                  mimeType={'folder'}
                  onClick={() => onClickDirectory(item)}
                >
                  {item.name}
                </FileSystemItem>
              );
          })}
        </div>
        <Divider />
        <div className="sidebar-group"></div>
      </div>

      <style jsx>{`
        .sidebar-group {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};

export default FileExplorerSidebar;
