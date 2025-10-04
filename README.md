# Claude Prompt Expander

A Chrome extension that replaces short abbreviations with long, reusable prompts on Claude.ai. Save time by avoiding repetitive typing of frequently used prompts.

## Overview

When working with Claude, you often need to use the same prompts repeatedly. This extension allows you to create custom abbreviations that automatically expand into full prompts when you type them followed by a space.

## Features

- Automatic text expansion in Claude.ai chat interface
- Customizable abbreviations and expansions
- Simple management interface for adding, editing, and deleting shortcuts
- Persistent storage across browser sessions
- Works seamlessly with Claude's React-based editor

## Installation

### Step 1: Download the Extension Files

Create a new folder on your computer (e.g., `claude-prompt-expander`) and create the following four files:

1. `manifest.json`
2. `content.js`
3. `popup.html`
4. `popup.js`

Copy the code from the artifact into each respective file.

### Step 2: Load the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top-right corner
4. Click the "Load unpacked" button
5. Select the folder containing your extension files
6. The extension should now appear in your extensions list

### Step 3: Verify Installation

1. You should see "Claude Prompt Expander" in your extensions list
2. Ensure the toggle switch is set to "ON"
3. The extension icon should appear in your Chrome toolbar

## Usage

### Basic Usage

1. Navigate to https://claude.ai/
2. Click in the message input box
3. Type an abbreviation (e.g., `/code`)
4. Press the SPACEBAR
5. The abbreviation will automatically expand to the full prompt

### Example Workflow

```
You type:     /code
Press:        SPACEBAR
Result:       Please provide clean, well-commented code with explanations 
```

### Default Shortcuts

The extension comes pre-configured with these shortcuts:

| Abbreviation | Expands To |
|-------------|------------|
| `/brb` | Be right back |
| `/email` | Please write a professional email about this topic |
| `/code` | Please provide clean, well-commented code with explanations |
| `/summarize` | Please provide a concise summary of the following content, highlighting the key points: |

## Managing Shortcuts

### Opening the Settings Panel

1. Click the extension icon in your Chrome toolbar
2. The settings popup will appear

### Adding a New Shortcut

1. Open the settings panel
2. Click the "Add New Shortcut" button
3. Enter your abbreviation in the first prompt (e.g., `/debug`)
4. Enter the full prompt text in the second prompt
5. The shortcut is automatically saved

### Editing an Existing Shortcut

1. Open the settings panel
2. Click in either the abbreviation or expansion field
3. Make your changes
4. Click outside the field or press Enter
5. Changes are automatically saved

### Deleting a Shortcut

1. Open the settings panel
2. Find the shortcut you want to remove
3. Click the "Delete" button (marked with an X)
4. The shortcut is immediately removed

## Best Practices

### Abbreviation Naming

- Use a forward slash prefix (e.g., `/code`) to prevent accidental expansions
- Keep abbreviations short but memorable
- Use consistent naming patterns (e.g., `/analyze-data`, `/analyze-code`)
- Avoid common words that you might type naturally

### Prompt Design

- Write clear, specific prompts that work standalone
- Include necessary context in the prompt itself
- Test your prompts before saving them as shortcuts
- Consider adding placeholders where you'll add specific details

### Example Use Cases

**Code Review**
```
Abbreviation: /review
Expansion: Please review this code for best practices, potential bugs, security issues, and performance optimizations. Provide specific suggestions for improvement.
```

**Data Analysis**
```
Abbreviation: /analyze
Expansion: Please analyze the following data and provide: 1) Key trends and patterns, 2) Statistical insights, 3) Actionable recommendations, 4) Visualizations if applicable.
```

**Writing Assistance**
```
Abbreviation: /improve
Expansion: Please improve this text by enhancing clarity, fixing grammar, improving flow, and making it more engaging while maintaining the original meaning and tone.
```

**Debugging**
```
Abbreviation: /debug
Expansion: Please help debug this code. Identify the issue, explain why it's happening, and provide a corrected version with explanations of the changes.
```

## Troubleshooting

### Expansion Not Working

**Problem:** Typing an abbreviation and pressing space doesn't expand the text.

**Solutions:**
1. Refresh the Claude.ai page after installing or updating the extension
2. Check that the extension is enabled in `chrome://extensions/`
3. Open the browser console (F12) and look for messages starting with "Claude Prompt Expander"
4. Verify you're pressing SPACEBAR immediately after the abbreviation
5. Ensure you're typing in Claude's message input box

### Shortcuts Not Saving

**Problem:** Added shortcuts disappear after closing the browser.

**Solutions:**
1. Check that Chrome sync is enabled if you want shortcuts across devices
2. Verify the extension has storage permissions
3. Try removing and reinstalling the extension

### Extension Not Appearing

**Problem:** The extension icon doesn't show in the toolbar.

**Solutions:**
1. Look for the extensions puzzle piece icon and pin the extension
2. Verify the extension loaded without errors in `chrome://extensions/`
3. Check that all four files are present in the extension folder

### Console Debugging

Open the browser console (F12) to see debug messages:

```
Claude Prompt Expander: Content script loaded
Claude Prompt Expander: Shortcuts loaded {/code: "...", ...}
Claude Prompt Expander: Found input field
Claude Prompt Expander: Space detected
Claude Prompt Expander: Last word: /code
Claude Prompt Expander: Match found! Expanding...
```

These messages help identify where the process might be failing.

## Technical Details

### Browser Compatibility

- Chrome version 88 or higher
- Edge version 88 or higher (Chromium-based)
- Other Chromium-based browsers may work but are not officially supported

### Permissions

The extension requires:
- `storage` - To save your custom shortcuts

### Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Only activates on claude.ai domain
- Does not track or collect any user information

### File Structure

```
claude-prompt-expander/
├── manifest.json       # Extension configuration
├── content.js          # Main logic for detecting and expanding text
├── popup.html          # Settings interface HTML
└── popup.js            # Settings interface logic
```

## Limitations

- Only works on claude.ai (not the API or other interfaces)
- Requires manual page refresh after installation
- Cannot expand text that has already been sent
- Case-sensitive abbreviations
- Requires spacebar trigger (does not expand on Enter or other keys)

## Support

If you encounter issues:

1. Check the Troubleshooting section above
2. Verify all installation steps were completed correctly
3. Check the browser console for error messages
4. Try removing and reinstalling the extension

## License

This project is provided as-is for personal use.

## Version History

### Version 1.0
- Initial release
- Basic text expansion functionality
- Settings management interface
- Support for Claude.ai interface
