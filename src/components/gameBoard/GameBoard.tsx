// import { useGameStore } from "../../store/memory-store"
import Card from "../gameCard/Card";
import { useGameStore } from "../../store/memory-store";



const GameBoard = () => {
    const cards = useGameStore((state) => state.cards);
    const setCards = useGameStore((state) => state.setCards);


    const flipCard = (id: number) => {
        const updated = cards.map((card) => {
            if (card.id === id) {
                return { ...card, isFlipped: true };
            } else {
                return card;
            }
        });
        setCards(updated);
    };

    return (
        <div className="w-full h-full flex justify-center">
            <div className="flex flex-wrap w-3/5 justify-center items-center gap-0.5">
                {cards && cards.map((card, index) => (
                    <Card card={card} index={index} onFlip={() => flipCard(card.id)} />
                ))}
            </div>
        </div>

    )
}

export default GameBoard