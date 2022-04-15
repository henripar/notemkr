// @refresh reset
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, Slate, ReactEditor } from 'slate-react';
import {
  Editor,
  Transforms,
  createEditor,
  Descendant,
  Element as SlateElement,
} from 'slate';
import { withHistory } from 'slate-history';

import { Icon, Toolbar } from './components';
import axios from 'axios';
import Note from 'types/note';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+h': 'heading-two',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];

const RichTextExample = (props: any) => {
  const [note, setNote] = useState();

  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withReact(withHistory(createEditor() as ReactEditor)),
    []
  );

  useEffect(() => {
    if (props.activeNote) {
      // console.log(props.activeNote[0].children[0].text + 'Ddfdfdfsfsfsfsd');
      console.log(JSON.stringify(props?.activeNote));
      // let test = JSON.parse(props.activeNote);
      // renderElement(props.activeNote);
      // console.log(test);
      console.log(props.activeNoteId);
      editor.children = props.activeNote;
      setNote(props?.activeNote);
      initialValue = props.notes[0].note;
    }
  }, [props]);

  let initialValue = useMemo<Descendant[]>(
    () =>
      props?.activeNote?.note ||
      props?.notes[0]?.note || [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    []
  );

  // const initialValue = useMemo(props.activeNote, []);

  // const initialValue = useMemo(
  //   note || [
  //     {
  //       type: 'paragraph',
  //       children: [{ text: 'A line of text in a paragraph.' }],
  //     },
  //   ],
  //   []
  // );

  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => 'set_selection' !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
          axios
            .post(
              'http://localhost:7071/api/AddNote',
              {
                note: content,
                testi: 'lol',
                noteid: props.activeNoteId,
              },
              {
                headers: {
                  'Content-Type': 'text/plain',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            )
            .then((r) => console.log(r.data));
        }
      }}
    >
      <Toolbar>
        {/* <MarkButton editor={editor} format="bold" icon="format_bold" />
        <MarkButton editor={editor} format="italic" icon="format_italic" />
        <MarkButton
          editor={editor}
          format="underline"
          icon="format_underlined"
        />
        <MarkButton editor={editor} format="code" icon="code" /> */}
        {/* <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <BlockButton format="left" icon="format_align_left" />
        <BlockButton format="center" icon="format_align_center" />
        <BlockButton format="right" icon="format_align_right" />
        <BlockButton format="justify" icon="format_align_justify" /> */}
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Start writing to create a new note.."
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
              if (mark == 'heading-two') {
                toggleBlock(editor, mark);
              }
            }
          }
        }}
      />
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(
    editor,
    format,
    TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
  );
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type) &&
      !TEXT_ALIGN_TYPES.includes(format),
    split: true,
  });
  let newProperties: Partial<SlateElement>;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
    console.log(editor);
  } else {
    Editor.addMark(editor, format, true);
    console.log(editor);
  }
};

const isBlockActive = (editor, format, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n[blockType] === format,
    })
  );

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon, editor }) => {
  return (
    <Button
      active={isBlockActive(
        editor,
        format,
        TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type'
      )}
      onMouseDown={(event: Event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Icon props={icon}>{icon}</Icon>
    </Button>
  );
};

const MarkButton = ({ format, icon, editor }: any) => {
  const [btnStatus, setBtnStatus] = useState(false);

  const isActive = isMarkActive(editor, format);
  return (
    <Button
      editor={editor}
      icon={icon}
      format={format}
      active={isActive}
      setBtnStatus={setBtnStatus}
      btnStatus={btnStatus}
    ></Button>
  );
};

const Button = ({ editor, active, format, icon, setBtnStatus, btnStatus }) => {
  return (
    <div
      onClick={(event: Event) => {
        event.preventDefault();
        setBtnStatus(!btnStatus);
        toggleMark(editor, format);
      }}
      className={active ? 'lightBtn' : 'darkBtn'}
    >
      <Icon props={icon}></Icon>
    </div>
  );
};

export default RichTextExample;
