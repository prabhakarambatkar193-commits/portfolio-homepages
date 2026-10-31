// Grab elements from the DOM
const openModalBtn = document.getElementById('openModalBtn');
const modalOverlay = document.getElementById('modalOverlay');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalActionBtn = document.getElementById('modalActionBtn');
const modalBox = document.getElementById('myModal');

// Keep track of the element that triggered the modal so we can return focus later
let lastFocusedElement = null;

// Function to open the modal
function openModal() {
  lastFocusedElement = document.activeElement; // Save reference to trigger button
  
  modalOverlay.removeAttribute('hidden'); // Show modal
  modalBox.focus(); // Shift focus directly to the dialog box container
  
  // Attach keyboard event listeners when modal is open
  document.addEventListener('keydown', handleKeyDown);
}

// Function to close the modal
function closeModal() {
  modalOverlay.setAttribute('hidden', 'true'); // Hide modal
  
  // Remove keydown listener to clean up memory
  document.removeEventListener('keydown', handleKeyDown);
  
  // Return focus back to the button that originally opened the modal
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Handle special key behaviors (Escape key and Focus Trapping with Tab)
function handleKeyDown(event) {
  if (event.key === 'Escape') {
    closeModal();
  }

  if (event.key === 'Tab') {
    // Find all focusable elements inside the modal
    const focusableElements = modalBox.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Shift + Tab (moving backwards)
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
    } 
    // Tab only (moving forwards)
    else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  }
}

// Event Listeners for buttons
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
modalActionBtn.addEventListener('click', closeModal);

// Optional: Close modal if user clicks on the backdrop overlay outside the box
modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeModal();
  }
});