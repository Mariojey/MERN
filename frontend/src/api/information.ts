import localBackend from "../netConfig";
import type { IInformation } from "../types/information";

async function fetchData(path: RequestInfo, initConfig?: RequestInit){

    const response = await fetch(path, initConfig);

    if(response.ok){
        return response;
    }else{
        const newError = await response.json();
        const errorMsg = newError.error;

        throw Error(errorMsg);
    }

}

export async function getInformations(): Promise<IInformation[]> {

    const response = await fetchData(`${localBackend}/api/informations`, 
        {
            method: "GET"
        }
    );

    return response.json();

}

export interface IInformationFields{
    title: string,
    content?: string,
}

export async function createInformation(information: IInformationFields): Promise<IInformation> {
    
    const response = await fetchData(`${localBackend}/api/informations`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            
            },
            body:  JSON.stringify(information),
        },
    );

    return response.json();

}