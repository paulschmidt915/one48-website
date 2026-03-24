import { auth } from './firebase';
import { signInAnonymously } from 'firebase/auth';

export async function getUid(): Promise<string> {
    if (auth.currentUser) return auth.currentUser.uid;
    const result = await signInAnonymously(auth);
    return result.user.uid;
}
