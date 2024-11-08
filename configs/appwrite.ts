import { Client, Account, ID, Avatars, Databases, Query, Storage, ImageGravity, Permission, Role } from 'react-native-appwrite';
import {
    APPWRITE_DATABASE_ID,
    APPWRITE_ENDPOINT,
    APPWRITE_FILE_STORAGE_ID,
    APPWRITE_PLATFORM,
    APPWRITE_PROJECT_ID,
    APPWRITE_USER_COLLECTION_ID,
    APPWRITE_TRANSLATION_TEAM_COLLECTION_ID,
    APPWRITE_COMIC_CATEGORY_COLLECTION_ID,
    APPWRITE_COMIC_COLLECTION_ID,
    APPWRITE_COMIC_CHAPTER_COLLECTION_ID,
    APPWRITE_COMIC_CHAPTER_CONTENT_COLLECTION_ID,
    APPWRITE_COMIC_CHAPTER_CONTENT_IMAGE_COLLECTION_ID
} from '@env'
import { Comic, ComicCategory, FormCreateComic, FormCreateTeam, RegisterForm, Team, User } from '@/types';
import * as ImagePicker from 'expo-image-picker';
import { ChapterContent, ChapterContentImage, ComicChapter } from '@/types/Comic';


const appwriteConfig = {
    endpoint: APPWRITE_ENDPOINT,
    projectId: APPWRITE_PROJECT_ID,
    platform: APPWRITE_PLATFORM,
    databaseId: APPWRITE_DATABASE_ID,
    userCollectionId: APPWRITE_USER_COLLECTION_ID,
    translationTeamCollectionId: APPWRITE_TRANSLATION_TEAM_COLLECTION_ID,
    comicCategoryCollectionId: APPWRITE_COMIC_CATEGORY_COLLECTION_ID,
    fileStorageId: APPWRITE_FILE_STORAGE_ID,
    comicCollectionId: APPWRITE_COMIC_COLLECTION_ID,
    comicChapterCollectionId: APPWRITE_COMIC_CHAPTER_COLLECTION_ID,
    comicChapterContentCollectionId: APPWRITE_COMIC_CHAPTER_CONTENT_COLLECTION_ID,
    comicChapterContentImageCollectionId: APPWRITE_COMIC_CHAPTER_CONTENT_IMAGE_COLLECTION_ID
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
const uploadFileAndGetReviewUrl = async (file: ImagePicker.ImagePickerAsset) => {
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

const uploadFileAndGetViewUrl = async (file: ImagePicker.ImagePickerAsset) => {
    if (!file) return

    const { mimeType, fileName, uri, fileSize } = file;
    const asset = { type: mimeType!, name: fileName!, size: fileSize!, uri: uri };

    try {
        const response = await storage.createFile(
            appwriteConfig.fileStorageId,
            ID.unique(),
            asset
        );

        const fileUrl = storage.getFileView(
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
        const response = await uploadFileAndGetReviewUrl(file);

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

// translationTeam
const createTeam = async (form: FormCreateTeam) => {
    try {
        const response = await uploadFileAndGetReviewUrl(form.file);

        const newTeam = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.translationTeamCollectionId,
            ID.unique(),
            {
                name: form.name,
                avatar: response?.fileUrl,
                avatarId: response?.fileId,
                owner: form.owner.$id,
                members: [
                    form.owner.$id,
                ],
                dateCreated: new Date().toISOString(),
                invitationCode: form.invitationCode
            },
            form.owner.$permissions
        )
        // [
        //     Permission.read(Role.any()),
        //     Permission.write(Role.any()),
        //     Permission.delete(Role.user(form.owner.$id))
        // ]
        return newTeam;
    } catch (error) {
        console.log(error)
    }
}

const jointTeam = async (code: string, user: User) => {
    try {
        const team = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.translationTeamCollectionId,
            [Query.equal('invitationCode', code)]
        )
        if (!team) {
            throw new Error('Error getting team')
        }

        const teamId = team.documents[0].$id;
        const members = team.documents[0].members;
        members.push(user.$id);
        const result = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.translationTeamCollectionId,
            teamId,
            {
                members
            },
            user.$permissions
        )

        return result;
    } catch (error) {
        console.log(error)
    }
}

const leaveTeam = async (team: Team, user: User) => { }

const getTeamInfo = async (teamId: string) => {
    try {
        const team = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.translationTeamCollectionId,
            teamId
        )
        return team;
    } catch (error) {
        console.log(error)
    }
}

// Comic category

const getComicCategories = async (): Promise<ComicCategory[] | undefined> => {
    try {
        const categories = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId
        )

        if (!categories.documents) {
            return undefined
        }

        return categories.documents as unknown as ComicCategory[]
    } catch (error) {
        console.log(error)
    }
}

