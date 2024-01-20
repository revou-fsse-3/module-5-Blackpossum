import { ImageProps } from "next/image";

declare module 'next/image' {
    export interface ImageProps{
        src:string;
        alt:string;
        width:number;
        height:number;
    }
}