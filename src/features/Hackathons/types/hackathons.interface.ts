export interface Hackathon {
    id: number
    title: string
    date: string
    location: string
    description: string
    cover_image: string
    topics: Array<{
        id: number,
        title: string
    }>,
    url: string
}