import {useCallback, useEffect, useRef, useState} from "react";
import { EApprove, IPost } from "../utils/types/post.types";
import { getPosts } from "../api/post/post";

export const useSearch = (text?: string) => {
    const [searchedText, setSearchedText] = useState<any[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        getPosts(EApprove.APPROVED).then(posts => {
            setPosts(posts.data)
        })
    }, [])

    console.log(posts);

    useEffect(() => {
        if (text) searchAPatternInsideWebsite(text)
        else setSearchedText([])
    }, [text])

    const searchAPatternInsideWebsite = (pattern: string) => {
        text && setSearchedText(posts.map((post) : any => {
        if (post.description.includes(text)){
                return {
                    text: post.description.substring(0, 150),
                    id: post._id
                }
            }
        }).filter(item => item !== undefined))
    }

    console.log(searchedText)

    return [searchedText];
}
