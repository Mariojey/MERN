import { useForm } from "react-hook-form"
import type { IInformation } from "../types/information"
import { createInformation, type IInformationFields } from "../api/information"

interface ICreateInfoModal {
    onInfoSaved: (info: IInformation) => void,

}

const CreateInfoModal = ({ onInfoSaved }: ICreateInfoModal) => {

    const { register, handleSubmit, formState : {
        errors, isSubmitting
    } } = useForm<IInformationFields>();

    async function onSubmit (input: IInformationFields) {
        try{
            const infoResponse = await createInformation(input);
            onInfoSaved(infoResponse);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <>
        <div className={`flex flex-col gap-4`}></div>
          <h4 className={`text-2xl text-black`}>Create New Information</h4>

          <form id="addInfo" className="mt-2 flex flex-col justify-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-black text-sm">Title</p>
            <input type="text" name="title" className="p-2 placeholder:text-shadow-black text-black" placeholder='Title'
            {...register("title", { required: "Required" })} />
            <p>{errors?.title?.message}</p>
            <p className="text-black text-sm mt-2">Content</p>
            <input type="text" name="content" className="p-2 placeholder:text-shadow-black text-black" placeholder='Content'
            {...register("content")}/>
          </form>
          <button type="submit" className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-600 hover:bg-blue-400 text-white"
          form="addInfo" disabled={isSubmitting}>Submit</button>
        </>
    )
}

export default CreateInfoModal;