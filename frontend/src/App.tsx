import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import type { IInformation } from './types/information';
import InfoCard from './cards/InfoCard';
import * as InformationsAPI from "./api/information";
import Modal from './interactive/Modal';
import CreateInfoModal from './interactive/CreateInfoModal';

function App() {

  const [informations, setInformations] = useState<IInformation[]>([]);
  const [isCreatePopUpOpen, setIsCreatePopUpOpen] = useState<boolean>(false);

  useEffect(() => {

    async function loadInformations() {
        
      try{
        const informationsToSet = await InformationsAPI.getInformations();
        setInformations(informationsToSet);
      }catch(error){
        console.error(error);
      }
    }

    loadInformations()

  },[]);

  return (
    <>
      <div className="App">
        <button className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-600 hover:bg-blue-400 text-white"
        onClick={() => setIsCreatePopUpOpen(true)}>
          Create Information
        </button>
        <div className="flex flex-wrap">
          {informations.map(information => (
            <InfoCard key={information._id} info={information} styles="min-w-[150px]"/>
          ))}
        </div>
        <Modal open={isCreatePopUpOpen} onClose={() => setIsCreatePopUpOpen(false)}>
          <CreateInfoModal onInfoSaved={(newInfo) => {
              setInformations([...informations, newInfo])
              setIsCreatePopUpOpen(false)
            }
          } />
        </Modal>
      </div>
    </>
  )
}

export default App
