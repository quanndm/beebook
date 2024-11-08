import { Team } from "./Team";
import * as ImagePicker from 'expo-image-picker';

export type ComicType = "comic" | "novel"

export type ComicCategory = {
    $id: string;
    name: string;
    totalComic: number;
}

export type Comic = {
    $id: string;
    name: string;
    description: string;
    comicCategory?: ComicCategory;
    translationTeam: Team;
    totalChapter: number;
    thumbnail: string;
    thumbnailUrl: string;
    type: ComicType;
}

export type ComicChapter = {
    $id: string;
    comicId: string;
    name: string;
    type: ComicType;
    chapterNumber: number;
    $createdAt?: string;
    $updatedAt?: string
}


export type ChapterContent = {
    $id: string;
    comicId: string;
    chapterId: string;
    chapterNumber: number;
    content: string;
}

export type ChapterContentImage = {
    $id: string;
    comicId: string;
    chapterId: string;
    chapterNumber: number;
    order: number;
    imageId: string;
    imageUrl: string;
}

export type FormCreateComic = {
    name: string;
    description: string;
    category: ComicCategory;
    translationTeam: Team;
    file: ImagePicker.ImagePickerAsset;
    type: ComicType;
}