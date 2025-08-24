import React, { useState, useEffect, useRef } from 'react';
import { Image, Upload, Maximize, Minimize } from 'lucide-react';
import { SpartiElement } from '../../types';

interface ImageEditorProps {
  selectedElement: SpartiElement;
}

export const ImageEditor: React.FC<ImageEditorProps> = ({ selectedElement }) => {
  const [src, setSrc] = useState('');
  const [alt, setAlt] = useState('');
  const [title, setTitle] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Determine the actual DOM node we should mutate for the visual image
  const getTargetImageElement = (): HTMLImageElement | HTMLElement | null => {
    const el = selectedElement.element as HTMLElement | null;
    if (!el) return null;
    if (el.tagName.toLowerCase() === 'img') return el as HTMLImageElement;
    const nestedImg = el.querySelector('img') as HTMLImageElement | null;
    if (nestedImg) return nestedImg;
    // If element uses background-image, operate on the element itself
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') return el;
    return el; // default to element itself
  };

  useEffect(() => {
    const { data } = selectedElement;
    let initialSrc = data.src || '';
    if (!initialSrc) {
      try {
        const el = selectedElement.element as HTMLElement;
        const bg = getComputedStyle(el).backgroundImage;
        const match = bg && bg !== 'none' ? bg.match(/url\((?:"|')?([^"')]+)(?:"|')?\)/) : null;
        if (match?.[1]) initialSrc = match[1];
      } catch (_) {}
    }
    setSrc(initialSrc);
    setAlt(data.alt || '');
    setTitle(data.title || '');
    setWidth(data.styles.width || '');
    setHeight(data.styles.height || '');
  }, [selectedElement]);

  const handleSrcChange = (newSrc: string) => {
    setSrc(newSrc);
    const target = getTargetImageElement();
    if (!target) return;
    if (target.tagName?.toLowerCase() === 'img') {
      (target as HTMLImageElement).setAttribute('src', newSrc);
    } else {
      (target as HTMLElement).style.backgroundImage = `url('${newSrc}')`;
      selectedElement.data.styles.backgroundImage = `url('${newSrc}')`;
    }
    selectedElement.data.src = newSrc;
  };

  const handleAltChange = (newAlt: string) => {
    setAlt(newAlt);
    const target = getTargetImageElement();
    if (target && target.tagName?.toLowerCase() === 'img') {
      (target as HTMLImageElement).setAttribute('alt', newAlt);
    }
    selectedElement.data.alt = newAlt;
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const target = getTargetImageElement();
    if (target) {
      if (newTitle) {
        (target as HTMLElement).setAttribute('title', newTitle);
      } else {
        (target as HTMLElement).removeAttribute('title');
      }
    }
    selectedElement.data.title = newTitle;
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: string) => {
    const target = getTargetImageElement();
    if (!target) return;
    (target as HTMLElement).style[dimension as any] = value;
    selectedElement.data.styles[dimension] = value;
    if (dimension === 'width') setWidth(value); else setHeight(value);
  };

  const resetDimensions = () => {
    const target = getTargetImageElement();
    if (!target) return;
    (target as HTMLElement).style.width = '';
    (target as HTMLElement).style.height = '';
    selectedElement.data.styles.width = '';
    selectedElement.data.styles.height = '';
    setWidth('');
    setHeight('');
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    handleSrcChange(url);
  };

  return (
    <>
      {/* Image Source */}
      <div className="sparti-edit-section">
        <div className="sparti-edit-label">
          <Image size={16} />
          Image Source
        </div>
        <div className="sparti-url-input">
          <input
            type="url"
            className="sparti-edit-input"
            value={src}
            onChange={(e) => handleSrcChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={onFileSelected}
          />
          <button className="sparti-btn sparti-btn-ghost sparti-btn-sm" onClick={triggerUpload}>
            <Upload size={14} />
          </button>
        </div>
      </div>

      {/* Alt Text */}
      <div className="sparti-edit-section">
        <div className="sparti-edit-label">Alt Text</div>
        <input
          type="text"
          className="sparti-edit-input"
          value={alt}
          onChange={(e) => handleAltChange(e.target.value)}
          placeholder="Describe the image..."
        />
      </div>

      {/* Title */}
      <div className="sparti-edit-section">
        <div className="sparti-edit-label">Title (Tooltip)</div>
        <input
          type="text"
          className="sparti-edit-input"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Image tooltip..."
        />
      </div>

      {/* Dimensions */}
      <div className="sparti-edit-section">
        <div className="sparti-edit-label">
          <Maximize size={16} />
          Dimensions
        </div>
        <div className="sparti-dimension-controls">
          <div className="sparti-dimension-input">
            <label>Width</label>
            <input
              type="text"
              className="sparti-edit-input"
              value={width}
              onChange={(e) => handleDimensionChange('width', e.target.value)}
              placeholder="auto"
            />
          </div>
          <div className="sparti-dimension-input">
            <label>Height</label>
            <input
              type="text"
              className="sparti-edit-input"
              value={height}
              onChange={(e) => handleDimensionChange('height', e.target.value)}
              placeholder="auto"
            />
          </div>
        </div>
        <button 
          className="sparti-btn sparti-btn-ghost sparti-btn-sm w-full"
          onClick={resetDimensions}
        >
          <Minimize size={14} />
          Reset Dimensions
        </button>
      </div>

      {/* Preview */}
      {src && (
        <div className="sparti-edit-section">
          <div className="sparti-edit-label">Preview</div>
          <div className="sparti-image-preview">
            <img 
              src={src} 
              alt={alt}
              style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
};