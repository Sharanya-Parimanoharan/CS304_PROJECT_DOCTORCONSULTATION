import { useEffect } from 'react';
import TawkTo from 'tawkto-react'

export default function Chat() {
    // const tawkMessengerRef = useRef();

    // const handleMinimize =() => {
    //     tawkMessengerRef.current.minimize();
    // }

    // return (
    //     <div className="App">
    //         <button onClick={handleMinimize}> Minimize the Chat </button>

    //         <TawkMessengerReact
    //             propertyId="641034644247f20fefe5c62c"
    //             widgetId="1grfkpalh"
    //             ref={tawkMessengerRef}/>
    //     </div>
    // );
    useEffect(() => {
    
        const tawk = new TawkTo("641034644247f20fefe5c62c", "1grfkpalh")
    
        tawk.onStatusChange((status) => 
        {
            // console.log(status)
        })
    
    }, [])
}