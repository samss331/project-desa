// Toast types
export const TOAST_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// Toast positions
export const TOAST_POSITION = {
  TOP_RIGHT: "top-right",
  TOP_LEFT: "top-left",
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
  TOP_CENTER: "top-center",
  BOTTOM_CENTER: "bottom-center",
};

// Create toast container
const createContainer = (position) => {
  const existingContainer = document.getElementById(
    `toast-container-${position}`
  );
  if (existingContainer) {
    return existingContainer;
  }

  const container = document.createElement("div");
  container.id = `toast-container-${position}`;
  container.className = "fixed z-50 flex flex-col gap-3";

  // Set position
  switch (position) {
    case TOAST_POSITION.TOP_LEFT:
      container.style.top = "1rem";
      container.style.left = "1rem";
      break;
    case TOAST_POSITION.BOTTOM_RIGHT:
      container.style.bottom = "1rem";
      container.style.right = "1rem";
      break;
    case TOAST_POSITION.BOTTOM_LEFT:
      container.style.bottom = "1rem";
      container.style.left = "1rem";
      break;
    case TOAST_POSITION.TOP_CENTER:
      container.style.top = "1rem";
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      break;
    case TOAST_POSITION.BOTTOM_CENTER:
      container.style.bottom = "1rem";
      container.style.left = "50%";
      container.style.transform = "translateX(-50%)";
      break;
    case TOAST_POSITION.TOP_RIGHT:
    default:
      container.style.top = "1rem";
      container.style.right = "1rem";
      break;
  }

  document.body.appendChild(container);
  return container;
};

// Create toast element
const createToastElement = (message, type, onClose) => {
  const toast = document.createElement("div");
  toast.className =
    "flex items-center p-4 rounded-lg shadow-lg min-w-[300px] max-w-md animate-toast-in";

  // Set background color based on type
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      toast.classList.add("bg-gradient-to-r", "from-green-500", "to-green-600");
      break;
    case TOAST_TYPE.ERROR:
      toast.classList.add("bg-gradient-to-r", "from-red-500", "to-red-600");
      break;
    case TOAST_TYPE.WARNING:
      toast.classList.add(
        "bg-gradient-to-r",
        "from-yellow-500",
        "to-yellow-600"
      );
      break;
    case TOAST_TYPE.INFO:
    default:
      toast.classList.add("bg-gradient-to-r", "from-blue-500", "to-blue-600");
      break;
  }

  // Create icon
  const iconContainer = document.createElement("div");
  iconContainer.className = "flex-shrink-0 mr-3 text-white";

  // Set icon based on type
  let iconSvg;
  switch (type) {
    case TOAST_TYPE.SUCCESS:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>`;
      break;
    case TOAST_TYPE.ERROR:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
      </svg>`;
      break;
    case TOAST_TYPE.WARNING:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>`;
      break;
    case TOAST_TYPE.INFO:
    default:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
      </svg>`;
      break;
  }

  iconContainer.innerHTML = iconSvg;
  toast.appendChild(iconContainer);

  // Create message
  const messageElement = document.createElement("div");
  messageElement.className = "flex-1 text-white";
  messageElement.textContent = message;
  toast.appendChild(messageElement);

  // Create close button
  const closeButton = document.createElement("button");
  closeButton.className =
    "ml-3 text-white hover:text-gray-200 transition-colors";
  closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>`;
  closeButton.onclick = () => {
    if (onClose) onClose();
    removeToast(toast);
  };
  toast.appendChild(closeButton);

  return toast;
};

// Remove toast with animation
const removeToast = (toast) => {
  toast.classList.add("animate-toast-out");
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 300);
};

// Toast API
const toast = {
  show: (message, options = {}) => {
    const {
      type = TOAST_TYPE.INFO,
      duration = 3000,
      position = TOAST_POSITION.TOP_RIGHT,
    } = options;

    // Create container
    const container = createContainer(position);

    // Create toast
    const toastElement = createToastElement(message, type, () => {
      clearTimeout(timeout);
    });

    // Add to container
    container.appendChild(toastElement);

    // Auto remove after duration
    const timeout = setTimeout(() => {
      removeToast(toastElement);
    }, duration);

    // Return toast element for potential manual removal
    return toastElement;
  },

  success: (message, options = {}) => {
    return toast.show(message, { ...options, type: TOAST_TYPE.SUCCESS });
  },

  error: (message, options = {}) => {
    return toast.show(message, { ...options, type: TOAST_TYPE.ERROR });
  },

  info: (message, options = {}) => {
    return toast.show(message, { ...options, type: TOAST_TYPE.INFO });
  },

  warning: (message, options = {}) => {
    return toast.show(message, { ...options, type: TOAST_TYPE.WARNING });
  },
};

// Add animations to tailwind
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes toast-in {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes toast-out {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
    
    .animate-toast-in {
      animation: toast-in 0.3s ease forwards;
    }
    
    .animate-toast-out {
      animation: toast-out 0.3s ease forwards;
    }
  `;
  document.head.appendChild(style);
}

export default toast;
