import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import IUserRepositoryPort from '../../application/ports/IUserRepositoryPort';
import UserEntity from '../../domain/entities/UserEntity';
import {firebaseAuth, firebaseDB} from '../../../../config/firebase.config';
import {collection, doc, getDoc, getDocs, setDoc} from 'firebase/firestore';

class UserRepositoryAdapter implements IUserRepositoryPort {
  async authenticate(user: UserEntity): Promise<UserEntity | null> {
    try {
      const userCredentials: UserCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        user.email,
        user.password,
      );

      const userEntity = await this.findById(userCredentials.user.uid);

      return userEntity;
    } catch (error) {
      return null;
    }
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const userCredentials: UserCredential =
      await createUserWithEmailAndPassword(
        firebaseAuth,
        user.email,
        user.password,
      );

    const userData = {
      _id: userCredentials.user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      providerData: userCredentials.user.providerData[0],
    };

    setDoc(doc(firebaseDB, 'users', userCredentials.user.uid), userData);

    return new UserEntity(
      userCredentials.user.uid,
      user.firstName,
      user.lastName,
      user.email,
      '',
      userCredentials.user.providerData[0],
    );
  }

  async list(): Promise<UserEntity[]> {
    const snapshots = await getDocs(collection(firebaseDB, 'users'));

    return snapshots.docs.map(snapshot => {
      const data = snapshot.data();

      return data as UserEntity;
    });
  }

  async findById(id: string): Promise<UserEntity | null> {
    const userDoc = await getDoc(doc(firebaseDB, 'users', id));

    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();

    return new UserEntity(
      userDoc.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      '',
      userData.providerData,
    );
  }
}

export default UserRepositoryAdapter;
