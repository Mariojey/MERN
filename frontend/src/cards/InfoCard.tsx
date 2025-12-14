import type { IInformation } from "../types/information";
import { convertDate } from "../utils/dataFormatter";

interface IInfoCard {
    info: IInformation,
    styles?: string
}

const InfoCard = ({ info, styles }: IInfoCard) => {

    const {
        title,
        content,
        createdAt,
        updatedAt
    } = info;

    let formattedDatas: string;

    if(updatedAt > createdAt){
        formattedDatas = `Last modification: ${convertDate(updatedAt)}`;
    }else{
        formattedDatas = `Created: ${convertDate(createdAt)}`;
    }

    return (
        <div className={`${styles} overflow-hidden rounded-2xl p-3 m-3 flex flex-col  text-center items-center justify-center border-indigo-300 bg-blue-950 whitespace-pre-line`}>
            <h3 className="text-2xl text-white">{title}</h3>
            <p className="text-lg text-white">{content}</p>
            <p className="text-lg text-white">{formattedDatas}</p>
        </div>
    )

}

export default InfoCard;

