import { SequenceChallenge } from "../../types";

export const structuredDataChallenge: SequenceChallenge = {
  id: "structured-data-sequence",
  category: "SEO",
  title: "JSON-LD Structured Data Builder",
  description: "Construct a valid, nested search-engine readable JSON-LD schema payload. Arrange the key-value declarations in correct semantic order to earn Google rich-snippet search badges.",
  difficulty: "medium",
  targetDescription: "@context: schema.org ➔ @type: Article ➔ headline ➔ author ➔ publisher.",
  correctOrder: ["context", "type", "headline", "author", "publisher"],
  steps: [
    {
      id: "context",
      label: "1. Global Vocabulary Context",
      description: "Declare standard meta context: '\"@context\": \"https://schema.org\"' to specify reference schemas.",
    },
    {
      id: "type",
      label: "2. Entity Category Type",
      description: "Define structural node type: '\"@type\": \"Article\"' to classify the document's layout.",
    },
    {
      id: "headline",
      label: "3. Article Title Headline",
      description: "Append page descriptive keyword string: '\"headline\": \"Web Performance Optimization Guide\"'.",
    },
    {
      id: "author",
      label: "4. Author Schema Entity",
      description: "Declare nested author properties: '\"author\": { \"@type\": \"Person\", \"name\": \"Rajesh Tiwari\" }'.",
    },
    {
      id: "publisher",
      label: "5. Publisher Schema Entity",
      description: "Declare nested publisher lines: '\"publisher\": { \"@type\": \"Organization\", \"name\": \"Rajesh Tiwari\" }'.",
    },
  ],
  explanation:
    "Google Rich Snippets rely heavily on valid JSON-LD schemas embedded in headers. The parser evaluates key-value hierarchies sequentially: starting with the global vocabulary context, specifying the structural classification type, appending standard textual fields, and nesting child schema dictionaries like author and publisher details!"
};
