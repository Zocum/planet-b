import { useState, useRef } from 'react';
import './Header.scss';
import { HeaderProps } from '@/types';
import Accordion from '../SummaryAccordion';
import Link from 'next/link';

export default function Header({ setRover }: HeaderProps) {
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
    const summaryRefRovers = useRef<HTMLElement>(null);
    const contentRefRovers = useRef<HTMLDivElement>(null);

    return (
        <header className='header'>
            <nav className='header-nav'>
                <div className='header-nav-container'>
                    <div className='header-nav-marsRovers'>
                        <Accordion summaryRef={summaryRefRovers} contentRef={contentRefRovers}>
                            <summary ref={summaryRefRovers} aria-label='List of Mars Rovers' aria-hidden={isDetailsOpen} onClick={() => 
                                setIsDetailsOpen(!isDetailsOpen)}>Mars Rovers<div>{'>'}</div>
                            </summary>
                            <div ref={contentRefRovers} className="button_wrapper content">
                                <button onClick={() => setRover('perseverance')}>Perseverance</button>
                                <button onClick={() => setRover('curiosity')}>Curiosity</button>
                                <button onClick={() => setRover('opportunity')}>Opportunity</button>
                                <button onClick={() => setRover('spirit')}>Spirit</button>
                            </div>
                        </Accordion>
                    </div>
                    {/* <div className='header-nav-earthEyes'><Link href=''>Earth Eyes</Link>
                    </div> */}
                </div>
            </nav>
        </header>  
    );
};