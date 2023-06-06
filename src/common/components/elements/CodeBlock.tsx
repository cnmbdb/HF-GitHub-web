import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { CodeProps } from 'react-markdown/lib/ast-to-react';

import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useCopyToClipboard } from 'usehooks-ts';
import {
  HiOutlineClipboardCopy as CopyIcon,
  HiCheckCircle as CheckIcon,
} from 'react-icons/hi';

import { a11yDark as themeColor } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';
import diff from 'react-syntax-highlighter/dist/cjs/languages/prism/diff';

const languages = {
  javascript: 'javascript',
  typescript: 'typescript',
  diff: 'diff',
  tsx: 'tsx',
  css: 'css',
};

SyntaxHighlighter.registerLanguage(languages.javascript, javascript);
SyntaxHighlighter.registerLanguage(languages.typescript, typescript);
SyntaxHighlighter.registerLanguage(languages.diff, diff);
SyntaxHighlighter.registerLanguage(languages.tsx, tsx);
SyntaxHighlighter.registerLanguage(languages.css, css);

const CodeBlock = ({ className, children, inline, ...props }: CodeProps) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [value, copy] = useCopyToClipboard();
  const match = /language-(\w+)/.exec(className || '');

  const handleCopy = (code: string) => {
    copy(code);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [isCopied]);

  return (
    <>
      {!inline ? (
        <div className='relative'>
          <button
            className='absolute top-3 right-3 p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800'
            type='button'
            aria-label='Copy to Clipboard'
            onClick={() => handleCopy(children.toString())}
          >
            {!isCopied ? (
              <CopyIcon size={18} className='text-neutral-400' />
            ) : (
              <CheckIcon size={18} className='text-green-600' />
            )}
          </button>

          <SyntaxHighlighter
            {...props}
            style={themeColor}
            customStyle={{
              padding: '20px',
              fontSize: '14px',
              borderRadius: '8px',
            }}
            PreTag='div'
            language={match ? match[1] : 'javascript'}
            wrapLongLines={true}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className='text-neutral-950 bg-neutral-200 dark:text-neutral-200 dark:bg-neutral-700 py-1 px-2 rounded-md text-[14px]'>
          {children}
        </code>
      )}
    </>
  );
};

const LoadingPlaceholder = () => <div className='w-full mt-12 mb-12 h-36' />;

export default dynamic(() => Promise.resolve(CodeBlock), {
  ssr: false,
  loading: LoadingPlaceholder,
});
