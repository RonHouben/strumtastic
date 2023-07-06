import fs from 'fs';

interface Options {
  rootDir: string;
  extensions: ('midi' | 'mid' | 'wav')[];
  excludedDirs?: string[];
}

export class FileNameParser {
  private options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  private readDir(dir: string): { name: string; isDir: boolean }[] {
    return fs
      .readdirSync(dir, {
        withFileTypes: true
      })
      .map((f) => ({ name: f.name, isDir: f.isDirectory() }));
  }

  public getFilePaths(dirPath: string = this.options.rootDir) {
    const files: string[] = [];
    const dir = this.readDir(dirPath);

    for (const item of dir) {
      const hasValidExtension = this.options.extensions.find((extension) =>
        item.name.endsWith(extension)
      );

      if (!item.isDir && hasValidExtension) {
        files.push(`${dirPath}/${item.name}`);
      } else if (item.isDir && !this.options.excludedDirs?.includes(item.name)) {
        const nestedFiles = this.getFilePaths(`${dirPath}/${item.name}`);

        files.push(...nestedFiles);
      }
    }

    return files;
  }
}
