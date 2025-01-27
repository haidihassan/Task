'use client';
import React from 'react';
import { Modal, ModalBody, ModalContent, ModalTrigger } from '../ui/animated-modal';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { appAssets } from '@/constants/appAssets';
import { appIcons } from '@/constants/appIcons';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';

interface AnimatedModalDemoProps {
    triggerLabel?: string;
    triggerIcon?: string;
    modalTitle?: string;
    modalContent?: React.ReactNode;
    path?: string;
    onClick?: () => void;
}

export function AnimatedModalDemo({
    triggerLabel,
    triggerIcon = appIcons.create,
    modalTitle,
    modalContent,
    path,
    onClick,
}: AnimatedModalDemoProps) {
    const images = [appAssets.car1, appAssets.car2, appAssets.car3, appAssets.vw];
    const router = useRouter();

    const handleRedirect = () => {
        if (path) {
            router.push(path);
        }
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className="py-5 flex items-center justify-center">
            <Modal>
                <div onClick={handleRedirect}>
                    <ModalTrigger className="bg-text text-bg flex justify-center group/modal-btn">
                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">{triggerLabel}</span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-bg z-20">
                            <Icon icon={triggerIcon} width={26} />
                        </div>
                    </ModalTrigger>
                </div>
                {!path && (
                    <ModalBody className="max-h-[90vh] overflow-y-auto">
                        <ModalContent>
                            <h4 className="flex items-center justify-center text-lg md:text-2xl text-text dark:text-neutral-100 font-bold text-center mb-8">
                                {modalTitle}
                                <Icon icon={appIcons.car} className="mb-2 ml-2" width={40} />
                            </h4>
                            <div className="flex justify-center items-center">
                                {images.map((image, idx) => (
                                    <motion.div
                                        key={'images' + idx}
                                        style={{
                                            rotate: Math.random() * 20 - 10,
                                        }}
                                        whileHover={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        whileTap={{
                                            scale: 1.1,
                                            rotate: 0,
                                            zIndex: 100,
                                        }}
                                        className="rounded-xl -mr-4 mt-4 p-1 bg-bg dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                                    >
                                        <Image
                                            src={image}
                                            alt="car image"
                                            width="500"
                                            height="500"
                                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-6">{modalContent}</div>
                        </ModalContent>
                       
                    </ModalBody>
                )}
            </Modal>
        </div>
    );
}
