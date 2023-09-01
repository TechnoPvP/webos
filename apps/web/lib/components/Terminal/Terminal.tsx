import { KeyCodes } from '@fluentui/react';
import { Button, Textarea } from '@fluentui/react-components';
import React, {
  FC,
  useReducer,
  useState,
  KeyboardEvent,
  ChangeEvent,
} from 'react';
import { useFileSystem } from '../../context/file-system/file-system.provider';
import { File, Folder } from '@webos/filesystem';
import { FileNotFoundError } from '@webos/filesystem';

export interface TerminalProps {}

type BufferState = {
  type: 'error' | 'command' | 'buffer';
  message: string;
};

type BufferAction =
  | {
      type: 'command';
      command: string;
    }
  | { type: 'error'; message: string };

const bufferReducer = (
  state: BufferState[],
  action: BufferAction
): BufferState[] => {
  if (action.type === 'command') {
    return [...state, { message: action.command, type: 'command' }];
  }

  return [...state];
};

const MESSAGES = {
  commandNotRecognized: (
    command: string
  ) => `'${command}' is not recognized as an internal or external command,
  operable program or batch file.`,
};

const Terminal: FC<TerminalProps> = ({ ...props }) => {
  const [buffer, bufferDispatch] = useReducer(bufferReducer, []);
  const [propmptHistory, setPromptHistory] = useState<string[]>([]);
  const [filePath, setFilePath] = useState<string>('C:/Users/Adam');
  const [promptValue, setPromptValue] = useState<string>('');

  const fileSystem = useFileSystem();

  const cdCommandHandler = (options: { args: string[] }) => {
    const [cdPath] = options.args;

    try {
      const folder = fileSystem.findFolderByPath(cdPath);
      console.log(folder);
    } catch (error) {
      if (error instanceof FileNotFoundError) {
        console.log('File not found');
      }
    }
  };

  const lsCommandHandler = (options: {args: string[]}) => {
    const [path] = options.args;

    try {
      const folder = fileSystem.findFolderByPath(path)
      console.log(folder?.children.map(child => child.name))

    } catch (error) {
      if (error instanceof FileNotFoundError) {
        console.log('File not found');
      }
    }
  };

  const getCommandArgs = (command: string) => {
    const argParts = command.split(' ');
    const options = argParts.filter(
      (arg) => arg.startsWith('-') || arg.startsWith('--')
    );
    const argsWithoutOptions = argParts.filter((arg) => !options.includes(arg));

    return { args: argsWithoutOptions, options };
  };

  const handleCommand = (command: string) => {
    const { args, options } = getCommandArgs(command);
    const [commandString, ...commandArgs] = args;

    if (commandString.toLowerCase() === 'cd') {
      cdCommandHandler({ args: commandArgs });
    }

    if (commandString.toLowerCase() === 'ls') {
      lsCommandHandler({args: commandArgs});
    }

    bufferDispatch({ type: 'command', command: `${filePath}>${command}` });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || !promptValue) return;
    event.preventDefault();

    setPromptHistory((history) => [...history]);
    handleCommand(promptValue);
    setPromptValue('');
  };

  const handlePromptChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPromptValue(event.target.value);
  };

  return (
    <>
      <div className="terminal-wrapper">
        <div className="buffer">
          <Button
            onClick={() =>
              fileSystem.addFolder(new Folder({ name: 'some file' }))
            }
          >
            Add
          </Button>
          {buffer.map((line, i) => {
            return <span key={i}>{line.message}</span>;
          })}
        </div>

        <textarea
          className="terminal"
          name="terminal"
          // cols={30}
          // rows={10}
          value={promptValue}
          onKeyDown={handleKeyDown}
          onChange={handlePromptChange}
        ></textarea>
      </div>

      <style jsx>{`
        .terminal-wrapper {
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr auto;
          position: absolute;
          width: 500px;
          height: 500px;
          top: 50%;
          left: 50%;
          border-radius: var(--radius-window);
          transform: translate(-50%, -50%);
          background-color: #282c34;
        }

        .buffer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 8px 10px;
        }

        .terminal {
          width: 100%;
          height: 100%;
          background-color: transparent;
          color: #bbbfc4;
          height: 50px;
          font-size: 14px;
          outline: none;
          border: none;
          resize: none;
          border: 1px solid white;
          border-radius: inherit;
        }

        .terminal::-webkit-scrollbar {
          width: 2px;
          background-color: transparent;
        }

        .terminal::-webkit-scrollbar-thumb {
          background-color: #9f9f9f;
          border-radius: 20px;
        }
      `}</style>
    </>
  );
};

export default Terminal;
