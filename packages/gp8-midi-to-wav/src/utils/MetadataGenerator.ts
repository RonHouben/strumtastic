import * as dfd from 'danfojs-node';

type Options = {
  saveTo: string;
  columns: string[];
};

export class MetadataGenerator {
  private readonly options: Options;

  constructor(options: Options) {
    this.options = options;
  }

  public generate(fileNames: string[]) {
    let df: dfd.DataFrame | null = null;

    for (const fileName of fileNames) {
      const newRows = this.getData(fileName);

      if (newRows) {
        if (!df) {
          df = new dfd.DataFrame(newRows, {
            columns: this.options.columns
          });
        } else {
          df = df.append(newRows, [
            df.values.length,
            df.values.length + 1
          ]) as dfd.DataFrame;
        }
      }

      if (df) {
        this.saveToCsv(df);
      }
    }
  }

  private getData(fileName: string) {
    const isTriad = fileName.includes('1 Triad');

    const chordRoot = this.getChordRoot(fileName, isTriad);
    const chordType = this.getChordType(fileName, isTriad);
    const scaleRoots = this.getScaleRoots(fileName);
    const scaleDegrees = this.getScaleDegrees(fileName, isTriad);

    if (!chordRoot || !chordType || !scaleRoots || !scaleDegrees) {
      console.log({
        fileName,
        chordRoot,
        chordType,
        scaleRoots,
        scaleDegrees,
        isTriad
      });
    }

    if (isTriad && scaleRoots && scaleDegrees && chordRoot && chordType) {
      const isMajor = fileName.includes('1 Triad/Major');

      return [
        [
          chordRoot,
          chordType,
          isMajor ? scaleRoots[0] : scaleRoots[1],
          isMajor ? 'major' : 'minor',
          scaleDegrees[0],
          fileName
        ],[]
      ];
    }

    if (scaleRoots && scaleDegrees && chordRoot && chordType) {
      return [
        [
          chordRoot,
          chordType,
          scaleRoots[0],
          'major',
          scaleDegrees[0],
          fileName
        ],
        [
          chordRoot,
          chordType,
          scaleRoots[1],
          'minor',
          scaleDegrees[1],
          fileName
        ]
      ];
    }
  }

  private getScaleRoots(fileName: string): [string, string] | null {
    const regex = /([A-G][b#]?)(?!\w)(?=(?:[^A-G]|$))/g;
    const matches = fileName.match(regex);

    if (matches) {
      const [major, minor] = matches;
      return [major, minor];
    }
    return null;
  }

  private getScaleDegrees(fileName: string, isTriad: boolean): string[] | null {
    let regex: RegExp;

    if (isTriad) {
      regex = /\/([IV]+|i|ii|iii|iv|v|vi|vii) - /;
    } else {
      regex = /\/([IV]+|i|ii|iii|iv|v|vi|vii)-([IV]+|i|ii|iii|iv|v|vi|vii)\b/;
    }
    const matches = regex.exec(fileName);

    if (matches) {
      if (isTriad) {
        const scaleDegree = matches[1].toUpperCase();
        return [scaleDegree];
      } else {
        const [major, minor] = matches.slice(1);
        return [major.toUpperCase(), minor.toUpperCase()];
      }
    }

    return null;
  }

  private getChordRoot(fileName: string, isTriad: boolean): string | null {
    let regex: RegExp;

    if (isTriad) {
      regex = /([A-G][b#]?)(m|dim)?(?=\.mid$)/;
    } else {
      regex =
        /([A-G][b#]?)(?:m|mM|madd|m7-|M7\+|m6|sus|add|dim|maj|\d-|\d\+1|\d\+|\d|\dsus|add\d)?(?=\d\.mid$)/;
    }

    const matches = regex.exec(fileName);

    if (matches) {
      return matches[1];
    }
    return null;
  }

  private getChordType(fileName: string, isTriad: boolean): string | null {
    const regex =
      /(\d-\d*|\d\+\d*|m\d*|m\d-\d|M\d|M\d-\d|M\d\+\d|mM\d|\dsus\d|\d*|dim\d|dim|maj\d|\d-|\d\+1|\d\+|\d|\dsus|add\*|madd\d*|sus\d)(?=\.mid$)/;

    const matches = regex.exec(fileName);

    if (matches) {
      return isTriad ? matches[0] || 'M' : matches[0];
    }
    return null;
  }

  private saveToCsv(df: dfd.DataFrame) {
    dfd.toCSV(df, { filePath: this.options.saveTo });
  }
}
