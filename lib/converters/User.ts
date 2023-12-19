import { db } from "@/firebase";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  query,
  where,
} from "firebase/firestore";
import { User } from "next-auth";

const userConverter: FirestoreDataConverter<User> = {
  toFirestore: function (user: User): DocumentData {
    return {
      ...user,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): User {
    const data = snapshot.data(options);
    const user: User = {
      id: snapshot.id,
      email: data.email,
      image: data.image || "",
      name: data.name,
    };
    return user;
  },
};

export const getUserByEmailRef = (email: string) =>
  query(collection(db, "users"), where("email", "==", email)).withConverter(
    userConverter
  );
