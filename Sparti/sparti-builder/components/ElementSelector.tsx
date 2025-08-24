import React, { ReactNode, useEffect, useRef } from 'react';
import { useSpartiBuilder } from './SpartiBuilderProvider';
import { SpartiElement } from '../types';
import { UniversalElementDetector } from '../core/universal-detector';

interface ElementSelectorProps {
  children: ReactNode;
}

export const ElementSelector: React.FC<ElementSelectorProps> = ({ children }) => {
  const { isEditing, selectElement, hoverElement } = useSpartiBuilder();
  const contentRef = useRef<HTMLDivElement>(null);

  const createSpartiElement = (element: HTMLElement): SpartiElement => {
    const data = UniversalElementDetector.extractElementData(element);
    return { element, data };
  };

  // Try to resolve the deepest text element at the cursor point for fine-grained selection
  const getDeepTextElementFromEvent = (e: MouseEvent): HTMLElement | null => {
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Use standards-compliant caret APIs if available to find underlying Text node
    let textNode: Node | null = null;
    try {
      const anyDoc = document as any;
      if (typeof anyDoc.caretRangeFromPoint === 'function') {
        const range = anyDoc.caretRangeFromPoint(clientX, clientY);
        if (range && range.startContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
          textNode = range.startContainer as Node;
        }
      } else if (typeof anyDoc.caretPositionFromPoint === 'function') {
        const pos = anyDoc.caretPositionFromPoint(clientX, clientY);
        if (pos && pos.offsetNode && pos.offsetNode.nodeType === Node.TEXT_NODE) {
          textNode = pos.offsetNode as Node;
        }
      }
    } catch (_) {
      // ignore and fall back
    }

    const fromTextParent = (node: Node | null): HTMLElement | null => {
      const el = node?.parentElement || (node as any)?.parentNode as HTMLElement | null;
      if (!el) return null;
      // Prefer a small inline element that actually carries text styling
      if (UniversalElementDetector.isEditableElement(el) && UniversalElementDetector.isTextElement(el)) {
        return el;
      }
      return el.closest && el.closest('*') ? (UniversalElementDetector.findNearestEditableElement(el) as HTMLElement) : null;
    };

    if (textNode) {
      const candidate = fromTextParent(textNode);
      if (candidate) return candidate;
    }

    // Fallback to the direct event target path
    const target = e.target as HTMLElement;
    // Prefer deepest child at point
    const elAtPoint = document.elementFromPoint(clientX, clientY) as HTMLElement | null;
    const base = elAtPoint || target;
    if (base) {
      // If base is a text-capable inline element, use it; otherwise fallback to nearest editable
      if (UniversalElementDetector.isEditableElement(base) && UniversalElementDetector.isTextElement(base)) {
        return base;
      }
      return UniversalElementDetector.findNearestEditableElement(base);
    }
    return null;
  };

  const handleElementClick = (e: MouseEvent) => {
    if (!isEditing) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // Prefer deepest text element for fine-grained control (e.g., differently colored words)
    const element = getDeepTextElementFromEvent(e) as HTMLElement | null;
    
    if (!element || !UniversalElementDetector.isEditableElement(element)) {
      return;
    }

    const spartiElement = createSpartiElement(element);
    selectElement(spartiElement);
  };

  const handleElementHover = (e: MouseEvent) => {
    if (!isEditing) return;
    
    const element = getDeepTextElementFromEvent(e) as HTMLElement | null;
    
    if (!element || !UniversalElementDetector.isEditableElement(element)) {
      hoverElement(null);
      return;
    }

    const spartiElement = createSpartiElement(element);
    hoverElement(spartiElement);
  };

  const handleElementLeave = () => {
    if (!isEditing) return;
    hoverElement(null);
  };

  useEffect(() => {
    if (!isEditing) return;

    // Use document instead of contentRef for universal compatibility
    const targetElement = contentRef.current || document.body;
    
    // Add event listeners with capture phase for better control
    targetElement.addEventListener('click', handleElementClick, true);
    targetElement.addEventListener('mouseover', handleElementHover, true);
    targetElement.addEventListener('mouseleave', handleElementLeave, true);

    // Add class to body for global styling
    document.body.classList.add('sparti-editing');

    return () => {
      targetElement.removeEventListener('click', handleElementClick, true);
      targetElement.removeEventListener('mouseover', handleElementHover, true);
      targetElement.removeEventListener('mouseleave', handleElementLeave, true);
      document.body.classList.remove('sparti-editing');
    };
  }, [isEditing]);

  return (
    <div ref={contentRef} className="sparti-content">
      {children}
    </div>
  );
};