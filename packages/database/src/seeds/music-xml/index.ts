import fs from 'fs';
import path from 'path';

type FileName = 'c-major';

export function getMusicXml(fileName: FileName) {
	const pathToMusicXml = path.join(process.cwd(), 'src/seeds/music-xml', fileName + '.xml');
	const musicXml = fs.readFileSync(pathToMusicXml, 'utf-8');

	return musicXml;

}