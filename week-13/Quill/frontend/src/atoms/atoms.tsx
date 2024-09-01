import { atom, selector } from 'recoil';
import { ReviewsData } from '../ReviewData';
import { decodeToken } from 'react-jwt';

export const id = atom({
    key : "id",
    default : Math.floor(Math.random()*ReviewsData.length)
});

export const auth = atom({
    key : "auth",
    default : localStorage.getItem('token')||""
})

// export interface TokenData{
//     name : string,
//     id : string
// }

// export const userData = atom({
//     key : "username",
//     default : selector({
//         key : "dataSelector",
//         get : ({get})=>{
//             const authHeader = get(auth);
//             const token = authHeader.split(' ')[1]
//             const userData = decodeToken(token) as TokenData;
//             return userData
//         }
//     })
// })