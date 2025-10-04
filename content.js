// ========== content.js ==========
let shortcuts = {};

console.log('Claude Prompt Expander: Content script loaded');

// Load shortcuts from storage
chrome.storage.sync.get(['shortcuts'], (result) => {
  shortcuts = result.shortcuts || {
    '/brb': 'Be right back',
    '/email': 'Please write a professional email about this topic',
    '/code': 'Please provide clean, well-commented code with explanations',
    '/summarize': 'Please provide a concise summary of the following content, highlighting the key points:'
  };
  console.log('Claude Prompt Expander: Shortcuts loaded', shortcuts);
});

// Listen for storage changes
chrome.storage.onChanged.addListener((changes) => {
  if (changes.shortcuts) {
    shortcuts = changes.shortcuts.newValue;
    console.log('Claude Prompt Expander: Shortcuts updated', shortcuts);
  }
});

// Function to find Claude's input editor
function findClaudeInput() {
  // Claude uses a contenteditable div with specific attributes
  const selectors = [
    'div[contenteditable="true"]',
    'div.ProseMirror',
    '[role="textbox"]'
  ];
  
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      // Make sure it's in the input area (not other editable content)
      if (el.offsetParent !== null) {
        return el;
      }
    }
  }
  return null;
}

// Function to get text content from editor
function getEditorText(el) {
  return el.innerText || el.textContent || '';
}

// Function to set text content in editor
function setEditorText(el, text) {
  // For ProseMirror/contentEditable
  el.innerText = text;
  
  // Trigger input events to make Claude recognize the change
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  
  // Set cursor at the end
  const range = document.createRange();
  const sel = window.getSelection();
  
  // Find the last text node
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  let lastNode = null;
  while (walker.nextNode()) {
    lastNode = walker.currentNode;
  }
  
  if (lastNode) {
    range.setStart(lastNode, lastNode.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

// Main expansion logic
function checkAndExpand(el) {
  const text = getEditorText(el);
  console.log('Claude Prompt Expander: Current text:', text);
  
  // Check for abbreviations at the end of text followed by space
  const match = text.match(/(\S+)\s$/);
  
  if (match) {
    const lastWord = match[1];
    console.log('Claude Prompt Expander: Last word:', lastWord);
    
    if (shortcuts[lastWord]) {
      console.log('Claude Prompt Expander: Match found! Expanding...');
      const replacement = shortcuts[lastWord];
      
      // Replace the abbreviation with the expansion
      const newText = text.substring(0, text.length - lastWord.length - 1) + replacement + ' ';
      setEditorText(el, newText);
      
      return true;
    }
  }
  
  return false;
}

// Set up observer to watch for the input field
let lastInput = null;
let observer = null;

function setupListener() {
  const input = findClaudeInput();
  
  if (input && input !== lastInput) {
    console.log('Claude Prompt Expander: Found input field', input);
    lastInput = input;
    
    // Listen for spacebar key
    input.addEventListener('keyup', (e) => {
      if (e.key === ' ') {
        console.log('Claude Prompt Expander: Space detected');
        checkAndExpand(input);
      }
    });
  }
}

// Run immediately
setupListener();

// Keep checking for the input field (in case page navigates)
setInterval(setupListener, 1000);

// Also use MutationObserver to detect when input appears
observer = new MutationObserver(() => {
  setupListener();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});