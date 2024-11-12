// chat-widget-loader.js
(function() {
  // Merge default config with user config
  const defaultConfig = {
    appUrl: 'https://erleah-vercel.vercel.app',
    position: 'bottom-right',
    buttonColor: '#007bff',
    width: '360px',
    height: '520px',
    marginEdge: '20px',
    buttonSize: '60px'
  };

  const config = {
    ...defaultConfig,
    ...(window.ChatWidgetConfig || {})
  };

  // Create and inject styles
  const styles = `
    .chat-widget-frame-container {
      position: fixed;
      z-index: 2147483000;
      ${config.position.includes('bottom') ? 'bottom' : 'top'}: ${config.marginEdge};
      ${config.position.includes('right') ? 'right' : 'left'}: ${config.marginEdge};
      display: flex;
      flex-direction: column;
      align-items: ${config.position.includes('right') ? 'flex-end' : 'flex-start'};
    }

    .chat-widget-button {
      width: ${config.buttonSize};
      height: ${config.buttonSize};
      border-radius: 50%;
      background-color: ${config.buttonColor};
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
    }

    .chat-widget-button:hover {
      transform: scale(1.1);
    }

    .chat-widget-icon {
      width: 30px;
      height: 30px;
      fill: white;
    }

    .chat-widget-iframe {
      display: none;
      width: ${config.width};
      height: ${config.height};
      border: none;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 5px 40px rgba(0, 0, 0, 0.16);
      margin-bottom: 16px;
    }

    @media (max-width: 480px) {
      .chat-widget-iframe {
        width: calc(100vw - 40px);
        height: calc(100vh - 100px);
      }
    }
  `;

  // Function to initialize the widget
  const initializeWidget = () => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Create widget elements
    const container = document.createElement('div');
    container.className = 'chat-widget-frame-container';

    const iframe = document.createElement('iframe');
    iframe.className = 'chat-widget-iframe';
    iframe.src = config.appUrl;
    iframe.title = 'Chat Widget';

    const button = document.createElement('div');
    button.className = 'chat-widget-button';
    button.innerHTML = `
      <svg class="chat-widget-icon" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    `;

    // Add click handler
    button.addEventListener('click', () => {
      const isVisible = iframe.style.display === 'block';
      iframe.style.display = isVisible ? 'none' : 'block';
    });

    // Assemble and inject the widget
    container.appendChild(iframe);
    container.appendChild(button);
    document.body.appendChild(container);
  };

  // Wait for DOM to be ready before initializing
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWidget);
  } else {
    initializeWidget();
  }
})();