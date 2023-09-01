/* eslint-disable @typescript-eslint/no-empty-interface */
import { Drive, File, FileSystemItem, Folder } from '@webos/filesystem';
import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

interface FileSystemContextValue
  extends Pick<
    Drive,
    | 'addFile'
    | 'addFolder'
    | 'deleteFolder'
    | 'findFile'
    | 'driveName'
    | 'deleteFile'
    | 'findFileByPath'
    | 'findFolder'
    | 'findFolderByPath'
    | 'items'
    | 'on'
  > {}

const emptyFunction = () => null;

const FileSystemContext = createContext<FileSystemContextValue>({} as any);

interface FileSystemProviderProps extends PropsWithChildren {}

const drive = new Drive({ driveName: 'C' });

const users = new Folder({ name: 'Users' });

const adam = new Folder({ name: 'Adam' });
const code = new Folder({ name: 'Code' });
const personalProjects = new Folder({ name: 'Personal Projects' });
const ideaProjects = new Folder({ name: 'Idea Projects' });
users.addItem(adam);
adam.addItem(code);
code.addItem(personalProjects);
code.addItem(ideaProjects);

const downloads = new Folder({ name: 'Downloads' });
const pdfFile = new File({ name: 'random.pdf' });
const wordFile = new File({ name: 'word.pdf' });
downloads.addItem(pdfFile);
downloads.addItem(wordFile);

drive.addFolder(users);
drive.addFolder(downloads);

const result = drive.findFolderByPath('./Code', { folder: adam });
console.log(result?.name);


export const FileSystemProvider: FC<FileSystemProviderProps> = ({
  children,
  ...props
}) => {
  // const { current: fileSystem } = useRef(new Drive({ driveName: 'C' }));
  const [fileSystem, setDrive] = useState<Drive>(drive);
  const [version, setVersion] = useState<number>(0);

  useEffect(() => {
    const subscription = fileSystem.on(() => {
      setVersion((version) => version + 1);

      console.log(fileSystem);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <FileSystemContext.Provider
        value={{
          addFile: fileSystem.addFile.bind(fileSystem),
          addFolder: fileSystem.addFolder.bind(fileSystem),
          deleteFile: fileSystem.deleteFile.bind(fileSystem),
          deleteFolder: fileSystem.deleteFile.bind(fileSystem),
          findFile: fileSystem.findFile.bind(fileSystem),
          findFileByPath: fileSystem.findFileByPath.bind(fileSystem),
          findFolder: fileSystem.findFolder.bind(fileSystem),
          driveName: fileSystem.driveName,
          items: fileSystem.items,
          findFolderByPath: fileSystem.findFolderByPath.bind(fileSystem),
          on: fileSystem.on.bind(fileSystem),
        }}
      >
        {children}
      </FileSystemContext.Provider>
    </>
  );
};

export const useFileSystem = () => {
  const functions = useContext(FileSystemContext);

  return functions;
};