const createComicCategory = async (name: string) => {
    try {
        const res = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            ID.unique(),
            {
                name
            }
        )
        return res
    } catch (error) {
        console.log(error)
    }
}

const updateNameComicCategory = async (id: string, name: string) => {
    try {
        const res = await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            id,
            {
                name
            }
        )
        return res
    } catch (error) {
        console.log(error)
    }
}

const deleteComicCategory = async (id: string) => {
    try {
        const res = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            id
        );
        const category = res as unknown as ComicCategory;
        if (category.totalComic > 0) {
            throw new Error('Category has comic')
        }
        const result = await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            id
        )
        return result;
    } catch (error) {

    }
}

// Comic
const getAllComics = async () => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId
        )

        if (!res.documents) {
            return []
        }

        return res.documents as unknown as Comic[]
    } catch (error) {
        throw new Error("Error getting comics" + error);
    }
}
const getComics = async (translationTeam: Team) => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            [Query.equal('translationTeam', translationTeam.$id)]
        )

        if (!res.documents) {
            return []
        }

        return res.documents as unknown as Comic[]
    } catch (error) {
        throw new Error("Error getting comics");
    }
}

const getComic = async (id: string) => {
    try {
        const res = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            id
        )
        return res as unknown as Comic;
    } catch (error) {
        throw new Error("Error getting comic");
    }
}

const createComics = async (form: FormCreateComic) => {
    try {
        const response = await uploadFileAndGetViewUrl(form.file);

        const newComic = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            ID.unique(),
            {
                name: form.name,
                description: form.description,
                comicCategory: form.category.$id,
                translationTeam: form.translationTeam.$id,
                totalChapter: 0,
                thumbnail: response?.fileId,
                thumbnailUrl: response?.fileUrl,
                type: form.type
            }
        )
        // update total comic in category
        const category = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            form.category.$id
        )
        const totalComic = category.totalComic + 1;
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            form.category.$id,
            {
                totalComic
            }
        )
        return newComic as unknown as Comic;
    } catch (error) {
        throw new Error("Error creating comic");
    }
}

const updateComics = async (comic: Partial<Comic> & { file?: ImagePicker.ImagePickerAsset }) => {

    if (comic.file) {
        await storage.deleteFile(appwriteConfig.fileStorageId, comic.thumbnail!)

        const response = await uploadFileAndGetViewUrl(comic.file);
        comic.thumbnail = response?.fileId;
        comic.thumbnailUrl = (response?.fileUrl as unknown as string);
    }
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            comic?.$id!,
            {
                name: comic.name,
                description: comic.description,
                comicCategory: comic.comicCategory?.$id,
                thumbnail: comic.thumbnail,
                thumbnailUrl: comic.thumbnailUrl,
                totalChapter: comic.totalChapter,
                type: comic.type
            }
        )
    } catch (error) {
        throw new Error("Error updating comic");
    }
}

const deleteComic = async (id: string, team: Team, categoryId: string) => {
    try {
        // kiểm tra chapter có tồn tại thì xoá
        const res = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            id
        )
        if (res?.totalChapter > 0) {
            throw new Error('Comic has chapter')
        }

        // delete thumbnail
        await storage.deleteFile(appwriteConfig.fileStorageId, res.thumbnail)

        await databases.deleteDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            id
        )

        // update total comic in category
        const category = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            categoryId
        )
        const totalComic = category.totalComic - 1;
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCategoryCollectionId,
            category?.$id,
            {
                totalComic
            }
        )

    } catch (error) {
        throw new Error("Error deleting comic" + error);
    }
}

const searchComic = async (query: string) => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            [Query.search('name', query)]
        )

        if (!res.documents) {
            return []
        }

        return res.documents as unknown as Comic[]
    } catch (error) {
        throw new Error("Error searching comic" + error);
    }
}
// chapter
const getChapters = async (comicId: string) => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterCollectionId,
            [Query.equal('comicId', comicId)]
        )

        if (!res.documents) {
            return []
        }

        return res.documents as unknown as ComicChapter[]
    } catch (error) {
        throw new Error("Error getting chapters: " + error);
    }
}

//  use this function to get chapter content - novel
const getChapter = async (chapterId: string) => {
    try {
        const res = await databases.getDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterCollectionId,
            chapterId
        )

        return res as unknown as ComicChapter;
    } catch (error) {
        throw new Error("Error getting chapter: " + error);
    }
}

