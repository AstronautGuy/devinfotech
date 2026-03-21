// src/components/Toolbar.tsx
"use client";

import type { Editor } from "@tiptap/react";
import { Bold, Strikethrough, Italic, List, ListOrdered, Link as LinkIcon, Underline as UnderlineIcon } from "lucide-react";

// Define a reusable button component for the toolbar
const ToolbarButton = ({
  onClick,
  disabled,
  isActive,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  isActive?: boolean;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    // Simple styling for active/inactive states
    className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${
      isActive ? "bg-gray-300 dark:bg-gray-600" : ""
    } disabled:opacity-50 disabled:cursor-not-allowed`}
  >
    {children}
  </button>
);

export function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-2 rounded-t-md border-b border-input p-2">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <Bold className="h-5 w-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <Italic className="h-5 w-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
      >
        <UnderlineIcon className="h-5 w-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <Strikethrough className="h-5 w-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => {
          if (editor.isActive("link")) {
            editor.chain().focus().unsetLink().run();
            return;
          }
          const previousUrl = editor.getAttributes("link").href;
          const url = window.prompt("URL", previousUrl);
          if (url === null) return;
          if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
          }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        isActive={editor.isActive("link")}
      >
        <LinkIcon className="h-5 w-5" />
      </ToolbarButton>

      {/* --- LIST BUTTONS --- */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
      >
        <List className="h-5 w-5" />
      </ToolbarButton>

      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
      >
        <ListOrdered className="h-5 w-5" />
      </ToolbarButton>
    </div>
  );
}
