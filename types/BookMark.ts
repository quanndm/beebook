import { Comic } from "./Comic"

export type BookMark = {
    $id: string
    userId: string
    comics: Comic[]
}
