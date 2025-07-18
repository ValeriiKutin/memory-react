import type { MemoryCard } from "../../types/memory"

interface CardProps {
    card: MemoryCard;
    index: number;
    onFlip: () => void;
}

const Card = ({ card, index, onFlip }: CardProps) => {

    const handleClickCard = () => {
        if (!card.isMatch && !card.isFlipped) {
            onFlip();
        }
    }

    return (
        <button key={`${card.imgCard}-${index}`} className="!p-0 !border-0" onClick={handleClickCard}>
            <div className={`w-36 h-36 relative overflow-hidden after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full ${card.isFlipped ? 'after:bg-transparent' : 'after:bg-amber-500'} after:z-30`}>
                <img className={`object-cover`} src={`${card.imgCard}`} alt="memory-card" />
            </div >
        </button>

    )
}

export default Card