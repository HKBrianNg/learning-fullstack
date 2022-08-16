import { useState } from 'react'
import Navbar from '../../component/header/Navbar'
import SetupTopic from './SetupTopic'


function ConfigTopic() {
    const [selectedId, setSelectedId] = useState('0')


    return (
        <>
            <Navbar />
            <SetupTopic selectedId={selectedId} setSelectedId={setSelectedId} />
        </>
    )
}

export default ConfigTopic