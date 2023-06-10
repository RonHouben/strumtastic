import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { firebase } from '..';

type Collection = 'Exercises';

type Result<T> = T | undefined;

export async function getDocumentById<T>(collection: Collection, id: string): Promise<Result<T>> {
		const db = getFirestore(firebase);
    let docRef = doc(db, collection, id);

    let result: Result<T> = undefined;
    let error = null;

    try {
        const doc = await getDoc(docRef);
				result = doc.data() as Result<T>;
    } catch (e) {
        error = e;
    }

    return JSON.parse(JSON.stringify(result));
}

// export async function getAllDocuments<T>(collectionName: Collection): Promise<T[]> {
  // const db = getFirestore(firebase);
  // get all documents from collection using firestore
  // const collection = collection(db, collectionName)
// }