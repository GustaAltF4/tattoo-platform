/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {TabIndentationExtension} from '@lexical/extension';
import {HistoryExtension} from '@lexical/history';
import {$generateHtmlFromNodes} from '@lexical/html';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {LexicalExtensionComposer} from '@lexical/react/LexicalExtensionComposer';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {RichTextExtension} from '@lexical/rich-text';
import {defineExtension} from 'lexical';
import type {LexicalEditor} from 'lexical';

import {ToolbarPlugin} from './ToolbarPlugin';

const theme = {
  heading: {
    h1: 'mb-2 text-3xl font-bold',
    h2: 'mb-2 text-2xl font-bold',
    h3: 'mb-1 text-xl font-semibold',
  },
  paragraph: 'my-0',
  quote:
    'my-2 border-l-4 [border-left-style:solid] border-zinc-300 pl-4 italic text-zinc-500 dark:border-zinc-600 dark:text-zinc-400',
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
  },
};

const landingHeroExtension = defineExtension({
  dependencies: [RichTextExtension, HistoryExtension, TabIndentationExtension],
  name: '@lexical/website/landing-hero-editor',
  namespace: '@lexical/website/landing-hero-editor',
  theme,
});

type EditorProps = {
  onChange?: (html: string) => void;
};

export default function Editor({onChange}: EditorProps) {
  function handleChange(_editorState: unknown, editor: LexicalEditor) {
    if (!onChange) return;

    editor.read(() => {
      const html = $generateHtmlFromNodes(editor, null);
      onChange(html);
    });
  }

  return (
    <LexicalExtensionComposer
      extension={landingHeroExtension}
      contentEditable={null}>
      <div className="flex w-full flex-col overflow-hidden rounded-lg border border-solid border-black/10 dark:border-white/10 ">
        <ToolbarPlugin />
        <div className="relative">
          <ContentEditable
            className="h-[20vh] overflow-y-auto p-4 text-base leading-relaxed text-wrap outline-none"
            aria-label="Rich text editor"
            aria-placeholder="Enter some text..."
            placeholder={
              <div className="pointer-events-none absolute top-4 left-4 text-zinc-400 select-none">
                Por favor, escriba algo...
              </div>
            }
          />
          <OnChangePlugin onChange={handleChange} />
        </div>
      </div>
    </LexicalExtensionComposer>
  );
}