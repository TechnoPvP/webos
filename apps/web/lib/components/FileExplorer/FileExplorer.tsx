import React, { FC, useEffect, useState } from 'react';
import FileExplorerSidebar from './FileExplorerSidebar';
import { useFileSystem } from '../../context/file-system/file-system.provider';
import {
  FileSystemItem as FileSystemItemType,
  Folder,
} from '@webos/filesystem';
import FileSystemItem from './FileSystemItem';
import FileExplorerNavigation from './FileExplorerNavigation';
import FileExplorerRibbon, {
  FileExplorerRibbonProps,
  SortOrder,
  SortType,
} from './FileExplorerRibbon';

export interface FileExplorerProps {}

const FileExplorer: FC<FileExplorerProps> = ({ ...props }) => {
  const { children: items, addFolder, drive } = useFileSystem();
  const [activeDirectoryItems, setActiveDirectoryItems] = useState<
    FileSystemItemType[]
  >([]);
  const [activeDirectory, setActiveDirectory] = useState<Folder>(drive);
  const [currentPath, setCurrentPath] = useState<string>('C:/');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [sortType, setSortType] = useState<SortType>('dateModified');

  const handleItemClick = (item: FileSystemItemType) => {
    if (item instanceof Folder) {
      setActiveDirectoryItems(item.children);
      setActiveDirectory(item);
      setCurrentPath(item.getPath());
      console.log(item.path);
    }
  };

  const handleChangeSort: FileExplorerRibbonProps['onChangeSort'] = (
    params
  ) => {
    if (params.type === 'name') {
      setActiveDirectoryItems((items) =>
        [...items].sort((a, z) =>
          params.order === 'desc'
            ? a.name.localeCompare(z.name)
            : z.name.localeCompare(a.name)
        )
      );
      return;
    }

    if (params.type === 'title') {
      setActiveDirectoryItems((items) =>
        [...items].sort((a, z) =>
          params.order === 'desc'
            ? a.name.localeCompare(z.name)
            : z.name.localeCompare(a.name)
        )
      );
      return;
    }
  };

  const handleNewFile: FileExplorerRibbonProps['onNewFileItem'] = (type) => {
    if (type === 'folder') {
      activeDirectory.addItem(new Folder({ name: `File Name ${Math.random()}` }))
    }
  };

  useEffect(() => {
    handleChangeSort({ order: sortOrder, type: sortType });
  }, [sortOrder, sortType]);

  return (
    <>
      <div className="explorer">
        <div className="explorer__ribbon">
          <FileExplorerRibbon
            sortType={sortType}
            sortOrder={sortOrder}
            onNewFileItem={handleNewFile}
            onChangeSort={(params) => setSortType(params.type)}
            onChangeSortOrder={(params) => setSortOrder(params)}
          />
        </div>

        <div className="explorer__options">
          <FileExplorerNavigation path={currentPath} />
        </div>

        <div
          className="pane"
          onDoubleClick={() => console.log('Double clicked')}
        >
          <FileExplorerSidebar
            items={items}
            onClickDirectory={handleItemClick}
          />

          <div className="pane__main">
            {activeDirectoryItems.map((item) => (
              <FileSystemItem
                mimeType={item.type}
                key={item.name}
                onDoubleClick={() => handleItemClick(item)}
              >
                {item.name}
              </FileSystemItem>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .explorer {
          display: flex;
          flex-direction: column;
        }

        .pane {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default FileExplorer;
