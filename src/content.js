(function () {
  // Initialize it as inactive
  window.__HighlightMode = false;

  // Toggle highlight mode
  window.toggleHighlightMode = function () {
    if (window.__HighlightMode) {
      window.__HighlightMode = false;
      document.body.removeEventListener("mouseover", highlightElement);
      document.body.removeEventListener("click", copyElementContent, true);
      clearHighlights();
    } else {
      window.__HighlightMode = true;
      document.body.addEventListener("mouseover", highlightElement);
      document.body.addEventListener("click", copyElementContent, true);
    }
  };

  // Highlight element on mouseover
  function highlightElement(event) {
    clearHighlights();
    event.target.style.outline = "2px solid pink";
  }

  // Clear all highlights
  function clearHighlights() {
    document.querySelectorAll("*").forEach((el) => {
      el.style.outline = "";
    });
  }

  // Copy element content on click
  function copyElementContent(event) {
    event.preventDefault();
    event.stopPropagation();
    let element = event.target;
    let textContent = getTextContent(element);
    navigator.clipboard.writeText(textContent).then(() => {
      alert("Content copied to clipboard!");
    });
    window.toggleHighlightMode();
  }

  // Get text content
  function getTextContent(element) {
    let textContent = "";
    if (element) {
      let children = element.childNodes;
      children.forEach(function (child) {
        if (child.nodeType === Node.TEXT_NODE) {
          let trimmedText = child.textContent.trim();
          if (trimmedText) {
            textContent += trimmedText + "\n";
          }
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          textContent += getTextContent(child);
        }
      });
    }
    return textContent;
  }

  // Initial script execution
  if (!window.__HighlightMode) {
    window.toggleHighlightMode();
  }
})();
