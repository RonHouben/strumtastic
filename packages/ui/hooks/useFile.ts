export function useFile() {
  return {
    getFileData: (file: File) => {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        try {
          reader.onload = (e) => {
            const fileData = e.target!.result;

            resolve(fileData);
          };

          reader.readAsText(file);
        } catch (error) {
					reject(error)
				}
      });
    }
  };
}
