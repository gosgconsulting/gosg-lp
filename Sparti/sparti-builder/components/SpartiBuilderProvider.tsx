import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { EditingContext, SpartiElement, SpartiBuilderConfig } from '../types';

interface SpartiBuilderContextType extends EditingContext {
  config: SpartiBuilderConfig;
  enterEditMode: () => void;
  exitEditMode: () => void;
  selectElement: (element: SpartiElement | null) => void;
  hoverElement: (element: SpartiElement | null) => void;
  saveChanges: () => void;
  applySavedChanges: () => void;
}

const SpartiBuilderContext = createContext<SpartiBuilderContextType | null>(null);

interface SpartiBuilderProviderProps {
  children: ReactNode;
  config?: SpartiBuilderConfig;
}

export const SpartiBuilderProvider: React.FC<SpartiBuilderProviderProps> = ({
  children,
  config = { enabled: true, toolbar: true, autoDetect: true }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedElement, setSelectedElement] = useState<SpartiElement | null>(null);
  const [hoveredElement, setHoveredElement] = useState<SpartiElement | null>(null);
  const [pendingChanges, setPendingChanges] = useState<Record<string, {
    content?: string;
    styleAttr?: string;
    attributes?: Record<string, string>;
  }>>({});
  const observerRef = useRef<MutationObserver | null>(null);

  const STORAGE_KEY = `sparti:page:${typeof window !== 'undefined' ? window.location.pathname : '/'}`;

  // Build a unique CSS selector for an element (prefers id, else nth-of-type path)
  const getUniqueSelector = (el: HTMLElement): string => {
    if (!el) return '';
    if (el.id) return `#${el.id}`;
    const parts: string[] = [];
    let element: HTMLElement | null = el;
    while (element && element.nodeType === 1 && element !== document.body) {
      let selector = element.tagName.toLowerCase();
      if (element.className && typeof element.className === 'string') {
        const cls = element.className
          .split(/\s+/)
          .filter(Boolean)
          .slice(0, 2) // limit classes for brevity
          .join('.');
        if (cls) selector += `.${cls}`;
      }
      const parent = element.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(c => c.tagName === element!.tagName);
        if (siblings.length > 1) {
          const index = siblings.indexOf(element) + 1;
          selector += `:nth-of-type(${index})`;
        }
      }
      parts.unshift(selector);
      element = element.parentElement;
    }
    return parts.length ? parts.join(' > ') : '';
  };

  // Observe DOM changes while editing and collect final state per element selector
  useEffect(() => {
    if (!isEditing) {
      // stop observer when exiting edit mode
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      return;
    }

    const container =
      document.querySelector('.sparti-content-area') ||
      document.querySelector('.sparti-content') ||
      document.body;

    const handleRecordForElement = (el: HTMLElement) => {
      const selector = getUniqueSelector(el);
      if (!selector) return;
      setPendingChanges(prev => {
        const next = { ...prev };
        const current = next[selector] || {};
        // Capture style attribute as-is (covers most style edits)
        const styleAttr = el.getAttribute('style') || '';
        const attrs: Record<string, string> = { ...current.attributes } as any;
        // Persist commonly edited attributes if present
        ['src','alt','title','href'].forEach((name) => {
          const v = el.getAttribute(name);
          if (v !== null) {
            if (!attrs) ({} as any); // noop to satisfy TS
            (attrs as any)[name] = v;
          }
        });
        const content = el.textContent || undefined;
        next[selector] = {
          content,
          styleAttr,
          attributes: Object.keys(attrs || {}).length ? attrs : current.attributes
        };
        return next;
      });
    };

    observerRef.current = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'characterData') {
          const parentEl = (m.target as CharacterData).parentElement;
          if (parentEl) handleRecordForElement(parentEl);
        } else if (m.type === 'attributes') {
          const el = m.target as HTMLElement;
          handleRecordForElement(el);
        } else if (m.type === 'childList') {
          // If direct children mutated, record for the parent container
          if (m.target instanceof HTMLElement) handleRecordForElement(m.target);
        }
      }
    });

    observerRef.current.observe(container, {
      subtree: true,
      characterData: true,
      characterDataOldValue: false,
      attributes: true,
      attributeFilter: ['style','src','alt','title','href'],
      childList: true
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [isEditing]);

  const enterEditMode = () => {
    setIsEditing(true);
    document.body.classList.add('sparti-editing');
  };

  const exitEditMode = () => {
    setIsEditing(false);
    setSelectedElement(null);
    setHoveredElement(null);
    document.body.classList.remove('sparti-editing');
  };

  const selectElement = (element: SpartiElement | null) => {
    setSelectedElement(element);
  };

  const hoverElement = (element: SpartiElement | null) => {
    setHoveredElement(element);
  };

  const saveChanges = () => {
    try {
      const payload = {
        version: 1,
        path: window.location.pathname,
        changes: pendingChanges,
        savedAt: Date.now()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      // Optionally, exit edit mode after save
      // setIsEditing(false);
    } catch (e) {
      console.error('Failed to save changes:', e);
    }
  };

  const applySavedChanges = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const payload = JSON.parse(raw) as { changes: Record<string, { content?: string; styleAttr?: string; attributes?: Record<string,string> }> };
      const changes = payload?.changes || {};
      Object.entries(changes).forEach(([selector, change]) => {
        const el = document.querySelector(selector) as HTMLElement | null;
        if (!el) return;
        if (change.content !== undefined && change.content !== null) {
          el.textContent = change.content;
        }
        if (change.styleAttr !== undefined) {
          el.setAttribute('style', change.styleAttr);
        }
        if (change.attributes) {
          Object.entries(change.attributes).forEach(([name, value]) => {
            el.setAttribute(name, value);
          });
        }
      });
    } catch (e) {
      console.error('Failed to apply saved changes:', e);
    }
  };

  const contextValue: SpartiBuilderContextType = {
    config,
    isEditing,
    selectedElement,
    hoveredElement,
    enterEditMode,
    exitEditMode,
    selectElement,
    hoverElement,
    saveChanges,
    applySavedChanges,
  };

  return (
    <SpartiBuilderContext.Provider value={contextValue}>
      {children}
    </SpartiBuilderContext.Provider>
  );
};

export const useSpartiBuilder = () => {
  const context = useContext(SpartiBuilderContext);
  if (!context) {
    throw new Error('useSpartiBuilder must be used within SpartiBuilderProvider');
  }
  return context;
};