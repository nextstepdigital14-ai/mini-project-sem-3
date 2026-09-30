// Keep the footer year current
document.getElementById("year").textContent = new Date().getFullYear();

// Copy email address to the clipboard
const copyButton = document.getElementById("copy");
copyButton.addEventListener("click", async () => {
  const address = document.getElementById("email").textContent;
  try {
    await navigator.clipboard.writeText(address);
    copyButton.textContent = "Copied";
  } catch (error) {
    copyButton.textContent = "Copy failed";
  }
  setTimeout(() => (copyButton.textContent = "Copy email"), 2000);
});
