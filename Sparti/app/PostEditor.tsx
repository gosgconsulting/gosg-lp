import React, { useState } from 'react'
import '../styles/sparti.css'

interface PostEditorProps {
  postId?: string
  onSave: (postData: any) => void
  onCancel: () => void
}

export const PostEditor: React.FC<PostEditorProps> = ({ postId, onSave, onCancel }) => {
  const [postData, setPostData] = useState({
    title: '',
    slug: '',
    featuredImage: null as File | null,
    imageAlt: '',
    content: '',
    excerpt: '',
    publishedDate: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setPostData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Auto-generate slug from title
    if (field === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setPostData(prev => ({
        ...prev,
        slug
      }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setPostData(prev => ({
      ...prev,
      featuredImage: file
    }))
  }

  const handleSave = () => {
    onSave(postData)
  }

  const handleContentChange = (content: string) => {
    setPostData(prev => ({
      ...prev,
      content
    }))
  }

  const refreshSlug = () => {
    const slug = postData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
    setPostData(prev => ({
      ...prev,
      slug
    }))
  }

  return (
    <div className="sparti-post-editor">
      <div className="sparti-post-editor-content">
        {/* Rich Text Editor - Left Side */}
        <div className="sparti-editor-main">
          <div className="sparti-editor-toolbar">
            <select className="sparti-editor-format-select">
              <option>Paragraph</option>
              <option>Heading 1</option>
              <option>Heading 2</option>
              <option>Heading 3</option>
            </select>
            
            <div className="sparti-editor-toolbar-group">
              <button className="sparti-editor-btn" title="Bold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                  <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Italic">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="4" x2="10" y2="4"/>
                  <line x1="14" y1="20" x2="5" y2="20"/>
                  <line x1="15" y1="4" x2="9" y2="20"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Strikethrough">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 4H9a3 3 0 0 0-2.83 4"/>
                  <path d="M14 12a4 4 0 0 1 0 8H6"/>
                  <line x1="4" y1="12" x2="20" y2="12"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Code">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"/>
                  <polyline points="8,6 2,12 8,18"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Text Color">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 20h16"/>
                  <path d="M6 16l6-12 6 12"/>
                  <path d="M8 12h8"/>
                </svg>
              </button>
            </div>

            <div className="sparti-editor-toolbar-group">
              <button className="sparti-editor-btn" title="Bullet List">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/>
                  <line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/>
                  <line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Numbered List">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="10" y1="6" x2="21" y2="6"/>
                  <line x1="10" y1="12" x2="21" y2="12"/>
                  <line x1="10" y1="18" x2="21" y2="18"/>
                  <path d="M4 6h1v4"/>
                  <path d="M4 10h2"/>
                  <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/>
                </svg>
              </button>
            </div>

            <div className="sparti-editor-toolbar-group">
              <button className="sparti-editor-btn" title="Horizontal Rule">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Quote">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Code Block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16,18 22,12 16,6"/>
                  <polyline points="8,6 2,12 8,18"/>
                </svg>
              </button>
            </div>

            <div className="sparti-editor-toolbar-group">
              <button className="sparti-editor-btn" title="Table">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                </svg>
              </button>
              <button className="sparti-editor-btn" title="Image">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                  <circle cx="9" cy="9" r="2"/>
                  <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="sparti-editor-textarea">
            <textarea
              placeholder="Start writing or press '/' for commands..."
              value={postData.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="sparti-editor-content"
            />
          </div>
        </div>

        {/* Right Sidebar Form - Exact fields from image */}
        <div className="sparti-editor-sidebar">
          <div className="sparti-form-section">
            <div className="sparti-form-group">
              <label className="sparti-label">Title</label>
              <input
                type="text"
                className="sparti-input"
                value={postData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder=""
              />
            </div>

            <div className="sparti-form-group">
              <label className="sparti-label">
                Slug <span className="sparti-required">*</span>
              </label>
              <div className="sparti-input-group">
                <input
                  type="text"
                  className="sparti-input"
                  value={postData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  placeholder=""
                />
                <button 
                  type="button" 
                  className="sparti-input-refresh"
                  onClick={refreshSlug}
                  title="Refresh slug from title"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23,4 23,10 17,10"/>
                    <polyline points="1,20 1,14 7,14"/>
                    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="sparti-form-group">
              <label className="sparti-label">Featured Image</label>
              <label className="sparti-file-button">
                <input 
                  type="file" 
                  className="sparti-file-input" 
                  accept="image/*"
                  onChange={handleFileChange}
                />
                Choose file
              </label>
              {postData.featuredImage && (
                <div className="sparti-file-selected">
                  {postData.featuredImage.name}
                </div>
              )}
            </div>

            <div className="sparti-form-group">
              <label className="sparti-label">Image Alt</label>
              <input
                type="text"
                className="sparti-input"
                value={postData.imageAlt}
                onChange={(e) => handleInputChange('imageAlt', e.target.value)}
                placeholder=""
              />
            </div>

            <div className="sparti-form-group">
              <label className="sparti-label">Excerpt</label>
              <div className="sparti-label-description">A brief description of this article</div>
              <textarea
                className="sparti-textarea"
                value={postData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder=""
                rows={4}
              />
            </div>

            <div className="sparti-form-group">
              <label className="sparti-label">Published date</label>
              <input
                type="date"
                className="sparti-input sparti-date-input"
                value={postData.publishedDate}
                onChange={(e) => handleInputChange('publishedDate', e.target.value)}
                placeholder="mm/dd/yyyy"
              />
            </div>
          </div>

          <div className="sparti-editor-actions">
            <button 
              className="sparti-btn sparti-btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button 
              className="sparti-btn sparti-btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}