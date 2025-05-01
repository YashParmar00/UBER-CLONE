import React from 'react'
//suggestions,
const LocationSearchPanel = ({  setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const suggestions = [
        'Location 1',
        'Location 2',
        'Location 3',
        'Location 4',
        'Location 5',
        'Location 6',
        'Location 7'
    ]

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        setVehiclePanel(true)
        setPanelOpen(false)
    }

    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                        <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel