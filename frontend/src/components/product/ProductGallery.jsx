import { useState } from 'react';
import Modal from '../ui/Modal';

export default function ProductGallery({ images, name }) {
  const [selected, setSelected] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex gap-2 overflow-x-auto lg:flex-col">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all lg:h-20 lg:w-20 ${
                selected === idx
                  ? 'border-indigo-600'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
        <button
          onClick={() => setZoomOpen(true)}
          className="flex-1 overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800"
        >
          <img
            src={images[selected]}
            alt={name}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </button>
      </div>
      <Modal isOpen={zoomOpen} onClose={() => setZoomOpen(false)} className="max-w-4xl">
        <img src={images[selected]} alt={name} className="w-full rounded-xl" />
      </Modal>
    </>
  );
}
