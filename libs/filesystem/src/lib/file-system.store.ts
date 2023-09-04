import { Subject, BehaviorSubject } from 'rxjs';
import { FileNotFoundError } from './errors/errors';

export type FileSystemItemType = 'folder' | 'file' | 'drive';

export abstract class FileSystemItem {
  abstract path: string;
  abstract type: FileSystemItemType;
  abstract parent?: FileSystemItem;
  abstract createdDate?: Date;
  abstract name: string;
  abstract delete(): void;
}

export class BaseFileItem {
  readonly subject = new Subject();
  public renderCount = 0;

  update(item: FileSystemItem) {
    this.subject.next(++this.renderCount);
  }

  on(callback: () => void) {
    const subscription = this.subject.subscribe(() => callback());

    return subscription;
  }
}

export class File extends BaseFileItem implements FileSystemItem {
  fileType!: string;
  name: string;
  path!: string;
  type!: FileSystemItemType;
  parent!: FileSystemItem;
  createdDate?: Date | undefined;

  constructor(params: { name: string }) {
    super();

    this.name = params.name;
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }
}

export interface FolderParams {
  name: string;
}

export class Folder extends BaseFileItem implements FileSystemItem {
  public children: FileSystemItem[] = [];
  public parent?: FileSystemItem;

  name: string;
  path: string;
  type!: FileSystemItemType;
  createdDate!: Date;
  modifiedDate!: Date;

  constructor(params: FolderParams) {
    super();

    this.name = params.name;
    this.path = '';
    this.type = 'folder';
    this.createdDate = new Date()
    this.modifiedDate = new Date()
  }

  addItem(item: FileSystemItem) {
    item.parent = this;
    this.children.push(item);
    this.update(item);

    return item;
  }

  getPath() {
    const parts: string[] = [];
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let current: FileSystemItem | undefined = this;

    while (current) {
      if (current?.name) parts.push(current?.name);
      current = current.parent;
    }

    return parts.reverse().join('/');
  }

  delete(): void {
    throw new Error('Method not implemented.');
  }
}

export class Drive extends BaseFileItem implements FileSystemItem, Folder {
  driveName!: string;
  children: FileSystemItem[] = [];
  parent?: FileSystemItem = undefined;
  name!: string;
  path!: string;
  type!: FileSystemItemType;
  createdDate!: Date;
  modifiedDate!: Date;

  delete(): void {
    throw new Error('Method not implemented.');
  }

  constructor(params: { driveName: string }) {
    super();

    this.name = `${params.driveName}:`;
    this.driveName = `${params.driveName}:`;
    this.type = 'drive';
    this.path = 'C:';
    this.createdDate = new Date();
  }

  addItem(item: FileSystemItem): FileSystemItem {
    throw new Error('Method not implemented.');
  }

  getPath(): string {
    throw new Error('Method not implemented.');
  }

  getPathPart(path: string) {
    const parts = path.trim().split('/');

    const isRootSearch = !parts[0]?.trim();
    const isDirectorySearch = parts[0] === '.';

    const filteredParts = parts.filter((part, index) =>
      (isRootSearch || isDirectorySearch) && index === 0 ? false : true
    );

    return { isRootSearch, isDirectorySearch, filteredParts };
  }

  findFolderByPath(path: string, params?: { folder?: Folder }): Folder | null {
    const { filteredParts, isRootSearch } = this.getPathPart(path);

    let queue: FileSystemItem[] =
      isRootSearch || !params?.folder
        ? [...this.children]
        : [...params.folder.children];
    let depth = 0;

    if (!queue.length)
      throw new FileNotFoundError(`Unable to locate file from path ${path}`);

    while (queue.length) {
      const part = filteredParts[depth];
      const removed = queue.shift();

      if (removed?.name === part && removed instanceof Folder) {
        if (depth >= filteredParts.length - 1) return removed;

        queue = [...removed.children];
        depth++;
      }
    }

    return null;
  }

  findFileByPath(path: string, params?: { folder?: Folder }): File | null {
    const { filteredParts, isRootSearch } = this.getPathPart(path);

    let queue: FileSystemItem[] =
      isRootSearch || !params?.folder
        ? [...this.children]
        : [...params.folder.children];
    let depth = 0;

    if (!queue.length)
      throw new FileNotFoundError(`Unable to locate file from path ${path}`);

    while (queue.length) {
      const part = filteredParts[depth];
      const removed = queue.shift();

      if (removed?.name === part && removed instanceof File) return removed;

      if (removed?.name === part && removed instanceof Folder) {
        queue = [...removed.children];
        depth++;
      }
    }

    return null;
  }

  addFolder(folder: Folder, path?: string) {
    folder.parent = this;
    this.children.push(folder);
    this.update(folder);
    return;
  }
}

// const drive = new Drive({ driveName: 'C' });

// const users = new Folder({ name: 'Users' });

// const adam = new Folder({ name: 'Adam' });
// const code = new Folder({ name: 'Code' });
// const personalProjects = new Folder({ name: 'Personal Projects' });
// const ideaProjects = new Folder({ name: 'Idea Projects' });
// users.addItem(adam);
// adam.addItem(code);
// code.addItem(personalProjects);
// code.addItem(ideaProjects);

// const downloads = new Folder({ name: 'Downloads' });
// const pdfFile = new File({ name: 'random.pdf' });
// const wordFile = new File({ name: 'word.pdf' });
// downloads.addItem(pdfFile);
// downloads.addItem(wordFile);

// drive.addFolder(users);
// drive.addFolder(downloads);

// const result = drive.findFolderByPath('./Code', { folder: adam });
// console.log(result?.name);
