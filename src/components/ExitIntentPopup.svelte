
<script>
  import { onMount } from 'svelte';
  
  let showExitPopup = false;
  let hasShownExitIntent = false;
  
  const redirectUrl = "https://redirect01-z56s-git-main-benzee10000s-projects.vercel.app/";
  
  function handleExitIntent(e) {
    if (hasShownExitIntent) return;
    
    // Detect mouse leaving viewport from top
    if (e.clientY <= 0) {
      showExitPopup = true;
      hasShownExitIntent = true;
    }
  }
  
  function handleClick() {
    window.open(redirectUrl, '_blank');
    showExitPopup = false;
  }
  
  function handleClose() {
    showExitPopup = false;
  }
  
  onMount(() => {
    document.addEventListener('mouseleave', handleExitIntent);
    
    return () => {
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  });
</script>

{#if showExitPopup}
  <div class="exit-popup-overlay" on:click={handleClose} role="button" tabindex="0">
    <div class="exit-popup-content" on:click|stopPropagation={() => {}}>
      <div class="exit-popup-header">
        <button class="close-btn" on:click={handleClose} aria-label="Close">×</button>
      </div>
      
      <div class="exit-popup-body">
        <div class="emoji">⚡</div>
        <h2>Wait! Don't Miss Out!</h2>
        <p class="exit-text">Before you leave, check out our <em>exclusive content</em></p>
        <p class="cta-text">Get instant access to premium galleries!</p>
        
        <button class="exit-cta-btn" on:click={handleClick}>
          <span class="btn-text">🎯 Access Now</span>
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .exit-popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    cursor: pointer;
  }

  .exit-popup-content {
    background: linear-gradient(135deg, #ff4757, #ff3838);
    border-radius: 20px;
    padding: 0;
    max-width: 420px;
    width: 90%;
    box-shadow: 0 25px 80px rgba(255, 71, 87, 0.4);
    animation: exitPopupEnter 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    cursor: default;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.1);
  }

  .exit-popup-header {
    display: flex;
    justify-content: flex-end;
    padding: 15px 15px 0;
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.15);
    border: none;
    color: white;
    font-size: 24px;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: rotate(90deg);
  }

  .exit-popup-body {
    padding: 0 30px 35px;
    text-align: center;
    color: white;
  }

  .emoji {
    font-size: 52px;
    margin-bottom: 20px;
    animation: bounce 1.5s infinite;
  }

  h2 {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }

  .exit-text {
    font-size: 18px;
    margin-bottom: 10px;
    opacity: 0.95;
  }

  .exit-text em {
    font-style: italic;
    font-weight: bold;
    color: #ffeb3b;
  }

  .cta-text {
    font-size: 16px;
    margin-bottom: 30px;
    opacity: 0.9;
  }

  .exit-cta-btn {
    background: linear-gradient(45deg, #2196f3, #21cbf3);
    border: none;
    padding: 20px 40px;
    border-radius: 50px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    box-shadow: 0 10px 30px rgba(33, 150, 243, 0.4);
  }

  .exit-cta-btn:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 40px rgba(33, 150, 243, 0.6);
  }

  @keyframes exitPopupEnter {
    0% {
      opacity: 0;
      transform: scale(0.3) translateY(-100px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 480px) {
    .exit-popup-content {
      margin: 20px;
      max-width: none;
    }
    
    h2 {
      font-size: 26px;
    }
    
    .exit-cta-btn {
      font-size: 18px;
      padding: 18px 30px;
    }
  }
</style>
