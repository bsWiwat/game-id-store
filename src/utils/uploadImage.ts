import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const uploadImage = async (image: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imageRef = ref(storage, `products/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(imageUrl);
      }
    );
  });
};