const getChapterContent = async (chapterId: string) => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterContentCollectionId,
            [Query.equal('chapterId', chapterId)]
        )
        if (!res.documents) {
            return undefined
        }
        return res.documents[0] as unknown as ChapterContent;
    } catch (error) {
        throw new Error("Error getting chapter content: " + error);
    }
}


//  use this function to get chapter content - comic
const getChapterContentImages = async (comicId: string, chapterId: string) => {
    try {
        const res = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterContentImageCollectionId,
            [Query.and([Query.equal('comicId', comicId), Query.equal('chapterId', chapterId)]), Query.orderAsc("order")]
        )

        if (!res.documents) {
            return []
        }

        return res.documents as unknown as ChapterContentImage[]
    } catch (error) {
        throw new Error("Error getting chapter content images: " + error);
    }
}

const createChapterNovel = async (chapterComic: Omit<Partial<ComicChapter>, "$id">, chapterContent: Omit<Partial<ChapterContent>, "$id">, comic: Comic) => {
    try {
        // create chapter
        const comicChapter = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterCollectionId,
            ID.unique(),
            {
                comicId: comic.$id,
                chapterNumber: chapterComic.chapterNumber,
                name: chapterComic.name,
                type: chapterComic.type
            }
        )
        // create chapter content
        const res = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterContentCollectionId,
            ID.unique(),
            {
                ...chapterContent,
                chapterId: comicChapter.$id
            }
        )

        // update total chapter in comic
        const totalChapter = comic.totalChapter + 1;
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            comic.$id!,
            {
                totalChapter
            }
        )


        return res as unknown as ChapterContent;
    } catch (error) {
        throw new Error("Error creating chapter: " + error);
    }
}

// WARNING: test this function
const createChapterComic = async (chapterContent: Omit<ChapterContentImage, "$id" | "imageId" | "imageUrl">,
    ImageOrder: {
        order: number,
        image: ImagePicker.ImagePickerAsset
    }[], comic: Comic) => {
    try {
        for (let item of ImageOrder) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await uploadFileAndGetViewUrl(item.image);
            await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.comicChapterContentImageCollectionId,
                ID.unique(),
                {
                    ...chapterContent,
                    order: item.order,
                    imageId: response?.fileId,
                    imageUrl: response?.fileUrl
                }
            );
        }

        // update total chapter in comic
        const totalChapter = comic.totalChapter + 1;
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicCollectionId,
            comic.$id!,
            {
                totalChapter
            }
        )
    } catch (error) {
        console.log(error)
    }
}

const updateChapterNovel = async (comicChapter: Partial<ComicChapter>, chapterContent: Partial<ChapterContent>) => {
    try {
        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterCollectionId,
            comicChapter.$id!,
            {
                name: comicChapter.name
            }
        )

        await databases.updateDocument(
            appwriteConfig.databaseId,
            appwriteConfig.comicChapterContentCollectionId,
            chapterContent.$id!,
            {
                content: chapterContent.content
            }
        )
    } catch (error) {
        console.log(error)
    }
}

const deleteChapterContent = async (chapterContent: ChapterContent, comic: Comic) => {
    try {
        if (comic.totalChapter == chapterContent.chapterNumber) {

            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.comicChapterContentCollectionId,
                chapterContent.$id!
            )

            // update total chapter in comic
            const totalChapter = comic.totalChapter - 1;
            await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.comicCollectionId,
                comic.$id!,
                {
                    totalChapter
                }
            )
        }
    } catch (error) {
        throw new Error("Error deleting chapter: " + error);
    }
}
//  authen - author
const auth = {
    logIn,
    logOut,
    createUser,
    getCurrentUser,
    updateAvatar,
    logOutAllSessions,
    updatePassword,

}

//  team
const team = {
    createTeam,
    jointTeam,
    getTeamInfo,
    leaveTeam
}

// comic
const comic = {
    searchComic,
    getAllComics,
    getComicCategories,
    createComicCategory,
    updateNameComicCategory,
    deleteComicCategory,
    getComics,
    getComic,
    createComics,
    updateComics,
    deleteComic
}

// chapter
const chapter = {
    getChapter,
    getChapters,
    getChapterContent,
    getChapterContentImages,
    createChapterComic,
    createChapterNovel,
    updateChapterNovel,
    deleteChapterContent
}

// export all functions
export const Appwrite = {
    auth,
    team,
    comic,
    chapter
}

//  post, comment, translationTeam, comic_category, comic, comic_chapter, bookmark, history