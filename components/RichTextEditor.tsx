'use client'

import { useState, useRef } from 'react'
import { Bold, Italic, Underline, List, Link, Image, Save, Eye } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = '开始写作...' }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isPreview, setIsPreview] = useState(false)

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const insertImage = () => {
    const url = prompt('请输入图片URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  const insertLink = () => {
    const url = prompt('请输入链接URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const ToolbarButton = ({ onClick, children, title }: { onClick: () => void, children: React.ReactNode, title: string }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
    >
      {children}
    </button>
  )

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <ToolbarButton onClick={() => execCommand('bold')} title="粗体">
            <Bold className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('italic')} title="斜体">
            <Italic className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('underline')} title="下划线">
            <Underline className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <ToolbarButton onClick={() => execCommand('insertUnorderedList')} title="无序列表">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={() => execCommand('insertOrderedList')} title="有序列表">
            <List className="w-4 h-4" />
          </ToolbarButton>
          <div className="w-px h-6 bg-gray-300 mx-2" />
          <ToolbarButton onClick={insertLink} title="插入链接">
            <Link className="w-4 h-4" />
          </ToolbarButton>
          <ToolbarButton onClick={insertImage} title="插入图片">
            <Image className="w-4 h-4" />
          </ToolbarButton>
        </div>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="p-2 hover:bg-gray-100 rounded transition-colors flex items-center"
        >
          <Eye className="w-4 h-4 mr-1" />
          {isPreview ? '编辑' : '预览'}
        </button>
      </div>

      {/* Editor */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 min-h-[400px] prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="p-4 min-h-[400px] focus:outline-none"
            style={{ whiteSpace: 'pre-wrap' }}
            dangerouslySetInnerHTML={{ __html: content }}
            data-placeholder={placeholder}
          />
        )}
      </div>
    </div>
  )
}
