// ========== popup.js ==========
let shortcuts = {};

// Load existing shortcuts
chrome.storage.sync.get(['shortcuts'], (result) => {
  shortcuts = result.shortcuts || {
    '/brb': 'Be right back',
    '/email': 'Please write a professional email about this topic',
    '/code': 'Please provide clean, well-commented code with explanations',
    '/summarize': 'Please provide a concise summary of the following content, highlighting the key points:'
  };
  renderShortcuts();
});

function renderShortcuts() {
  const list = document.getElementById('shortcuts-list');
  list.innerHTML = '';
  
  for (const [abbrev, expansion] of Object.entries(shortcuts)) {
    const div = document.createElement('div');
    div.className = 'shortcut-item';
    
    const abbrevInput = document.createElement('input');
    abbrevInput.type = 'text';
    abbrevInput.className = 'abbrev';
    abbrevInput.value = abbrev;
    abbrevInput.dataset.old = abbrev;
    
    const expansionInput = document.createElement('input');
    expansionInput.type = 'text';
    expansionInput.className = 'expansion';
    expansionInput.value = expansion;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.abbrev = abbrev;
    
    div.appendChild(abbrevInput);
    div.appendChild(expansionInput);
    div.appendChild(deleteBtn);
    list.appendChild(div);
  }
  
  // Add event listeners
  document.querySelectorAll('.abbrev, .expansion').forEach(input => {
    input.addEventListener('change', updateShortcut);
  });
  
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', deleteShortcut);
  });
}

function updateShortcut(e) {
  const item = e.target.closest('.shortcut-item');
  const oldAbbrev = item.querySelector('.abbrev').dataset.old;
  const newAbbrev = item.querySelector('.abbrev').value.trim();
  const expansion = item.querySelector('.expansion').value;
  
  if (!newAbbrev || !expansion) return;
  
  if (oldAbbrev !== newAbbrev) {
    delete shortcuts[oldAbbrev];
  }
  
  shortcuts[newAbbrev] = expansion;
  item.querySelector('.abbrev').dataset.old = newAbbrev;
  
  chrome.storage.sync.set({ shortcuts });
}

function deleteShortcut(e) {
  const abbrev = e.target.dataset.abbrev;
  delete shortcuts[abbrev];
  chrome.storage.sync.set({ shortcuts });
  renderShortcuts();
}

document.getElementById('add-new').addEventListener('click', () => {
  const abbrev = prompt('Enter abbreviation (e.g., /mycode):');
  if (abbrev && abbrev.trim()) {
    const expansion = prompt('Enter the full prompt text:');
    if (expansion && expansion.trim()) {
      shortcuts[abbrev.trim()] = expansion.trim();
      chrome.storage.sync.set({ shortcuts });
      renderShortcuts();
    }
  }
});