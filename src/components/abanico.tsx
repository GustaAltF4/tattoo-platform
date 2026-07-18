import { useState, useId } from 'react';

const SCATTERED = [
  { x: -8,  y: -12, rot: -8  },
  { x:  6,  y:  8,  rot:  5  },
  { x: -4,  y:  6,  rot: -3  },
  { x: 10,  y: -6,  rot:  11 },
  { x: -12, y:  4,  rot: -6  },
  { x:  4,  y: -10, rot:  7  },
  { x: -6,  y:  10, rot: -12 },
  { x:  8,  y:  4,  rot:  4  },
];

interface GaleriaAlumnosProps {
    images: string[];
}

export default function GaleriaAlumnos({ images }: GaleriaAlumnosProps) {
    const [open, setOpen] = useState(false);
    // useId genera un id único por instancia del componente, nunca colisiona
    const uid = useId().replace(/:/g, '');
    const rootId = `gallery-${uid}`;

    const cols = Math.ceil(Math.sqrt(images.length));
    const cardSize = `clamp(110px, 26vw, 210px)`;
    const spacing = 'clamp(118px, 28vw, 222px)';

    return (
        <section className="flex flex-col items-center justify-center px-4">

            <div
                id={rootId}
                className={open ? 'g-root g-open' : 'g-root'}
                onClick={() => setOpen(p => !p)}
            >
                {images.map((src, i) => {
                    const s = SCATTERED[i % SCATTERED.length];
                    const col = i % cols;
                    const row = Math.floor(i / cols);
                    const totalCols = Math.min(cols, images.length);
                    const totalRows = Math.ceil(images.length / cols);

                    return (
                        <div
                            key={i}
                            className="g-card"
                            style={{
                                '--sx': `${s.x}px`,
                                '--sy': `${s.y}px`,
                                '--sr': `${s.rot}deg`,
                                '--gx': `calc((${col} - ${(totalCols - 1) / 2}) * ${spacing})`,
                                '--gy': `calc((${row} - ${(totalRows - 1) / 2}) * ${spacing})`,
                                zIndex: i,
                            } as React.CSSProperties}
                        >
                            <img src={src} alt={`Alumno ${i + 1}`} className="g-img" />
                        </div>
                    );
                })}
            </div>

            <p className="mt-6 text-sm tracking-widest uppercase text-[#999] select-none md:hidden">
                {open ? '✕ cerrar' : '↗ ver '}
            </p>

            {/* Todos los estilos escopean al #rootId → dos instancias nunca interfieren */}
            <style>{`
                #${rootId}.g-root {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    user-select: none;
                    width: 100%;
                    max-width: 640px;
                    height: clamp(140px, 22vw, 190px);
                    transition: height 500ms cubic-bezier(0.4, 0, 0.2, 1);
                }

                #${rootId} .g-card {
                    position: absolute;
                    transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
                    transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1),
                                box-shadow 300ms ease;
                    border-radius: 10px;
                    overflow: hidden;
                    border: 3px solid white;
                    box-shadow: 0 4px 18px rgba(0,0,0,0.22);
                    width: ${cardSize};
                    aspect-ratio: 3/4;
                }

                #${rootId} .g-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    filter: grayscale(20%);
                    transition: filter 400ms ease;
                }

                /* ── DESKTOP: hover ── */
                @media (hover: hover) {
                    #${rootId}.g-root:hover {
                        height: clamp(480px, 88vw, 720px);
                    }
                    #${rootId}.g-root:hover .g-card {
                        transform: translate(var(--gx), var(--gy)) rotate(0deg);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                    }
                    #${rootId}.g-root:hover .g-img {
                        filter: grayscale(0%);
                    }
                    #${rootId}.g-root:hover .g-card:hover {
                        transform: translate(var(--gx), var(--gy)) rotate(0deg) scale(1.06);
                        z-index: 99 !important;
                        box-shadow: 0 16px 48px rgba(0,0,0,0.28);
                    }
                }

                /* ── MOBILE: click toggle via clase .g-open ── */
                @media (hover: none) {
                    #${rootId}.g-root.g-open {
                        height: clamp(480px, 88vw, 720px);
                    }
                    #${rootId}.g-root.g-open .g-card {
                        transform: translate(var(--gx), var(--gy)) rotate(0deg);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
                    }
                    #${rootId}.g-root.g-open .g-img {
                        filter: grayscale(0%);
                    }
                }
            `}</style>
        </section>
    );
}