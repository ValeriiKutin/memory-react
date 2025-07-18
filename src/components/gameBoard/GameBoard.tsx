import { useGameStore } from "../../store/memory-store"
import { cardsData as cards } from "../../data/cardsData";
import type { MemoryCard } from "../../types/memory"



const GameBoard = () => {
    const shuffledMemoryCards: MemoryCard[] = [...cards, ...cards].sort(() => Math.random() - 0.5);

    console.log(shuffledMemoryCards);



    return (
        <div>
            <div className="flex flex-wrap w-3/5 justify-center items-center">
                {shuffledMemoryCards && shuffledMemoryCards.map((card, index) => (
                    <img src={`${card.imgCard}`} alt="memory-card" className="w-36" key={`${card.imgCard}-${index}`} />
                ))}
            </div>
        </div>

    )
}

export default GameBoard