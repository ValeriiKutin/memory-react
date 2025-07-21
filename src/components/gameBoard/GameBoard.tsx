// import { useGameStore } from "../../store/memory-store"
import Card from "../gameCard/Card";
import { useGameStore } from "../../store/memory-store";
import { useEffect } from "react";



const GameBoard = () => {
    const cards = useGameStore((state) => state.cards);
    const setCards = useGameStore((state) => state.setCards);
    const currentTurn = useGameStore((state) => state.currentTurn);
    const setCurrentTurn = useGameStore((state) => state.setCurrentTurn);
    const moves = useGameStore((state) => state.moves);
    const setMoves = useGameStore((state) => state.setMoves);

    const handleCheckCard = (id: number) => {

        if (currentTurn.length >= 2) return;

        const clickedCard = cards.find((card) => card.id === id);


        if (clickedCard) {
            setCurrentTurn((prev) =>
                prev ? [...prev, { imgCard: clickedCard.imgCard, id: clickedCard.id }]
                    : [{ imgCard: clickedCard.imgCard, id: clickedCard.id }]
            );
        }


        const updated = cards.map((card) => {
            return card.id === id ? { ...card, isFlipped: true } : card;
        });

        setCards(updated);

    };

    useEffect(() => {
        if (currentTurn.length === 2) {
            setMoves(moves + 1)

            const [firstTurn, secondTurn] = currentTurn;
            if (firstTurn.imgCard === secondTurn.imgCard) {
                console.log('match')
                const freshCards = useGameStore.getState().cards;
                const updated = freshCards.map((card) => firstTurn.imgCard === card.imgCard ? { ...card, isMatch: true } : card);
                setCards(updated);
                setTimeout(() => {
                    setCurrentTurn([])
                }, 2000);
            } else {

                setTimeout(() => {
                    const freshCards = useGameStore.getState().cards;
                    const updated = freshCards.map((card) => firstTurn.id === card.id || secondTurn.id === card.id ? { ...card, isFlipped: false } : card);
                    setCards(updated);
                }, 1000);

                setTimeout(() => {
                    setCurrentTurn([])
                }, 200);
            }

        }


    }, [currentTurn, setCards, setCurrentTurn])


    return (
        <div>
            <div className="bg-cyan-500 text-white py-5 px-10 rounded-xl flex items-center gap-4 max-w-[180px] mx-auto justify-center">Moves: <span className="text-red-600 text-3xl">{moves}</span></div>
            <div className="w-full h-full flex justify-center mt-36">
                <div className="flex flex-wrap w-3/5 justify-center items-center gap-0.5">
                    {cards && cards?.map((card, index) => (
                        <Card card={card} index={index} onFlip={() => handleCheckCard(card.id)} key={`${card.id}-${index}`} />
                    ))}
                </div>
            </div>
        </div>


    )
}

export default GameBoard