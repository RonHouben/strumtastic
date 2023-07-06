import { FileNameParser } from './utils/FileNameParser';
import { ProcessController } from './utils/ProcessController';

const fileNameParser = new FileNameParser({
  rootDir: 'src/midi-chords',
  extensions: ['mid'],
  excludedDirs: ['1 Triad', '2 7th and 9th', '4 Progression']
});

const processController = new ProcessController();

main();

async function main() {
  const fileNames = fileNameParser.getFilePaths();
  const startBatch = 1000;
  const batchSize = 1688;

  // batches of 180 files will take about 1 hour to process
  console.time(`total time for ${batchSize} files`);

  for (const [index, fileName] of fileNames
    .slice(startBatch, startBatch + batchSize)
    .entries()) {
    console.time(fileName);

    const percentageCompleted = (index + 1) * (100 / fileNames.length);

    console.log(
      `processing file ${index + 1}/${
        fileNames.length
      } (${percentageCompleted}%)`
    );

    try {
      await processController.run('osascript', './appleScript.scpt', fileName);
    } catch (err) {
      const error = err as { processId: number; error: string };
      console.error(error.error);
    }

    console.timeEnd(fileName);
  }

  console.timeEnd(`total time for ${batchSize} files`);
}
