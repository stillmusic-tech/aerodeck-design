/**
 * Aerodeck ESLint plugin — design-system guardrails.
 *
 * Rules:
 *   - prefer-semantic-classes : ban primitive color tokens in components.
 *     Components must consume the semantic layer (bg-surface, text-fg,
 *     bg-action-primary) instead of primitives (bg-aeros-cyan,
 *     text-neutral-600). Primitives belong in @theme only.
 *
 *   - no-arbitrary-spacing : ban arbitrary-value spacing/sizing utilities
 *     like p-[12px] or w-[400px]. Use the scale (p-4, w-full) or extend
 *     the theme.
 *
 * Both rules scan string literals and template chunks. Variants are
 * stripped so hover:p-[12px] and data-[state=open]:bg-aeros-cyan are
 * still caught. Disable per-line with the usual eslint-disable comment
 * when you have a documented escape-hatch reason.
 */

const PRIMITIVE_RE =
  /(?:^|:)([\w-]+)-(aeros-(?:red|yellow|green|cyan)|neutral-(?:50|100|200|300|400|500|600))(?:\/\d+)?$/;

const ARBITRARY_SPACING_RE =
  /(?:^|:)(p|m|gap|space-[xy]|inset)(-[trblxyse])?-\[[^\]]+\]$/;

function eachToken(str, fn) {
  if (!str) return;
  for (const tok of str.split(/\s+/)) {
    if (tok) fn(tok);
  }
}

const preferSemanticClasses = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow direct use of Aerodeck primitive color tokens in components. Use semantic tokens instead.",
    },
    schema: [],
    messages: {
      primitive:
        "Primitive color token '{{token}}' is off-limits in components. Use a semantic token (bg-surface, text-fg, bg-action-primary, etc.). Primitives belong in @theme only.",
    },
  },
  create(context) {
    function check(value, node) {
      eachToken(value, (tok) => {
        const m = tok.match(PRIMITIVE_RE);
        if (m) {
          context.report({
            node,
            messageId: "primitive",
            data: { token: tok },
          });
        }
      });
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node.value, node);
      },
      TemplateElement(node) {
        check(node.value.cooked, node);
      },
    };
  },
};

const noArbitrarySpacing = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow arbitrary-value spacing/sizing utilities. Use the scale or extend @theme.",
    },
    schema: [],
    messages: {
      arbitrary:
        "Arbitrary spacing utility '{{token}}' bypasses the design system. Use a scale token (p-4, gap-2, w-full) or extend @theme.",
    },
  },
  create(context) {
    function check(value, node) {
      eachToken(value, (tok) => {
        if (ARBITRARY_SPACING_RE.test(tok)) {
          context.report({
            node,
            messageId: "arbitrary",
            data: { token: tok },
          });
        }
      });
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node.value, node);
      },
      TemplateElement(node) {
        check(node.value.cooked, node);
      },
    };
  },
};

export default {
  meta: { name: "aerodeck", version: "0.1.0" },
  rules: {
    "prefer-semantic-classes": preferSemanticClasses,
    "no-arbitrary-spacing": noArbitrarySpacing,
  },
};
