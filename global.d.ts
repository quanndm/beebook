/// <reference types="nativewind/types" />

declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

declare module '*.jpg' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

declare module '*.gif' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
}

declare module '@env' {
    export const APPWRITE_ENDPOINT: string;
    export const APPWRITE_PROJECT_ID: string;
    export const APPWRITE_PLATFORM: string;
    export const APPWRITE_DATABASE_ID: string;
    export const APPWRITE_USER_COLLECTION_ID: string;
    export const APPWRITE_FILE_STORAGE_ID: string;
    export const APPWRITE_TRANSLATION_TEAM_COLLECTION_ID: string;
    export const APPWRITE_COMIC_CATEGORY_COLLECTION_ID: string;
    export const APPWRITE_COMIC_COLLECTION_ID: string;
    export const APPWRITE_COMIC_CHAPTER_COLLECTION_ID: string;
    export const APPWRITE_COMIC_CHAPTER_CONTENT_COLLECTION_ID: string;
    export const APPWRITE_COMIC_CHAPTER_CONTENT_IMAGE_COLLECTION_ID: string;
}