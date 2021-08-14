import React, { useState } from "react";

const HowToPlay = () => {
    const [expanded, setExpanded] = useState(false);
    const arr = new Array(1,2,0,3,5,6,8,4,9,10,7,11,13,14,15,12);

    const toggleOpen = (e) => {
        const info = e.target.nextElementSibling;

        if (!expanded) {
            setExpanded(true)
            info.classList.add('active');
        } else if (expanded) {
            setExpanded(false)
            info.classList.remove('active');
        }
    }
    return(
       <div className='how-to-play flex flex-col space-y-5 min-h-[175px]'>
            <button className='how-to-play-btn w-full' onClick={toggleOpen} aria-expanded={expanded}>How to play</button>
            <div className='how-to-play-inner max-w-xs'>Simply place the tiles in numerical order to complete the game. 
                The clickable tiles are only the ones near hole.

                <div className="cells">
                    {arr.map((cell)=><div key={cell} className={`cell cell-${cell}`}>{cell}</div>)}
                </div>
            </div>
       </div>
    )
}
export default HowToPlay;