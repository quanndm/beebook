import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_ENDPOINT, APPWRITE_PLATFORM, APPWRITE_PROJECT_ID, APPWRITE_USER_COLLECTION_ID } from '@env'
import { RegisterForm } from '@/types';

const appwriteConfig = {
    endpoint: APPWRITE_ENDPOINT,
    projectId: APPWRITE_PROJECT_ID,
    platform: APPWRITE_PLATFORM,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
}

const appwriteClient = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

const account = new Account(appwriteClient);
const avatars = new Avatars(appwriteClient);
const databases = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);

const logIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error(error)
        throw new Error('Error signing in')
    }
}

export const logOut = async () => {
    try {
        const session = await account.deleteSession('current');

        return session;
    } catch (error) {
        console.error(error)
        throw new Error('Error signing out')
    }
}

const createUser = async (form: Omit<RegisterForm, "confirmPassword">) => {
    try {
        const newAccount = await account.create(ID.unique(), form.email, form.password, form.username)

        if (!newAccount.$id)
            throw new Error('Error creating account')

        const avatarUrl = avatars.getInitials(form.username);

        await logIn(form.email, form.password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                username: form.username,
                email: form.email,
                avatar: avatarUrl,
            }
        )

        return newUser;
    } catch (error) {
        throw error
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if (!currentAccount) {
            throw new Error('Error getting account')
        }

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) {
            throw new Error('Error getting user')
        }
        return currentUser.documents[0];
    } catch (error) {
        console.error(error)
    }
}

// use this to handle function about authen - author
const auth = {
    logIn,
    logOut,
    createUser,
    getCurrentUser
}

export const Appwrite = {
    appwriteClient,
    account,
    avatars,
    databases,
    storage,
    appwriteConfig,
    auth
}