import React, { Ref, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { cx, css } from '@emotion/css';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import CodeIcon from '@mui/icons-material/Code';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
// type OrNull<T> = T | null;

export const Button = ({
  className,
  active,
  reversed,
  ...props
}: PropsWithChildren<
  {
    active: boolean;
    reversed: boolean;
  } & BaseProps
>) => (
  <span
    {...props}
    className={cx(
      className,
      css`
        cursor: pointer;
        color: ${reversed
          ? active
            ? 'white'
            : '#aaa'
          : active
          ? 'black'
          : '#ccc'};
      `
    )}
  />
);

// export const EditorValue = React.forwardRef(
//   (
//     {
//       className,
//       value,
//       ...props
//     }: PropsWithChildren<
//       {
//         value: any;
//       } & BaseProps
//     >,
//     ref: Ref<HTMLDivElement>
//   ) => {
//     const textLines = value.document.nodes
//       .map((node: { text: any }) => node.text)
//       .toArray()
//       .join('\n');
//     return (
//       <div
//         ref={ref}
//         {...props}
//         className={cx(
//           className,
//           css`
//             margin: 30px -20px 0;
//           `
//         )}
//       >
//         <div
//           className={css`
//             font-size: 14px;
//             padding: 5px 20px;
//             color: #404040;
//             border-top: 2px solid #eeeeee;
//             background: #f8f8f8;
//           `}
//         >
//           Slate's value as text
//         </div>
//         <div
//           className={css`
//             color: #404040;
//             font: 12px monospace;
//             white-space: pre-wrap;
//             padding: 10px 20px;
//             div {
//               margin: 0 0 0.5em;
//             }
//           `}
//         >
//           {textLines}
//         </div>
//       </div>
//     );
//   }
// );

export const Icon = (props: any) => {
  if (props.props == 'format_quote') {
    return <FormatQuoteIcon />;
  }
  if (props.props == 'format_bold') {
    return <FormatBoldIcon />;
  }
  if (props.props == 'format_align_left') return <FormatAlignLeftIcon />;
  if (props.props == 'format_align_center') return <FormatAlignCenterIcon />;
  if (props.props == 'format_align_right') return <FormatAlignRightIcon />;
  if (props.props == 'format_list_numbered') return <FormatListNumberedIcon />;
  if (props.props == 'format_list_bulleted') return <FormatListBulletedIcon />;
  if (props.props == 'format_italic') return <FormatItalicIcon />;
  if (props.props == 'looks_one') return <LooksOneIcon />;
  if (props.props == 'looks_two') return <LooksTwoIcon />;
  if (props.props == 'format_underlined') return <FormatUnderlinedIcon />;
  if (props.props == 'format_underlined') return <FormatUnderlinedIcon />;
  if (props.props == 'format_align_justify') return <FormatAlignJustifyIcon />;
  if (props.props == 'code') return <CodeIcon />;
  else {
    return <FormatBoldIcon />;
  }
  //   if (props.icon === 'format_quote') <FormatQuoteIcon />;
  //   if (props.icon === 'format_quote') <FormatQuoteIcon />;
  //   if (props.icon === 'format_quote') <FormatQuoteIcon />;
  //   if (props.icon === 'format_quote') <FormatQuoteIcon />;
};

// export const Icon = React.forwardRef(
//   (
//     { className, ...props }: PropsWithChildren<BaseProps>,
//     ref: Ref<HTMLSpanElement>
//   ) => (
//     <span
//       {...props}
//       ref={ref}
//       className={cx(
//         'material-icons',
//         className,
//         css`
//           font-size: 18px;
//           vertical-align: text-bottom;
//         `
//       )}
//     />
//   )
// );

export const Instruction = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
);

export const Menu = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

export const Test = (editor, buttonState) => {};

export const Portal = ({ children }: any) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<HTMLDivElement>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        `
      )}
    />
  )
);
