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
    | 'findFileByPath'
    | 'children'
    | 'addFolder'
    | 'createdDate'
    | 'delete'
    | 'driveName'
    | 'findFolderByPath'
    | 'getPathPart'
    | 'name'
    | 'path'
    | 'on'
  > {
  drive: Drive;
}

const emptyFunction = () => null;

const FileSystemContext = createContext<FileSystemContextValue>({} as any);

interface FileSystemProviderProps extends PropsWithChildren {}

const drive = new Drive({ driveName: 'C' });

const users = new Folder({ name: 'Users' });

const adam = new Folder({ name: 'Adam' });
const code = new Folder({ name: 'Code' });
const personalProjects = new Folder({ name: 'Personal Projects' });
const ideaProjects = new Folder({ name: 'Idea Projects' });
const clientProjects = new Folder({ name: 'Client Projects' });
const testingProjects = new Folder({ name: 'Testing Projects' });
const npmPackages = new Folder({ name: 'NPM Packages' });
users.addItem(adam);
adam.addItem(code);
code.addItem(personalProjects);
code.addItem(clientProjects);
code.addItem(testingProjects);
code.addItem(npmPackages);
code.addItem(ideaProjects);

const downloads = new Folder({ name: 'Downloads' });
const pdfFile = new File({ name: 'random.pdf' });
const wordFile = new File({ name: 'word.pdf' });
downloads.addItem(pdfFile);
downloads.addItem(wordFile);

drive.addFolder(users);
drive.addFolder(downloads);
drive.addFolder(new Folder({ name: 'Documents' }));
drive.addFolder(new Folder({ name: 'Pictures' }));
drive.addFolder(new Folder({ name: 'Keys' }));
drive.addFolder(new Folder({ name: 'Music' }));
drive.addFolder(new Folder({ name: 'Videos' }));
drive.addFolder(new Folder({ name: 'Oases Exports' }));
drive.addFolder(new Folder({ name: 'Contacts' }));

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

      console.log('File system updated');
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fileSystem]);

  return (
    <>
      <FileSystemContext.Provider
        value={{
          name: fileSystem.name,
          createdDate: fileSystem.createdDate,
          delete: fileSystem.delete,
          getPathPart: fileSystem.getPathPart,
          path: fileSystem.path,
          addFolder: fileSystem.addFolder.bind(fileSystem),
          findFileByPath: fileSystem.findFileByPath.bind(fileSystem),
          driveName: fileSystem.driveName,
          children: fileSystem.children,
          findFolderByPath: fileSystem.findFolderByPath.bind(fileSystem),
          on: fileSystem.on.bind(fileSystem),
          drive: fileSystem,
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
