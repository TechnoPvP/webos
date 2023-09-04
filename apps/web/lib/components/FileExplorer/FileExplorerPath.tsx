import React, { FC } from "react";

export interface FileExplorerPathProps {
  path: string;
}

const FileExplorerPath: FC<FileExplorerPathProps> = ({path, ...props}) => {
  return (
    <>
      <h3>{path}</h3>

      <style jsx>{``}</style>
    </>
  );
};

export default FileExplorerPath;
