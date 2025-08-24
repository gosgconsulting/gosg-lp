import React, { useState } from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  content,
  onChange,
  placeholder = "Start writing...",
  className = ""
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `tiptap-editor ${className} ${isFocused ? 'focused' : ''}`,
      },
    },
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

  // Update editor content when prop changes
  React.useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-wrapper">
      {isFocused && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="sparti-editor-toolbar sparti-editor-bubble-menu">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Bold"
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Italic"
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Bullet List"
            >
              <List size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Numbered List"
            >
              <ListOrdered size={16} />
            </button>
          </div>
        </BubbleMenu>
      )}

      {editor && !isFocused && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="sparti-editor-toolbar sparti-editor-floating-menu">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={editor.isActive('heading', { level: 1 }) ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Heading 1"
            >
              <Heading1 size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={editor.isActive('heading', { level: 2 }) ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Heading 2"
            >
              <Heading2 size={16} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={editor.isActive('heading', { level: 3 }) ? 'sparti-editor-btn active' : 'sparti-editor-btn'}
              title="Heading 3"
            >
              <Heading3 size={16} />
            </button>
          </div>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
    </div>
  );
};
