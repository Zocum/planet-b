import { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { HeaderProps } from '@/types';
import Accordion from '../SummaryAccordion';

export default function Header({ setRover }: HeaderProps) {
    // const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <header className='header'>
            <nav className='header-nav'>
                <div className='header-nav-container'>
                    <div className='header-nav-details_wrapper'>
                        <Accordion>
                            <summary aria-label='List of Mars Rovers' aria-hidden={isDetailsOpen} onClick={() => {
                                setIsDetailsOpen(!isDetailsOpen);
                                setIsOpen(prev => !prev);
                                }}>Mars Rovers<div className={`${isOpen ? '-open' : ''}`}>{'>'}</div></summary>
                            <div className="button_wrapper content">
                                <button onClick={() => setRover('perseverance')}>Perseverance</button>
                                <button onClick={() => setRover('curiosity')}>Curiosity</button>
                                <button onClick={() => setRover('opportunity')}>Opportunity</button>
                                <button onClick={() => setRover('spirit')}>Spirit</button>
                            </div>
                        </Accordion>
                    </div>
                </div>
            </nav>
        </header>  
    );
};