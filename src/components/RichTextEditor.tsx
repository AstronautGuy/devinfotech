// src/components/RichTextEditor.tsx
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Toolbar } from "@/components/Toolbar";

// Define the props for the editor component
interface RichTextEditorProps {
  initialContent?: string;
  onChange: (html: string) => void;
}

export function RichTextEditor({
  initialContent,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      // highlight-start
      StarterKit.configure({
        // ✅ Only configure the extensions you want to change or disable.
        // By removing the list items from here, they will use their default, working configuration.
        heading: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Underline,
      // highlight-end
    ],
    content: initialContent || "",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  return (
    <div className="rounded-md border border-input bg-background">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
