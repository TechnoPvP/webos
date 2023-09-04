import { NeutralColors } from '@fluentui/theme';
import classNames from 'classnames';
import React, { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

type SystemItemType = 'folder' | 'image' | 'web' | 'pdf' | 'word' | 'unknown';

const SYSTEM_ITEM_ICON_MAP: { [key in SystemItemType]?: ReactNode } = {
  folder: '📁',
  pdf: '📃',
  image: '📃',
  web: '🌐',
  word: '📄',
  unknown: '📃',
};

const getFileIcon = (mimeType: string) => {
  if (!mimeType) return SYSTEM_ITEM_ICON_MAP['unknown'];

  const lowerCaseMimeType = mimeType?.toLowerCase();

  if (lowerCaseMimeType === 'folder') return SYSTEM_ITEM_ICON_MAP['folder'];
  if (lowerCaseMimeType.includes('image')) return SYSTEM_ITEM_ICON_MAP['image'];
  if (lowerCaseMimeType.includes('pdf')) return SYSTEM_ITEM_ICON_MAP['pdf'];
  if (lowerCaseMimeType.includes('web')) return SYSTEM_ITEM_ICON_MAP['web'];
};

export interface FileSystemItemProps extends PropsWithChildren {
  mimeType: string;
  iconOverride?: ReactNode;
  onDoubleClick?: () => void;
  onClick?: () => void;
  size?: 'small' | 'medium';
}

const FileSystemItem: FC<FileSystemItemProps> = ({
  mimeType,
  children,
  iconOverride,
  size = 'small',
  onDoubleClick,
  onClick,
  ...props
}) => {
  const icon = getFileIcon(mimeType);

  return (
    <>
      <button
        className={classNames('item', `size--${size}`)}
        onDoubleClick={onDoubleClick}
        onClick={onClick}
      >
        <span>{icon}</span>
        <span>{children}</span>
      </button>

      <style jsx>{`
        button {
          appearance: none;
          background-color: transparent;
          border: none;
          outline: none;
          color: ${NeutralColors.gray10};
        }

        .item {
          display: flex;
          align-items: center;
          gap: 4px;
          border-radius: 2px;

          &:hover {
            background-color: #4d4d4d;
          }

          &:focus {
            background-color: #4d4d4d;
          }
          &:focus:hover {
            background-color: #777777;
          }
        }

        .size--small {
          padding: 4px;
        }
      `}</style>
    </>
  );
};

export default FileSystemItem;
