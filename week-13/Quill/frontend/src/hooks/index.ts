import { useEffect, useState } from "react"
import axios from "axios";
import { DATABASE_URL } from "../config";
import { decodeToken } from "react-jwt";

export interface Blog {
    id : string,
    title : string,
    content : string,
    createdAt : string,
    editedAt : string,
    authorId : string,
    published : boolean,
    author : {
        name : string
        about ?: string,
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${DATABASE_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlog(response.data.blog);
                setLoading(false);
            })
    }, [id])
    
    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        });
    }, []);
    return {
        loading,
        blogs
    }
}

export const useMyBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{
        axios.get(`${DATABASE_URL}/api/v1/blog/myblogs`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setBlogs(response.data.blogs);
            setLoading(false);
        });
    }, []);
    return {
        loading,
        blogs
    }
}

export interface TokenData{
    name : string,
    id : string
}

export const useUserame = () => {
    const auth = localStorage.getItem('token') || "";
    const [userName, setUserName] = useState('');
    if(!auth){
        setUserName("Anonymous")
    }
    else{
        useEffect(()=>{
            const token = auth.split(' ')[1];
            const info = decodeToken(token) as TokenData
            setUserName(info.name)
        }, [auth])
    }
    return userName;
}