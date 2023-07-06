import { FileNameParser } from './utils/FileNameParser';
import { MetadataGenerator } from './utils/MetadataGenerator';

main();

function main() {
  const fileNameParser = new FileNameParser({
    rootDir: 'src/midi-chords',
    extensions: ['mid'],
    excludedDirs: ['2 7th and 9th', '4 Progression']
  });

  const metadataGenerator = new MetadataGenerator({
    saveTo: 'src/metadata.csv',
    columns: [
      'chordRoot',
      'chordType',
      'scaleRoot',
      'scaleTonality',
      'scaleDegree',
      'audioFile'
    ]
  });

  const fileNames = fileNameParser.getFilePaths();

  metadataGenerator.generate(fileNames);
}
