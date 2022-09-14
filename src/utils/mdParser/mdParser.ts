
import { marked } from 'marked';
import DOMPurify from 'dompurify';


const renderer = new marked.Renderer();
const linkRenderer = renderer.link;
renderer.link = (href, title, text) => {
    if (!href) return '';

    const localLink = href.startsWith(`${window.location.protocol}//${window.location.hostname}`);
    const html = linkRenderer.call(renderer, href, title, text);
    return localLink ? html : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
};

export const mdToHtml = (md?: string) => {
    if (!md) return ''
    return DOMPurify.sanitize(marked(md, { renderer }), { ADD_ATTR: ['target'] })
}