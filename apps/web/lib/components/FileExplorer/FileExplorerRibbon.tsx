import {
  Button,
  Divider,
  Menu,
  MenuCheckedValueChangeData,
  MenuCheckedValueChangeEvent,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuSplitGroup,
  MenuTrigger,
  Tooltip,
} from '@fluentui/react-components';
import React, { FC } from 'react';
import {
  Cut20Regular,
  AddCircle16Regular,
  Copy20Regular,
  Rename20Regular,
  Share20Regular,
  Delete20Regular,
} from '@fluentui/react-icons';

export type SortType =
  | 'name'
  | 'status'
  | 'dateModified'
  | 'type'
  | 'size'
  | 'dateCreated'
  | 'authors'
  | 'tags'
  | 'title';

export type SortOrder = 'asc' | 'desc';
export type FileItemType = 'word' | 'folder';

const SORT_ORDERS: { [key in SortType]: { label: string } } = {
  name: { label: 'Name' },
  dateModified: { label: 'Date modified' },
  type: { label: 'Type' },
  size: { label: 'Size' },
  dateCreated: { label: 'Date created' },
  authors: { label: 'Authors' },
  status: { label: 'Categories' },
  tags: { label: 'Tags' },
  title: { label: 'Title' },
};


type OnChangeSortParams = { type: SortType; order: 'asc' | 'desc' };

export interface FileExplorerRibbonProps {
  onChangeSort: (params: OnChangeSortParams) => void;
  onChangeSortOrder?: (order: SortOrder) => void;
  onNewFileItem: (type: FileItemType) => void;
  sortOrder?: SortOrder;
  sortType: SortType;
}

const FileExplorerRibbon: FC<FileExplorerRibbonProps> = ({
  onChangeSort,
  onChangeSortOrder,
  onNewFileItem,
  sortType = 'name',
  sortOrder = 'asc',
  ...props
}) => {
  const handleChangeRadioValue = (
    e: MenuCheckedValueChangeEvent,
    data: MenuCheckedValueChangeData
  ) => {
    if (data.name === 'sort')
      onChangeSort({
        type: data.checkedItems[0] as SortType,
        order: 'asc',
      });
    if (data.name === 'order') {
      console.log(data);
      onChangeSortOrder &&
        onChangeSortOrder(data.checkedItems?.[0] as SortOrder);
    }
  };
  return (
    <>
      <div className="ribbon">
        <Menu>
          <MenuTrigger>
            <Button
              appearance="subtle"
              size="small"
              icon={<AddCircle16Regular />}
              iconPosition="before"
            >
              New
            </Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              <MenuItem onClick={() => onNewFileItem('folder')}>Folder</MenuItem>
              <MenuItem onClick={() => onNewFileItem('word')}>Microsoft Word Document</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>

        <Tooltip content="Cut" relationship="label">
          <Button icon={<Cut20Regular />} appearance="subtle" />
        </Tooltip>

        <Tooltip content="Copy" relationship="label">
          <Button icon={<Copy20Regular />} appearance="subtle" />
        </Tooltip>

        <Tooltip content="Rename" relationship="label">
          <Button icon={<Rename20Regular />} appearance="subtle" />
        </Tooltip>

        <Tooltip content="Delete" relationship="label">
          <Button icon={<Delete20Regular />} appearance="subtle" />
        </Tooltip>

        <Menu
          checkedValues={{ sort: [sortType], order: [sortOrder] }}
          onCheckedValueChange={handleChangeRadioValue}
        >
          <MenuTrigger>
            <Button appearance="subtle">Sort</Button>
          </MenuTrigger>

          <MenuPopover>
            <MenuList>
              {Object.entries(SORT_ORDERS)
                .slice(0, 3)
                .map(([key, value]) => (
                  <MenuItemRadio key={key} value={key} name="sort">
                    {value.label}
                  </MenuItemRadio>
                ))}

              <Menu
                hoverDelay={500}
                checkedValues={{ sort: [sortType] }}
                onCheckedValueChange={handleChangeRadioValue}
              >
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem checkmark="">More</MenuItem>
                </MenuTrigger>

                <MenuPopover>
                  <MenuList>
                    {Object.entries(SORT_ORDERS)
                      .slice(3)
                      .map(([key, value]) => (
                        <MenuItemRadio key={key} value={key} name="sort">
                          {value.label}
                        </MenuItemRadio>
                      ))}
                  </MenuList>
                </MenuPopover>
              </Menu>

              <MenuDivider />

              <MenuItemRadio name="order" value="asc">
                Ascending
              </MenuItemRadio>

              <MenuItemRadio name="order" value="desc">
                Descending
              </MenuItemRadio>

              <MenuDivider />

              <Menu hoverDelay={500}>
                <MenuTrigger disableButtonEnhancement>
                  <MenuItem checkmark="">Group</MenuItem>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem>Name</MenuItem>
                    <MenuItem>Status</MenuItem>
                    <MenuItem>Date modified</MenuItem>
                    <MenuItem>Type</MenuItem>
                    <MenuItem>Size</MenuItem>
                    <MenuItem>Date created</MenuItem>
                    <MenuItem>Authors</MenuItem>
                    <MenuItem>Tag</MenuItem>
                    <MenuItem>Title</MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
      <style jsx>{`
        .ribbon {
          width: auto;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 14px;
          background-color: #2c2c2c;
        }
      `}</style>
    </>
  );
};

export default FileExplorerRibbon;
