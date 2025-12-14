import type { ICommondStyles, IHeader } from "../types/styles"

export const Card = ({styles}: ICommondStyles) => {

    return(
        <div className={`${styles} flex p-3 rounded-md`}>

        </div>
    )
}

export const CardTitle = ({styles, title}: IHeader) => {

    return(
        <h3 className={`${styles} text-white text-2xl`}>{title}</h3>
    )
}