import { useState, useRef } from 'react';
import './Header.scss';
import { HeaderProps } from '@/types';
import Accordion from '../SummaryAccordion';

export default function Header({ setRover }: HeaderProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
    const summaryRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <header className='header'>
            <nav className='header-nav'>
                <div className='header-nav-container'>
                    <div className='header-nav-details_wrapper'>
                        <Accordion summaryRef={summaryRef} contentRef={contentRef}>
                            <summary ref={summaryRef} aria-label='List of Mars Rovers' aria-hidden={isDetailsOpen} onClick={() => 
                                setIsDetailsOpen(!isDetailsOpen)}>Mars Rovers<div>{'>'}</div>
                            </summary>
                            <div ref={contentRef} className="button_wrapper content">
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