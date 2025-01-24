import React, { useEffect, useState, useId, useRef, JSX } from 'react';
import { motion } from 'framer-motion';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { AnimatedModalDemo } from '../animated';

interface ExpandableCardDemoProps {
    cards: {
        id: number;
        title: string;
        description: string;
        src?: string;
        modalContent: JSX.Element;
        isRedirect?: boolean;
        path?: string;
    }[];
}

export const ExpandableCardDemo: React.FC<ExpandableCardDemoProps> = ({ cards }) => {
    const id = useId();
    const [active, setActive] = useState<string | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setActive(null);
            }
        };

        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [active]);

    useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

    return (
        <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
            {cards.map((card) => (
                <motion.div
                    layoutId={`card-${card.id}-${id}`}
                    key={card.id}
                    className="p-4 flex flex-col hover:bg-[#c3dcf4] dark:hover:bg-neutral-800 rounded-xl"
                >
                    <div className="flex gap-4 flex-col w-full">
                        <motion.div layoutId={`image-${card.id}-${id}`}>
                            <img
                                width={50}
                                height={50}
                                src={card.src}
                                alt={card.title}
                                className="h-60 w-full rounded-lg  object-cover object-top"
                            />
                        </motion.div>
                        <div className="flex justify-center items-center flex-col">
                            <motion.h3
                                layoutId={`title-${card.id}-${id}`}
                                className="font-medium text-text dark:text-neutral-200 text-center md:text-left text-base"
                            >
                                {card.title}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${card.id}-${id}`}
                                className="text-des dark:text-neutral-400 text-center md:text-left text-base"
                            >
                                {card.description}
                            </motion.p>
                        </div>
                    </div>
                    <AnimatedModalDemo
                        key={card.id}
                        triggerLabel={card.title}
                        modalTitle={card.description}
                        modalContent={card.modalContent}
                        path={card.isRedirect ? card.path : ''}
                    />
                </motion.div>
            ))}
        </ul>
    );
};

export const CloseIcon = () => (
    <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.05 } }}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-black"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
    </motion.svg>
);
