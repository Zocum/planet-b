import { useEffect, useRef, useState } from 'react';
import './Header.scss';
import { HeaderProps } from '@/types';

export default function Header({ setRover }: HeaderProps) {
    const detailsRef = useRef<HTMLDetailsElement | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClickOutsideMouse = (event: MouseEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                detailsRef.current.removeAttribute("open");
            }
        };

        const handleClickOutsideTouch = (event: TouchEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                detailsRef.current.removeAttribute("open");
            }
        };

        document.addEventListener('mousedown', handleClickOutsideMouse);
        document.addEventListener('touchstart', handleClickOutsideTouch);


        return () => {
            document.removeEventListener('mousedown', handleClickOutsideMouse);
            document.removeEventListener('touchstart', handleClickOutsideTouch);
        };
    }, []);
    return (
        <header className='header'>
            <nav className='header-nav'>
                <div className='header-nav-container'>
                    <div className='header-nav-details_wrapper'>
                        <details ref={detailsRef}>
                            <summary aria-label='List of Mars Rovers' aria-hidden={isDetailsOpen} onClick={() => {
                                setIsDetailsOpen(!isDetailsOpen);
                                setIsOpen(prev => !prev);
                                }}>Mars Rovers<div className={`${isOpen ? '-open' : ''}`}>{'>'}</div></summary>
                            <div className="button_wrapper">
                                <button onClick={() => setRover('perseverance')}>Perseverance</button>
                                <button onClick={() => setRover('curiosity')}>Curiosity</button>
                                <button onClick={() => setRover('opportunity')}>Opportunity</button>
                                <button onClick={() => setRover('spirit')}>Spirit</button>
                            </div>
                        </details>
                    </div>
                </div>
            </nav>
        </header>  
    );
};