import { ChildProcessWithoutNullStreams, spawn } from 'child_process';

export class ProcessController {
  private processes: ChildProcessWithoutNullStreams[] = [];

  constructor() {}

  public async run(command: string, ...args: string[]) {
    return new Promise((resolve, reject) => {
      const process = spawn(command, args);

      if (process) {
        process.stdout!.on('data', (data) => {
          console.log(data.toString());
        });

        process.stderr!.on('data', (data: Buffer) => {
          const error = data.toString();

          console.error(error);

          reject({
            processId: this.processes.length - 1,
            error
          });
        });

        process.on('exit', (code) => {
          if (code === 0) {
            resolve({ processId: this.processes.length - 1 });
          } else {
            reject();
          }
        });
      }

      this.processes.push(process);
    });
  }

  public kill(processId: number) {
    this.processes[processId].kill();
  }

  public killAll() {
    for (const process of this.processes) {
      process.kill();
    }
  }
}
