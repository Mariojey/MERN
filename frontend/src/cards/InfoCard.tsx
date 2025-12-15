import type { IInformationFields } from "../api/information";
import type { IInformation } from "../types/information";
import { convertDate } from "../utils/dataFormatter";
import { FaRegTrashAlt } from "react-icons/fa";

interface IInfoCard {
    info: IInformation,
    onDeleteInfoPresses: (info: IInformation) => void,
    styles?: string
}

const InfoCard = ({ info, onDeleteInfoPresses, styles }: IInfoCard) => {

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
            <div className={`w-full flex flex-row justify-between`}>
                <h3 className="text-2xl text-white">{title}</h3>
                <div className="flex justify-center items-center cursor-pointer">
                    <FaRegTrashAlt onClick={
                        (event) => {
                            onDeleteInfoPresses(info);
                            event.stopPropagation()  
                            }  
                        } />
                </div>
            </div>
            <p className="text-lg text-white">{content}</p>
            <p className="text-lg text-white">{formattedDatas}</p>
        </div>
    )

}

export default InfoCard;

