// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// This is because these APIs are used by nostr-tools, but not available in the jest runtime by default
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;
