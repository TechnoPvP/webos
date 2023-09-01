import {
  DirectoryNotFoundError,
  FileNotFoundError,
  InvalidFileNameError,
} from './errors/errors';

export type FileSystemItemType = 'folder' | 'file';

abstract class FileSystemItem {
  abstract path: string;
  abstract size: number;
  abstract type: FileSystemItemType;
  abstract createdDate?: Date;
  abstract delete(): void;
}

export class File implements FileSystemItem {}

export class Folder implements FileSystemItem {}

export class DiskDrive {}

export class FileSystem {
  private readonly rootDrive = new Map<string, FileSystemItem[]>([[':C', []]]);

  constructor() {
    // TODO: Unimplemented
  }


  addFolder(folder: Folder, directory: string) {
    const drive = this.rootDrive.set(directory, []);

    return drive;
  }

  getPath(path: string) {
    const entity = this.rootDrive.get(path);

    return entity;
  }

  moveFileSystemEntity(entity: FileSystemItem, path: string) {
    const movingPath = this.rootDrive.get(path);
    const originPath = this.rootDrive.get(entity.path);

    if (!movingPath)
      throw new DirectoryNotFoundError(`Unable to locate directory ${path}`);

    if (!originPath)
      throw entity.type === 'file'
        ? new DirectoryNotFoundError(
            `Unable to determine directory you're attempting to move ${entity.path}`
          )
        : new FileNotFoundError(`Unable to locate file ${entity.path}`);

    this.rootDrive.set(
      entity.path,
      originPath.filter((originEntity) => originEntity.path !== entity.path)
    );
    this.rootDrive.set(path, [...movingPath, entity]);
  }
}
