import {
  type HTMLAttributes,
  type ImgHTMLAttributes,
  memo,
  type PropsWithChildren,
  useMemo,
} from "react";
import MarkdownRender from "react-markdown";
import remarkGfm from "remark-gfm";

const _PLUGINS_REMARK = [[remarkGfm]];

// TODO: styles for Markdown are defined in /src/globals.css, couldn't make it work any other satisfying manner
const MarkdownComponent = ({ value = "" }) => {
  //-- RENDERERS
  const _renderers = useMemo(
    () =>
      Object.assign({
        code: ({
          inline,
          className,
          children,
          ...props
        }: HTMLAttributes<HTMLDivElement> & { inline: boolean }) => {
          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }

          // Nothing matched, return a simple <code> block
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img: ({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) => {
          return (
            <div className="content--img">
              <img src={src} alt={alt ?? ""} />
            </div>
          );
        },
        p: ({ children }: PropsWithChildren) => {
          return <p>{children}</p>;
        },
      }),
    [],
  );

  return (
    <div className="prose prose-sm md:prose-lg lg:prose-xl Markdown">
      <MarkdownRender components={_renderers}>{value}</MarkdownRender>
    </div>
  );
};

const Markdown = memo(MarkdownComponent);

export default Markdown;
