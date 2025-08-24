import React, { useState } from 'react'
import '../styles/sparti.css'
import { TinyMCEEditor } from '../components/TinyMCEEditor'

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
        {/* TinyMCE Rich Text Editor - Left Side */}
        <div className="sparti-editor-main">
          <TinyMCEEditor
            value={postData.content}
            onChange={handleContentChange}
            height={500}
            placeholder="Start writing or press '/' for commands..."
            className="sparti-editor-content"
          />
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