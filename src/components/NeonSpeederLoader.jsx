import React, { useState, useEffect } from 'react';
import './NeonSpeederLoader.css';

const NeonSpeederLoader = () => {
    const [textIndex, setTextIndex] = useState(0);
    const [speed, setSpeed] = useState(1);
    const messages = [
        'INITIALIZING HANDSHAKE...',
        'BYPASSING FIREWALL...',
        'ACCESSING SECURE SERVER...',
        'GRANTING ACCESS'
    ];

    useEffect(() => {
        const startTime = Date.now();
        const duration = 3500;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing: Accelerate slowly then fast (Exponential or Quadratic)
            const newSpeed = 1 + (progress * progress * 4); // 1x to 5x
            setSpeed(newSpeed);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTextIndex((prev) => (prev + 1) % messages.length);
        }, 800);
        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="neon-speeder-screen" style={{ '--speed': speed }}>
            {/* SCALED VISUAL ELEMENTS */}
            <div className="scaled-content">

                {/* Clouds Layer - Increased count and spread */}
                <div className="clouds">
                    <div className="cloud cloud1" />
                    <div className="cloud cloud2" />
                    <div className="cloud cloud3" />
                    <div className="cloud cloud4" />
                    <div className="cloud cloud5" />
                    <div className="cloud cloud6" />
                    <div className="cloud cloud6" />
                </div>

                {/* Speeder Loader */}
                <div className="loader">
                    <span></span>
                    <div className="base">
                        <span />
                        <div className="face" />
                    </div>
                </div>

                {/* Long Fazers Removed */}
            </div>

            {/* SYSTEM TEXT - FIXED AT BOTTOM, NOT SCALED */}
            <div className="system-text">{messages[textIndex]}</div>
        </div>
    );
}

export default NeonSpeederLoader;
