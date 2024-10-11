import { Client, Account, ID, Avatars, Databases, Query, Storage, ImageGravity } from 'react-native-appwrite';
import { APPWRITE_DATABASE_ID, APPWRITE_ENDPOINT, APPWRITE_FILE_STORAGE_ID, APPWRITE_PLATFORM, APPWRITE_PROJECT_ID, APPWRITE_USER_COLLECTION_ID } from '@env'
import { RegisterForm, User } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '@/store';

const appwriteConfig = {
    endpoint: APPWRITE_ENDPOINT,
    projectId: APPWRITE_PROJECT_ID,
    platform: APPWRITE_PLATFORM,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
    fileStorageId: APPWRITE_FILE_STORAGE_ID
}

const appwriteClient = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)

const account = new Account(appwriteClient);
const avatars = new Avatars(appwriteClient);
const databases = new Databases(appwriteClient);
const storage = new Storage(appwriteClient);


// function to handle authen - author
const logIn = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error(error)
        throw new Error('Error signing in')
    }
}

const logOut = async () => {
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

const getCurrentUser = async () => {
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

const logOutAllSessions = async () => {
    try {
        const result = await account.deleteSessions();
        return result;
    } catch (error) {
        console.error(error)
        throw new Error('Error signing out all sessions')
    }
}

const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
        const result = await account.updatePassword(newPassword, currentPassword);
        return result;
    } catch (error) {
        console.error(error)
        throw new Error('Error updating password')
    }
}

//  file
const uploadFile = async (file: ImagePicker.ImagePickerAsset) => {
    if (!file) return

    const { mimeType, fileName, uri, fileSize } = file;
    const asset = { type: mimeType!, name: fileName!, size: fileSize!, uri: uri };

    try {
        const response = await storage.createFile(
            appwriteConfig.fileStorageId,
            ID.unique(),
            asset
        );

        const fileUrl = storage.getFilePreview(
            appwriteConfig.fileStorageId,
            response.$id,
        )


        return { fileUrl, fileId: response.$id };
    } catch (error) {
        console.error(error)
        throw new Error('Error uploading file')
    }
}

const updateAvatar = async (file: ImagePicker.ImagePickerAsset, user: User) => {
    try {
        const response = await uploadFile(file);

        if (user.avatarId) {
            await storage.deleteFile(appwriteConfig.fileStorageId, user.avatarId)
        }

        const result = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            user?.$id!,
            {
                avatar: response?.fileUrl,
                avatarId: response?.fileId
            }
        )

        return result;
    } catch (error) {
        console.log(error)
    }

}


// use this to handle function about authen - author
const auth = {
    logIn,
    logOut,
    createUser,
    getCurrentUser,
    updateAvatar,
    logOutAllSessions,
    updatePassword,

}

// export all functions
export const Appwrite = {
    auth,
}

// #TODO: test change avatar, update password
// #TODO: design database for translation team
//  post, comment, translationTeam, translationTeam_detail, comic_category, comic, comic_chapter, bookmark, history